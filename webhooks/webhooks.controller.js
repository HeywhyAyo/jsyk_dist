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
var WebhooksController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhooksController = void 0;
const common_1 = require("@nestjs/common");
const crypto = require("crypto");
const webhooks_service_1 = require("./webhooks.service");
const stripe_1 = require("stripe");
let WebhooksController = WebhooksController_1 = class WebhooksController {
    webhookService;
    logger = new common_1.Logger(WebhooksController_1.name);
    constructor(webhookService) {
        this.webhookService = webhookService;
    }
    SecretKey = process.env.PAYSTACK_SECRET_KEY || "";
    STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "";
    STRIPE_API_KEY = process.env.STRIPE_API_KEY || "";
    async handle(req) {
        const sig = req.headers["stripe-signature"];
        const webhookSecret = this.STRIPE_WEBHOOK_SECRET;
        const stripe = new stripe_1.default(this.STRIPE_API_KEY);
        const hash = crypto
            .createHmac("sha512", this.STRIPE_WEBHOOK_SECRET)
            .update(JSON.stringify(req.body))
            .digest("hex");
        if (hash !== sig) {
            this.logger.warn('Invalid Stripe webhook signature — request rejected.');
            throw new common_1.UnauthorizedException('Invalid webhook signature.');
        }
        const rawBody = req.body;
        const event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
        this.webhookService.handleEvent(event).catch((err) => {
            this.logger.error(`Webhook processing failed for event: ${event?.type} | Error: ${err.message}`, err);
        });
        return { received: true };
    }
};
exports.WebhooksController = WebhooksController;
__decorate([
    (0, common_1.Post)('complete-heady-stripe-resonnance'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WebhooksController.prototype, "handle", null);
exports.WebhooksController = WebhooksController = WebhooksController_1 = __decorate([
    (0, common_1.Controller)('webhooks/paystack'),
    __metadata("design:paramtypes", [webhooks_service_1.WebhooksService])
], WebhooksController);
//# sourceMappingURL=webhooks.controller.js.map