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
exports.OrdersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const orders_service_1 = require("./orders.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let OrdersController = class OrdersController {
    orderService;
    constructor(orderService) {
        this.orderService = orderService;
    }
    findMyOrders(req, page, limit) {
        return this.orderService.findByUserOrders(req.user.id, page, limit);
    }
    findMyOrder(id, req) {
        return this.orderService.findByUserOrder(id, req.user.id);
    }
    findByOrderNumber(orderNumber) {
        return this.orderService.findByOrderNumberAfterPayment(orderNumber);
    }
};
exports.OrdersController = OrdersController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get logged-in customer order history' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, example: 10 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Paginated customer orders returned.',
        schema: {
            example: {
                data: [
                    {
                        id: 'uuid',
                        orderNumber: 'JSYK-20240328-4821',
                        status: 'CONFIRMED',
                        total: 43700,
                        createdAt: '2024-03-28T10:00:00.000Z',
                        items: [{ productName: 'Oversized Hoodie', quantity: 2 }],
                        payment: { status: 'PAID', method: 'CARD' },
                        shipment: { status: 'IN_TRANSIT', trackingNumber: 'DHL123456' },
                    },
                ],
                total: 14,
                page: 1,
                limit: 10,
                totalPages: 2,
            },
        },
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "findMyOrders", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get a single order detail (customer)',
        description: 'Returns full order detail including items, payment and shipment. ' +
            'A customer can only access their own orders.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'UUID of the order' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Full order detail returned.',
        schema: {
            example: {
                id: 'uuid',
                orderNumber: 'JSYK-20240328-4821',
                status: 'DELIVERED',
                subtotal: 45000,
                discount: 9000,
                shippingFee: 5000,
                tax: 2700,
                total: 43700,
                shippingMethod: 'EXPRESS',
                notes: 'Leave at front door.',
                createdAt: '2024-03-28T10:00:00.000Z',
                shippingAddress: {
                    fullName: 'John Doe',
                    street: '12 Banana Island Road',
                    city: 'Lagos',
                    state: 'Lagos',
                    country: 'Nigeria',
                    postalCode: '101001',
                },
                items: [
                    {
                        productName: 'Oversized Fleece Hoodie',
                        sku: 'JSYK-HDY-001',
                        imageUrl: 'https://cdn.jsyk.com/products/hoodie.jpg',
                        selectedColor: 'Midnight Black (#1A1A1A)',
                        quantity: 2,
                        unitPrice: 25000,
                        totalPrice: 50000,
                    },
                ],
                payment: {
                    status: 'PAID',
                    method: 'CARD',
                    gateway: 'PAYSTACK',
                    amount: 43700,
                    paidAt: '2024-03-28T10:05:00.000Z',
                },
                shipment: {
                    status: 'DELIVERED',
                    carrier: 'DHL',
                    trackingNumber: 'DHL123456789',
                    trackingUrl: 'https://www.dhl.com/track?id=DHL123456789',
                    shippedAt: '2024-03-29T08:00:00.000Z',
                    deliveredAt: '2024-03-31T14:30:00.000Z',
                },
                coupon: {
                    code: 'SAVE20',
                    type: 'PERCENTAGE',
                    value: 20,
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Order not found.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "findMyOrder", null);
__decorate([
    (0, common_1.Get)('track/:orderNumber'),
    (0, swagger_1.ApiOperation)({
        summary: 'Track order by order number',
        description: 'Used after returning from Paystack. ' +
            'The frontend gets orderNumber from the URL and calls this to show the order summary.',
    }),
    (0, swagger_1.ApiParam)({ name: 'orderNumber', example: 'JSYK-20240328-4821' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Order found.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Order not found.' }),
    __param(0, (0, common_1.Param)('orderNumber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "findByOrderNumber", null);
exports.OrdersController = OrdersController = __decorate([
    (0, swagger_1.ApiTags)('My Orders'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [orders_service_1.OrdersService])
], OrdersController);
//# sourceMappingURL=orders.controller.js.map