"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckoutModule = void 0;
const common_1 = require("@nestjs/common");
const checkout_service_1 = require("./checkout.service");
const checkout_controller_1 = require("./checkout.controller");
const typeorm_1 = require("@nestjs/typeorm");
const products_module_1 = require("../products/products.module");
const orders_entity_1 = require("../orders/entities/orders.entity");
const order_item_entity_1 = require("../orders/entities/order_item.entity");
const payment_entity_1 = require("../payments/entities/payment.entity");
const address_entity_1 = require("../users/entities/address.entity");
const coupon_entity_1 = require("../products/entities/coupon.entity");
const users_module_1 = require("../users/users.module");
const auth_module_1 = require("../auth/auth.module");
let CheckoutModule = class CheckoutModule {
};
exports.CheckoutModule = CheckoutModule;
exports.CheckoutModule = CheckoutModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([orders_entity_1.Order, order_item_entity_1.OrderItem, payment_entity_1.Payment, address_entity_1.Address, coupon_entity_1.Coupon]),
            products_module_1.ProductsModule, users_module_1.UsersModule, auth_module_1.AuthModule
        ],
        controllers: [checkout_controller_1.CheckoutController],
        providers: [checkout_service_1.CheckoutService],
    })
], CheckoutModule);
//# sourceMappingURL=checkout.module.js.map