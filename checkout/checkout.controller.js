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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckoutController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const checkout_service_1 = require("./checkout.service");
const checkout_dto_1 = require("./dto/checkout.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let CheckoutController = class CheckoutController {
    checkoutService;
    constructor(checkoutService) {
        this.checkoutService = checkoutService;
    }
    async checkout(req, dto) {
        return await this.checkoutService.checkout(req.user.id, dto);
    }
    async VisitorCheckout(dto) {
        return await this.checkoutService.visitor_checkout(dto);
    }
};
exports.CheckoutController = CheckoutController;
__decorate([
    (0, common_1.Post)('standard'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: 'Initiate checkout',
        description: `
Validates cart items, applies coupon if provided, calculates the full
cost breakdown, creates an Order and a pending Payment record, then
initializes a Paystack payment session.

**Frontend flow:**
1. Call this endpoint with the cart contents.
2. Receive the \`paymentUrl\` in the response.
3. Redirect the customer to \`paymentUrl\`.
4. Customer pays on Paystack.
5. Paystack redirects back to your \`callback_url\` with the \`reference\`.
6. Use the \`reference\` to show the order summary — the webhook handles the rest.

**Stock is only decremented after payment is confirmed via webhook.**
    `,
    }),
    (0, swagger_1.ApiBody)({
        type: checkout_dto_1.CheckoutDto,
        description: 'Checkout payload including cart items, address, shipping method and optional coupon',
        examples: {
            standard_checkout: {
                summary: 'Standard checkout with coupon',
                value: {
                    items: [
                        { productId: 'a3b8c1d2-4e5f-6789-abcd-ef0123456789', quantity: 2, selectedSize: null, selectedColor: '#1A1A1A' },
                        { productId: 'b1c2d3e4-5f67-89ab-cdef-012345678901', quantity: 1, selectedSize: 'XL', selectedColor: null },
                    ],
                    shippingAddressId: 'c4d5e6f7-8901-2345-bcde-f01234567890',
                    shippingMethod: 'EXPRESS',
                    couponCode: 'SAVE20',
                    notes: 'Please leave at the front door.',
                },
            },
            no_coupon: {
                summary: 'Standard checkout without coupon',
                value: {
                    items: [
                        { productId: 'a3b8c1d2-4e5f-6789-abcd-ef0123456789', quantity: 1 },
                    ],
                    shippingAddressId: 'c4d5e6f7-8901-2345-bcde-f01234567890',
                    shippingMethod: 'STANDARD',
                },
            },
            pickup: {
                summary: 'In-store pickup — no shipping fee',
                value: {
                    items: [
                        { productId: 'a3b8c1d2-4e5f-6789-abcd-ef0123456789', quantity: 1 },
                    ],
                    shippingAddressId: 'c4d5e6f7-8901-2345-bcde-f01234567890',
                    shippingMethod: 'PICKUP',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Order created. Redirect customer to paymentUrl.',
        type: checkout_dto_1.CheckoutResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: `
Bad request. Possible reasons:
- A product is out of stock
- A product is no longer active
- Coupon is invalid, expired, or usage limit reached
- Coupon minimum order amount not met
- compareAtPrice validation failed
    `,
        schema: {
            example: {
                statusCode: 400,
                message: 'Insufficient stock for "Nike Air Max 270". Requested: 3, Available: 1.',
                error: 'Bad Request',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized — JWT token missing or invalid.',
        schema: {
            example: {
                statusCode: 401,
                message: 'Unauthorized',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Shipping address not found or does not belong to the authenticated user.',
        schema: {
            example: {
                statusCode: 404,
                message: 'Shipping address not found or does not belong to you.',
                error: 'Not Found',
            },
        },
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, checkout_dto_1.CheckoutDto]),
    __metadata("design:returntype", Promise)
], CheckoutController.prototype, "checkout", null);
__decorate([
    (0, common_1.Post)('visitor'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: 'Initiate checkout',
        description: `
Validates cart items, applies coupon if provided, calculates the full
cost breakdown, creates an Order and a pending Payment record, then
initializes a Paystack payment session.

**Frontend flow:**
1. Call this endpoint with the cart contents.
2. Receive the \`paymentUrl\` in the response.
3. Redirect the customer to \`paymentUrl\`.
4. Customer pays on Paystack.
5. Paystack redirects back to your \`callback_url\` with the \`reference\`.
6. Use the \`reference\` to show the order summary — the webhook handles the rest.

**Stock is only decremented after payment is confirmed via webhook.**
    `,
    }),
    (0, swagger_1.ApiBody)({
        type: checkout_dto_1.VisitorCheckoutDto,
        description: 'Checkout payload including cart items, address, shipping method and optional coupon',
        examples: {
            standard_checkout: {
                summary: 'Standard checkout with coupon',
                value: {
                    items: [
                        { productId: 'a3b8c1d2-4e5f-6789-abcd-ef0123456789', quantity: 2, selectedSize: 'XL', selectedColor: '#1A1A1A' },
                        { productId: 'b1c2d3e4-5f67-89ab-cdef-012345678901', quantity: 1, selectedSize: null, selectedColor: null },
                    ],
                    shippingAddressId: 'c4d5e6f7-8901-2345-bcde-f01234567890',
                    shippingMethod: 'EXPRESS',
                    couponCode: 'SAVE20',
                    notes: 'Please leave at the front door.',
                    email: 'customer@example.com',
                    firstName: 'John',
                    lastName: 'Doe',
                },
            },
            no_coupon: {
                summary: 'Standard checkout without coupon',
                value: {
                    items: [
                        { productId: 'a3b8c1d2-4e5f-6789-abcd-ef0123456789', quantity: 1 },
                    ],
                    shippingAddressId: 'c4d5e6f7-8901-2345-bcde-f01234567890',
                    shippingMethod: 'STANDARD',
                    email: 'customer@example.com',
                    firstName: 'John',
                    lastName: 'Doe',
                },
            },
            pickup: {
                summary: 'In-store pickup — no shipping fee',
                value: {
                    items: [
                        { productId: 'a3b8c1d2-4e5f-6789-abcd-ef0123456789', quantity: 1 },
                    ],
                    shippingAddressId: 'c4d5e6f7-8901-2345-bcde-f01234567890',
                    shippingMethod: 'PICKUP',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Order created. Redirect customer to paymentUrl.',
        type: checkout_dto_1.CheckoutResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: `
Bad request. Possible reasons:
- A product is out of stock
- A product is no longer active
- Coupon is invalid, expired, or usage limit reached
- Coupon minimum order amount not met
- compareAtPrice validation failed
    `,
        schema: {
            example: {
                statusCode: 400,
                message: 'Insufficient stock for "Nike Air Max 270". Requested: 3, Available: 1.',
                error: 'Bad Request',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Shipping address not found or does not belong to the authenticated user.',
        schema: {
            example: {
                statusCode: 404,
                message: 'Shipping address not found or does not belong to you.',
                error: 'Not Found',
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [checkout_dto_1.VisitorCheckoutDto]),
    __metadata("design:returntype", Promise)
], CheckoutController.prototype, "VisitorCheckout", null);
exports.CheckoutController = CheckoutController = __decorate([
    (0, swagger_1.ApiTags)('Checkout'),
    (0, common_1.Controller)('checkout'),
    __metadata("design:paramtypes", [checkout_service_1.CheckoutService])
], CheckoutController);
//# sourceMappingURL=checkout.controller.js.map