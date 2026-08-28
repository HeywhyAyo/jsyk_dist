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
var WebhooksService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhooksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const payment_enums_1 = require("../payments/enums/payment.enums");
const payment_entity_1 = require("../payments/entities/payment.entity");
const orders_entity_1 = require("../orders/entities/orders.entity");
const order_status_1 = require("../orders/enum/order.status");
const orders_service_1 = require("../orders/orders.service");
const products_service_1 = require("../products/products.service");
const rethrow_exception_1 = require("../shared/utilities/rethrow-exception");
const apiResponse_1 = require("../shared/utilities/apiResponse");
const template_names_1 = require("../shared/constant/template.names");
const users_service_1 = require("../users/users.service");
const emailSubjects_1 = require("../shared/constant/emailSubjects");
const crypto_1 = require("crypto");
const printify_order_service_1 = require("../printify/printify-order.service");
let WebhooksService = WebhooksService_1 = class WebhooksService {
    paymentRepo;
    orderRepo;
    orderService;
    productService;
    usersService;
    printifyOrderService;
    logger = new common_1.Logger(WebhooksService_1.name);
    PRINTIFY_WEBHOOK_SECRET = process.env.PRINTIFY_WEBHOOK_SECRET;
    constructor(paymentRepo, orderRepo, orderService, productService, usersService, printifyOrderService) {
        this.paymentRepo = paymentRepo;
        this.orderRepo = orderRepo;
        this.orderService = orderService;
        this.productService = productService;
        this.usersService = usersService;
        this.printifyOrderService = printifyOrderService;
    }
    async handleEvent(event) {
        try {
            this.logger.log(`Received Stripe event: ${event.type}`);
            switch (event.type) {
                case 'checkout.session.completed':
                    const session = event.data.object;
                    return await this.handleChargeSuccess(session);
                    break;
                case 'checkout.session.async_payment_failed':
                    return await this.handleChargeFailed(event.data);
                    break;
                case 'refund.processed':
                    return await this.handleRefundProcessed(event.data);
                    break;
                default:
                    this.logger.log(`Unhandled Stripe event: ${event.type}`);
            }
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async handleChargeSuccess(data) {
        const stripe_responseData = data;
        const metadata = stripe_responseData.metadata;
        const customer_id = stripe_responseData.customer;
        const reference = metadata.reference;
        const txid = String(data.id);
        const amountPaid = data.amount / 100;
        const payment = await this.paymentRepo.findOne({
            where: { transactionId: reference },
            relations: {
                order: {
                    items: {
                        product: true,
                    },
                    user: true,
                    shippingAddress: true,
                },
            },
        });
        if (!payment) {
            this.logger.error(`No payment found for reference: ${reference}. ` +
                `Make sure you store the Paystack reference before redirecting the user.`);
            const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(`No payment found for reference: ${reference}.`);
            throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
        }
        const userIdFromOrder = payment.order?.user?.id;
        const userIdFromMetadata = metadata?.userId;
        const userId = userIdFromOrder ?? userIdFromMetadata;
        if (!userId) {
            this.logger.error(`Could not determine userId for reference: ${reference}. ` +
                `Check that userId is stored in Paystack metadata at payment initialisation.`);
            const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(`Could not determine userId for reference: ${reference}. `);
            throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
        }
        this.logger.log(`Payment confirmed for user: ${userId} | Order: ${payment.order.orderNumber}`);
        if (payment.status === payment_enums_1.PaymentStatus.PAID) {
            this.logger.warn(`Duplicate webhook for reference: ${reference}. Already processed. Skipping.`);
            const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(`Duplicate webhook for reference: ${reference}. Already processed. Skipping.`);
            throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
        }
        await this.paymentRepo.update(payment.id, {
            status: payment_enums_1.PaymentStatus.PAID,
            transactionId: reference,
            amount: amountPaid,
            paidAt: new Date(),
            metadata: {
                userId,
                paymentReference: metadata?.reference,
                channel: data.channel,
                currency: data.currency,
                customerEmail: data.customer?.email,
                paidAt: data.paid_at,
                gatewayResponse: data.gateway_response,
                cardType: data.authorization?.card_type ?? null,
                bank: data.authorization?.bank ?? null,
            },
        });
        this.logger.log(`Payment ${payment.id} marked as PAID.`);
        for (const item of payment.order.items) {
            try {
                await this.productService.decrementStock(item.productId, item.quantity);
                this.logger.log(`Stock decremented for product ${item.productId} by ${item.quantity} ` +
                    `(order: ${payment.order.orderNumber}, user: ${userId})`);
            }
            catch (err) {
                this.logger.error(`Failed to decrement stock for product ${item.productId}: ${err.message}`);
                (0, rethrow_exception_1.rethrowIfHttpException)(err);
            }
        }
        await this.orderRepo.update(payment.order.id, {
            status: order_status_1.OrderStatus.CONFIRMED,
        });
        this.logger.log(`Order ${payment.order.orderNumber} CONFIRMED for user: ${userId} | ` +
            `Total: ₦${amountPaid}`);
        const emailData = {
            email: payment.order?.user?.email,
            firstName: payment.order?.user?.firstName ?? "User",
            orderId: payment.order.id,
            orderDate: new Date().toLocaleDateString(),
            products: payment.order.items.map(i => ({
                productName: i.productName,
                qty: i.quantity,
                unitPrice: `£${i.totalPrice}`
            })),
            totalPrice: `£${payment.order.total}`,
            shippingAddress: payment.order?.shippingAddress?.street + ' ' + payment.order?.shippingAddress?.city,
            trackingLink: 'https://jsyk.com/track-order/' + payment.order.id,
            year: new Date().getFullYear()
        };
        const printifyOrder = {
            externalId: payment.order.orderNumber,
            label: `Printify Order #${payment.order.orderNumber}`,
            lineItems: payment.order.items.map((item) => ({
                productId: item.product?.printifyProductId ??
                    item.productId,
                variantId: item.product?.printifyVariantId ??
                    0,
                quantity: item.quantity,
                externalId: item.id,
            })),
            shippingMethod: 1,
            sendShippingNotification: true,
            address: {
                firstName: payment.order.shippingAddress.fullName?.split(' ')[0] ??
                    payment.order.user.firstName ??
                    'Customer',
                lastName: payment.order.shippingAddress.fullName
                    ?.split(' ')
                    .slice(1)
                    .join(' ') ??
                    payment.order.user.lastName ??
                    'Customer',
                email: payment.order.user.email,
                phone: payment.order.shippingAddress.phone,
                address1: payment.order.shippingAddress.street,
                address2: undefined,
                city: payment.order.shippingAddress.city,
                region: payment.order.shippingAddress.state,
                zip: payment.order.shippingAddress.postalCode,
                country: payment.order.shippingAddress.country,
            },
        };
        await this.printifyOrderService.create_Printify_Order(printifyOrder);
        await this.purchaseEailSender(emailData);
        const apiResponse = (0, apiResponse_1.createResponse)(true, 'Payment processed successfully.', true);
        throw new common_1.HttpException(apiResponse, common_1.HttpStatus.OK);
    }
    async handleChargeFailed(data) {
        const reference = data.reference;
        const userIdFromMetadata = data.metadata?.userId;
        this.logger.warn(`Payment failed for reference: ${reference} | user: ${userIdFromMetadata ?? 'unknown'}`);
        const payment = await this.paymentRepo.findOne({
            where: { transactionId: reference },
        });
        if (!payment) {
            this.logger.error(`No payment found for failed reference: ${reference}`);
            return;
        }
        await this.paymentRepo.update(payment.id, {
            status: payment_enums_1.PaymentStatus.FAILED,
            metadata: {
                userId: userIdFromMetadata,
                failureReason: data.gateway_response,
                channel: data.channel,
                failedAt: new Date().toISOString(),
            },
        });
        this.logger.log(`Payment ${payment.id} marked as FAILED.`);
    }
    async handleRefundProcessed(data) {
        const reference = data.transaction_reference;
        const refundAmount = data.amount / 100;
        this.logger.log(`Refund processed for reference: ${reference}`);
        const payment = await this.paymentRepo.findOne({
            where: { transactionId: reference },
            relations: { order: { items: true } },
        });
        if (!payment) {
            this.logger.error(`No payment found for refund reference: ${reference}`);
            return;
        }
        for (const item of payment.order.items) {
            await this.productService.incrementStock(item.productId, item.quantity);
            this.logger.log(`Stock restored for product ${item.productId}: +${item.quantity}`);
        }
        await this.paymentRepo.update(payment.id, {
            status: payment_enums_1.PaymentStatus.REFUNDED,
            refundedAmount: refundAmount,
            refundedAt: new Date(),
        });
        await this.orderRepo.update(payment.order.id, {
            status: order_status_1.OrderStatus.REFUNDED,
        });
        this.logger.log(`Order ${payment.order.orderNumber} marked as REFUNDED. Amount: ₦${refundAmount}`);
    }
    async purchaseEailSender(data) {
        const emailParameters = {
            ...data
        };
        await this.usersService.sender(data.email, emailSubjects_1.SUBJECTS.PRODUCT_PURCHASED, template_names_1.TEMPLATE.PRODUCT_PURCHASED_NAME, emailParameters);
    }
    verifySignature(rawBody, signature) {
        if (!rawBody || !signature) {
            throw new common_1.UnauthorizedException('Missing Printify webhook signature');
        }
        const secret = this.PRINTIFY_WEBHOOK_SECRET;
        const digest = (0, crypto_1.createHmac)('sha256', secret)
            .update(rawBody)
            .digest('hex');
        const expectedSignature = `sha256=${digest}`;
        const receivedBuffer = Buffer.from(signature);
        const expectedBuffer = Buffer.from(expectedSignature);
        if (receivedBuffer.length !==
            expectedBuffer.length) {
            throw new common_1.UnauthorizedException('Invalid Printify webhook signature');
        }
        const valid = (0, crypto_1.timingSafeEqual)(receivedBuffer, expectedBuffer);
        if (!valid) {
            throw new common_1.UnauthorizedException('Invalid Printify webhook signature');
        }
    }
    async handle_Printify_Webhook(payload) {
        switch (payload.type) {
            case 'order:shipment:created':
                await this.handleShipmentCreated(payload);
                break;
            case 'order:shipment:delivered':
                await this.handleShipmentDelivered(payload);
                break;
            case 'order:updated':
                await this.handleOrderUpdated(payload);
                break;
            default:
                this.logger.debug(`Ignoring Printify event: ${payload.type}`);
        }
    }
    async handleShipmentCreated(payload) {
        const printifyOrderId = payload.resource.id;
        const data = payload.resource.data;
        await this.orderService.updatePrintifyTracking({
            printifyOrderId,
            status: 'SHIPPED',
            carrier: data.carrier.code,
            trackingNumber: data.carrier.tracking_number,
            trackingUrl: data.carrier.tracking_url,
            shippedAt: data.shipped_at
                ? new Date(data.shipped_at)
                : undefined,
        });
    }
    async handleShipmentDelivered(payload) {
        const printifyOrderId = payload.resource.id;
        const data = payload.resource.data;
        await this.orderService.updatePrintifyTracking({
            printifyOrderId,
            status: 'DELIVERED',
            carrier: data.carrier.code,
            trackingNumber: data.carrier.tracking_number,
            trackingUrl: data.carrier.tracking_url,
            deliveredAt: data.delivered_at
                ? new Date(data.delivered_at)
                : undefined,
        });
    }
    async handleOrderUpdated(payload) {
        const printifyOrderId = payload.resource.id;
        const status = payload.resource.data?.['status'];
        if (!status) {
            return;
        }
        await this.orderService.updatePrintifyStatus(printifyOrderId, status);
    }
};
exports.WebhooksService = WebhooksService;
exports.WebhooksService = WebhooksService = WebhooksService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(payment_entity_1.Payment)),
    __param(1, (0, typeorm_1.InjectRepository)(orders_entity_1.Order)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        orders_service_1.OrdersService,
        products_service_1.ProductsService,
        users_service_1.UsersService,
        printify_order_service_1.PrintifyOrderService])
], WebhooksService);
//# sourceMappingURL=webhooks.service.js.map