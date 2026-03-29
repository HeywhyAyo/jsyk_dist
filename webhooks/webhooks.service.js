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
const products_service_1 = require("../products/products.service");
const rethrow_exception_1 = require("../shared/utilities/rethrow-exception");
let WebhooksService = WebhooksService_1 = class WebhooksService {
    paymentRepo;
    orderRepo;
    productService;
    logger = new common_1.Logger(WebhooksService_1.name);
    constructor(paymentRepo, orderRepo, productService) {
        this.paymentRepo = paymentRepo;
        this.orderRepo = orderRepo;
        this.productService = productService;
    }
    async handleEvent(event) {
        try {
            this.logger.log(`Received Paystack event: ${event.event}`);
            switch (event.event) {
                case 'charge.success':
                    return await this.handleChargeSuccess(event.data);
                    break;
                case 'charge.failed':
                    return await this.handleChargeFailed(event.data);
                    break;
                case 'refund.processed':
                    return await this.handleRefundProcessed(event.data);
                    break;
                default:
                    this.logger.log(`Unhandled Paystack event: ${event.event}`);
            }
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async handleChargeSuccess(data) {
        const reference = data.reference;
        const transactionId = String(data.id);
        const amountPaid = data.amount / 100;
        const payment = await this.paymentRepo.findOne({
            where: { transactionId: reference },
            relations: {
                order: {
                    items: true,
                    user: true,
                },
            },
        });
        if (!payment) {
            this.logger.error(`No payment found for reference: ${reference}. ` +
                `Make sure you store the Paystack reference before redirecting the user.`);
            return;
        }
        const userIdFromOrder = payment.order?.user?.id;
        const userIdFromMetadata = data.metadata?.userId;
        const userId = userIdFromOrder ?? userIdFromMetadata;
        if (!userId) {
            this.logger.error(`Could not determine userId for reference: ${reference}. ` +
                `Check that userId is stored in Paystack metadata at payment initialisation.`);
            return;
        }
        this.logger.log(`Payment confirmed for user: ${userId} | Order: ${payment.order.orderNumber}`);
        if (payment.status === payment_enums_1.PaymentStatus.PAID) {
            this.logger.warn(`Duplicate webhook for reference: ${reference}. Already processed. Skipping.`);
            return;
        }
        await this.paymentRepo.update(payment.id, {
            status: payment_enums_1.PaymentStatus.PAID,
            transactionId,
            amount: amountPaid,
            paidAt: new Date(),
            metadata: {
                userId,
                paystackReference: data.reference,
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
            }
        }
        await this.orderRepo.update(payment.order.id, {
            status: order_status_1.OrderStatus.CONFIRMED,
        });
        this.logger.log(`Order ${payment.order.orderNumber} CONFIRMED for user: ${userId} | ` +
            `Total: ₦${amountPaid}`);
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
};
exports.WebhooksService = WebhooksService;
exports.WebhooksService = WebhooksService = WebhooksService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(payment_entity_1.Payment)),
    __param(1, (0, typeorm_1.InjectRepository)(orders_entity_1.Order)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        products_service_1.ProductsService])
], WebhooksService);
//# sourceMappingURL=webhooks.service.js.map