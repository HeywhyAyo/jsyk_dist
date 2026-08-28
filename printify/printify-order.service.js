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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrintifyOrderService = void 0;
const common_1 = require("@nestjs/common");
const apiResponse_1 = require("../shared/utilities/apiResponse");
let PrintifyOrderService = class PrintifyOrderService {
    baseUrl = 'https://api.printify.com/v1';
    apiKey = process.env.PRINTIFY_API_KEY;
    PRINTIFY_SHOP_ID = process.env.PRINTIFY_SHOP_ID;
    constructor() { }
    get headers() {
        return {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json;charset=utf-8',
            'User-Agent': 'JSYK-Ecommerce',
        };
    }
    async create_Printify_Order(dto) {
        const shopId = this.PRINTIFY_SHOP_ID;
        const response = await fetch(`${this.baseUrl}/shops/${shopId}/orders.json`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                external_id: dto.externalId,
                ...(dto.label && {
                    label: dto.label,
                }),
                line_items: dto.lineItems.map((item) => ({
                    product_id: item.productId,
                    variant_id: item.variantId,
                    quantity: item.quantity,
                    ...(item.externalId && {
                        external_id: item.externalId,
                    }),
                })),
                shipping_method: dto.shippingMethod,
                send_shipping_notification: dto.sendShippingNotification ??
                    false,
                address_to: {
                    first_name: dto.address.firstName,
                    last_name: dto.address.lastName,
                    email: dto.address.email,
                    phone: dto.address.phone,
                    address1: dto.address.address1,
                    address2: dto.address.address2,
                    city: dto.address.city,
                    region: dto.address.region ?? '',
                    zip: dto.address.zip,
                    country: dto.address.country,
                },
            }),
        });
        if (!response.ok) {
            const error = await response.text();
            const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(`Printify order creation failed: ${error}`);
            throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
        }
        return response.json();
    }
};
exports.PrintifyOrderService = PrintifyOrderService;
exports.PrintifyOrderService = PrintifyOrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PrintifyOrderService);
//# sourceMappingURL=printify-order.service.js.map