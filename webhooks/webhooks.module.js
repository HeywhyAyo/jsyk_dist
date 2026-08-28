"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhooksModule = void 0;
const common_1 = require("@nestjs/common");
const webhooks_service_1 = require("./webhooks.service");
const webhooks_controller_1 = require("./webhooks.controller");
const typeorm_1 = require("@nestjs/typeorm");
const payment_entity_1 = require("../payments/entities/payment.entity");
const orders_entity_1 = require("../orders/entities/orders.entity");
const products_module_1 = require("../products/products.module");
const users_module_1 = require("../users/users.module");
const printify_module_1 = require("../printify/printify.module");
const orders_module_1 = require("../orders/orders.module");
let WebhooksModule = class WebhooksModule {
};
exports.WebhooksModule = WebhooksModule;
exports.WebhooksModule = WebhooksModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([payment_entity_1.Payment, orders_entity_1.Order]),
            products_module_1.ProductsModule,
            users_module_1.UsersModule,
            printify_module_1.PrintifyModule,
            orders_module_1.OrdersModule,
        ],
        controllers: [webhooks_controller_1.WebhooksController],
        providers: [webhooks_service_1.WebhooksService],
    })
], WebhooksModule);
//# sourceMappingURL=webhooks.module.js.map