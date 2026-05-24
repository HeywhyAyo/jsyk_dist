"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var CheckoutService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckoutService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const orders_entity_1 = require("../orders/entities/orders.entity");
const order_status_1 = require("../orders/enum/order.status");
const order_item_entity_1 = require("../orders/entities/order_item.entity");
const payment_entity_1 = require("../payments/entities/payment.entity");
const payment_enums_1 = require("../payments/enums/payment.enums");
const payment_enums_2 = require("../payments/enums/payment.enums");
const payment_enums_3 = require("../payments/enums/payment.enums");
const address_entity_1 = require("../users/entities/address.entity");
const coupon_entity_1 = require("../products/entities/coupon.entity");
const users_service_1 = require("../users/users.service");
const products_service_1 = require("../products/products.service");
const standard_charge_1 = require("../shared/constant/standard.charge");
const rethrow_exception_1 = require("../shared/utilities/rethrow-exception");
const apiResponse_1 = require("../shared/utilities/apiResponse");
const stripe_1 = require("stripe");
let CheckoutService = CheckoutService_1 = class CheckoutService {
    orderRepo;
    orderItemRepo;
    paymentRepo;
    addressRepo;
    couponRepo;
    productService;
    userService;
    logger = new common_1.Logger(CheckoutService_1.name);
    STRIPE_API_KEY = process.env.STRIPE_API_KEY;
    STRIPE_SUCCESS_URL = process.env.SUCCESS_URL || "https://www.jsyk.com/success_checkout";
    STRIPE_CANCEL_URL = process.env.CANCEL_URL || "https://www.jsyk.com/cancel_checkout";
    constructor(orderRepo, orderItemRepo, paymentRepo, addressRepo, couponRepo, productService, userService) {
        this.orderRepo = orderRepo;
        this.orderItemRepo = orderItemRepo;
        this.paymentRepo = paymentRepo;
        this.addressRepo = addressRepo;
        this.couponRepo = couponRepo;
        this.productService = productService;
        this.userService = userService;
    }
    async checkout(userId, dto) {
        try {
            const user = await this.userService.findUserById(userId);
            if (!user) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)('User not found.');
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const address = await this.addressRepo.findOne({
                where: { id: dto.shippingAddressId, userId: user.id },
            });
            if (!address) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)('Shipping address not found or does not belong to you.');
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const resolvedItems = [];
            for (const item of dto.items) {
                const product = await this.productService.findOne(item.productId);
                if (!product.isActive) {
                    const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(`"${product.name}" is no longer available.`);
                    throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
                }
                if (product.stock < item.quantity) {
                    const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(`Insufficient stock for "${product.name}". ` +
                        `Requested: ${item.quantity}, Available: ${product.stock}.`);
                    throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
                }
                let selectedColor = null;
                let selectedSize = null;
                const hasColorOptions = product.colors && product.colors.length > 0;
                if (hasColorOptions) {
                    if (!item.selectedColor) {
                        const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(`Please select a color for "${product.name}".`);
                        throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
                    }
                    const matchedColor = product.colors.find((c) => c.hexCode.toLowerCase() ===
                        item.selectedColor?.toLowerCase());
                    if (!matchedColor) {
                        const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(`"${item.selectedColor}" is not a valid color option for "${product.name}". ` +
                            `Available colors: ${product.colors.map((c) => `${c.name} (${c.hexCode})`).join(', ')}.`);
                        throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
                    }
                    selectedColor = `${matchedColor.name} (${matchedColor.hexCode})`;
                }
                resolvedItems.push({
                    productId: product.id,
                    productName: product.name,
                    sku: product.sku,
                    imageUrl: product.imageUrl,
                    quantity: item.quantity,
                    unitPrice: Number(product.price),
                    totalPrice: Number(product.price) * item.quantity,
                    selectedColor,
                    selectedSize
                });
            }
            const subtotal = resolvedItems.reduce((sum, item) => sum + item.totalPrice, 0);
            let discount = 0;
            let coupon = null;
            if (dto.couponCode) {
                coupon = await this.validateCoupon(dto.couponCode, user.id, subtotal);
                discount = this.calculateDiscount(coupon, subtotal, dto.shippingMethod);
            }
            const shippingFee = coupon?.type === coupon_entity_1.CouponType.FREE_SHIPPING
                ? 0
                : standard_charge_1.SHIPPING_FEES[dto.shippingMethod];
            const taxableAmount = subtotal - discount;
            const tax = Math.round(taxableAmount * standard_charge_1.TAX_RATE * 100) / 100;
            const total = Math.round((taxableAmount + shippingFee + tax) * 100) / 100;
            const orderNumber = this.generateOrderNumber();
            const order = this.orderRepo.create({
                userId: user.id,
                shippingAddressId: address.id,
                couponId: coupon?.id,
                orderNumber,
                status: order_status_1.OrderStatus.PENDING,
                shippingMethod: dto.shippingMethod,
                notes: dto.notes,
                subtotal,
                discount,
                shippingFee,
                tax,
                total,
            });
            const savedOrder = await this.orderRepo.save(order);
            const orderItems = resolvedItems.map((item) => this.orderItemRepo.create({
                orderId: savedOrder.id,
                productId: item.productId,
                productName: item.productName,
                sku: item.sku,
                imageUrl: item.imageUrl,
                quantity: item.quantity,
                unitPrice: item.unitPrice,
                totalPrice: item.totalPrice,
                selectedColor: item.selectedColor || undefined,
                selectedSize: item.selectedSize || undefined,
            }));
            await this.orderItemRepo.save(orderItems);
            if (coupon) {
                await this.couponRepo.increment({ id: coupon.id }, 'usageCount', 1);
            }
            const reference = `JSYK-${orderNumber}-${Date.now()}`;
            const payment = this.paymentRepo.create({
                orderId: savedOrder.id,
                method: payment_enums_1.PaymentMethod.CARD,
                status: payment_enums_2.PaymentStatus.PENDING,
                gateway: payment_enums_3.PaymentGateway.PAYSTACK,
                amount: total,
                currency: 'NGN',
                transactionId: reference,
            });
            await this.paymentRepo.save(payment);
            const stripeSession = await this.stripe_checkout(user.email, total, reference, user.id, savedOrder.id, orderNumber);
            this.logger.log(`Checkout complete | Order: ${orderNumber} | User: ${user.id} | Total: ₦${total}`);
            return (0, apiResponse_1.createResponse)(true, "Checkout initialized successfully.", {
                paymentUrl: stripeSession.url,
                reference,
                orderNumber,
                breakdown: { subtotal, discount, shippingFee, tax, total },
            });
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async stripe_checkout(email, amount, reference, userId, orderId, orderNumber) {
        if (!this.STRIPE_API_KEY) {
            const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)('Payment Key is not configured');
            throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
        }
        const stripe = new stripe_1.default(this.STRIPE_API_KEY);
        const session = await stripe.checkout.sessions.create({
            success_url: this.STRIPE_SUCCESS_URL + `?orderNumber=${orderNumber}`,
            cancel_url: this.STRIPE_CANCEL_URL,
            customer_email: email,
            line_items: [
                {
                    price_data: {
                        unit_amount: amount,
                        currency: "ngn",
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            metadata: {
                userId: userId,
                reference: reference,
                orderId: orderId,
                orderNumber: orderNumber,
                amount: amount,
            },
        });
        return session;
    }
    async visitor_checkout(dto) {
        try {
            const user = await this.userService.register_A_Visitor_User(dto);
            if (!user?.email) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)('Unable to create account for checkout');
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const addressData = {
                fullName: user.name,
                phone: user.phone,
                street: dto.street || "N/A",
                city: dto.city || "N/A",
                state: dto.state || "N/A",
                country: dto.country || "N/A",
                postalCode: dto.postalCode || "N/A",
                isDefault: true
            };
            const createdAndDefaultAddress = await this.userService.createVisitorsAddress(addressData, user.id);
            if (!createdAndDefaultAddress) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)('Shipping address not found or does not belong to you.');
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const resolvedItems = [];
            for (const item of dto.items) {
                const product = await this.productService.findOne(item.productId);
                if (!product.isActive) {
                    const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(`"${product.name}" is no longer available.`);
                    throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
                }
                if (product.stock < item.quantity) {
                    const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(`Insufficient stock for "${product.name}". ` +
                        `Requested: ${item.quantity}, Available: ${product.stock}.`);
                    throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
                }
                ;
                let selectedColor = null;
                let selectedSize = null;
                const hasColorOptions = product.colors && product.colors.length > 0;
                if (hasColorOptions) {
                    if (!item.selectedColor) {
                        const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(`Please select a color for "${product.name}".`);
                        throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
                    }
                    const matchedColor = product.colors.find((c) => c.hexCode.toLowerCase() ===
                        item.selectedColor?.toLowerCase());
                    if (!matchedColor) {
                        const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(`"${item.selectedColor}" is not a valid color option for "${product.name}". ` +
                            `Available colors: ${product.colors.map((c) => `${c.name} (${c.hexCode})`).join(', ')}.`);
                        throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
                    }
                    selectedColor = `${matchedColor.name} (${matchedColor.hexCode})`;
                }
                resolvedItems.push({
                    productId: product.id,
                    productName: product.name,
                    sku: product.sku,
                    imageUrl: product.imageUrl,
                    quantity: item.quantity,
                    unitPrice: Number(product.price),
                    totalPrice: Number(product.price) * item.quantity,
                    selectedColor,
                    selectedSize
                });
            }
            const subtotal = resolvedItems.reduce((sum, item) => sum + item.totalPrice, 0);
            let discount = 0;
            let coupon = null;
            if (dto.couponCode) {
                coupon = await this.validateCoupon(dto.couponCode, user.id, subtotal);
                discount = this.calculateDiscount(coupon, subtotal, dto.shippingMethod);
            }
            const shippingFee = coupon?.type === coupon_entity_1.CouponType.FREE_SHIPPING
                ? 0
                : standard_charge_1.SHIPPING_FEES[dto.shippingMethod];
            const taxableAmount = subtotal - discount;
            const tax = Math.round(taxableAmount * standard_charge_1.TAX_RATE * 100) / 100;
            const total = Math.round((taxableAmount + shippingFee + tax) * 100) / 100;
            const orderNumber = this.generateOrderNumber();
            const order = this.orderRepo.create({
                userId: user.id,
                shippingAddressId: createdAndDefaultAddress.id,
                couponId: coupon?.id,
                orderNumber,
                status: order_status_1.OrderStatus.PENDING,
                shippingMethod: dto.shippingMethod,
                notes: dto.notes,
                subtotal,
                discount,
                shippingFee,
                tax,
                total,
            });
            const savedOrder = await this.orderRepo.save(order);
            const orderItems = resolvedItems.map((item) => this.orderItemRepo.create({
                orderId: savedOrder.id,
                productId: item.productId,
                productName: item.productName,
                sku: item.sku,
                imageUrl: item.imageUrl,
                quantity: item.quantity,
                unitPrice: item.unitPrice,
                totalPrice: item.totalPrice,
                selectedColor: item.selectedColor || undefined,
                selectedSize: item.selectedSize || undefined,
            }));
            await this.orderItemRepo.save(orderItems);
            if (coupon) {
                await this.couponRepo.increment({ id: coupon.id }, 'usageCount', 1);
            }
            const reference = `JSYK-${orderNumber}-${Date.now()}`;
            const payment = this.paymentRepo.create({
                orderId: savedOrder.id,
                method: payment_enums_1.PaymentMethod.CARD,
                status: payment_enums_2.PaymentStatus.PENDING,
                gateway: payment_enums_3.PaymentGateway.PAYSTACK,
                amount: total,
                currency: 'NGN',
                transactionId: reference,
            });
            await this.paymentRepo.save(payment);
            const stripeSession = await this.stripe_checkout(user.email, total, reference, user.id, savedOrder.id, orderNumber);
            this.logger.log(`Checkout complete | Order: ${orderNumber} | User: ${user.id} | Total: ₦${total}`);
            return (0, apiResponse_1.createResponse)(true, "Checkout initialized successfully.", {
                paymentUrl: stripeSession.url,
                reference,
                orderNumber,
                breakdown: { subtotal, discount, shippingFee, tax, total },
            });
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async initializePaystackTransaction(params) {
        try {
            const response = await fetch('https://api.paystack.co/transaction/initialize', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: params.email,
                    amount: Math.round(params.amount * 100),
                    reference: params.reference,
                    currency: 'NGN',
                    metadata: {
                        userId: params.userId,
                        orderId: params.orderId,
                        orderNumber: params.orderNumber,
                        custom_fields: [
                            {
                                display_name: 'Order Number',
                                variable_name: 'order_number',
                                value: params.orderNumber,
                            },
                        ],
                    },
                    callback_url: `${process.env.FRONTEND_URL}/checkout/verify?reference=${params.reference}`,
                }),
            });
            const data = await response.json();
            if (!data.status) {
                throw new common_1.BadRequestException(`Paystack initialization failed: ${data.message}`);
            }
            return data.data;
        }
        catch (err) {
            this.logger.error('Paystack transaction initialization failed', err?.message);
            throw new common_1.BadRequestException('Payment gateway error. Please try again.');
        }
    }
    async validateCoupon(code, userId, subtotal) {
        const coupon = await this.couponRepo.findOne({ where: { code } });
        if (!coupon || !coupon.isActive) {
            const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)('Invalid or inactive coupon code.');
            throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
        }
        const now = new Date();
        if (coupon.startsAt && coupon.startsAt > now) {
            const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)('This coupon is not active yet.');
            throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
        }
        if (coupon.expiresAt && coupon.expiresAt < now) {
            const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)('This coupon has expired.');
            throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
        }
        if (coupon.usageLimit !== null && coupon.usageCount >= coupon.usageLimit) {
            const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)('This coupon has reached its usage limit.');
            throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
        }
        if (subtotal < Number(coupon.minOrderAmount)) {
            const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(`Minimum order amount for this coupon is ₦${coupon.minOrderAmount}.`);
            throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
        }
        if (coupon.perUserLimit !== null) {
            const userUsageCount = await this.orderRepo.count({
                where: { userId, couponId: coupon.id },
            });
            if (userUsageCount >= coupon.perUserLimit) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)('You have already used this coupon the maximum number of times.');
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
        }
        return coupon;
    }
    calculateDiscount(coupon, subtotal, shippingMethod) {
        switch (coupon.type) {
            case coupon_entity_1.CouponType.PERCENTAGE: {
                let discount = (subtotal * Number(coupon.value)) / 100;
                if (coupon.maxDiscountAmount !== null) {
                    discount = Math.min(discount, Number(coupon.maxDiscountAmount));
                }
                return Math.round(discount * 100) / 100;
            }
            case coupon_entity_1.CouponType.FIXED_AMOUNT:
                return Math.min(Number(coupon.value), subtotal);
            case coupon_entity_1.CouponType.FREE_SHIPPING:
                return standard_charge_1.SHIPPING_FEES[shippingMethod];
            default:
                return 0;
        }
    }
    generateOrderNumber() {
        const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const randomPart = Math.floor(1000 + Math.random() * 9000);
        return `JSYK-${datePart}-${randomPart}`;
    }
};
exports.CheckoutService = CheckoutService;
exports.CheckoutService = CheckoutService = CheckoutService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(orders_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(order_item_entity_1.OrderItem)),
    __param(2, (0, typeorm_1.InjectRepository)(payment_entity_1.Payment)),
    __param(3, (0, typeorm_1.InjectRepository)(address_entity_1.Address)),
    __param(4, (0, typeorm_1.InjectRepository)(coupon_entity_1.Coupon)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        products_service_1.ProductsService,
        users_service_1.UsersService])
], CheckoutService);
//# sourceMappingURL=checkout.service.js.map