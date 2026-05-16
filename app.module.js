"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const typeorm_1 = require("@nestjs/typeorm");
const admin_module_1 = require("./admin/admin.module");
const user_entity_1 = require("./users/entities/user.entity");
const products_module_1 = require("./products/products.module");
const orders_module_1 = require("./orders/orders.module");
const payments_module_1 = require("./payments/payments.module");
const shipments_module_1 = require("./shipments/shipments.module");
const products_entity_1 = require("./products/entities/products.entity");
const payment_entity_1 = require("./payments/entities/payment.entity");
const order_item_entity_1 = require("./orders/entities/order_item.entity");
const orders_entity_1 = require("./orders/entities/orders.entity");
const coupon_entity_1 = require("./products/entities/coupon.entity");
const product_review_entity_1 = require("./products/entities/product.review.entity");
const shipment_entity_1 = require("./shipments/entities/shipment.entity");
const address_entity_1 = require("./users/entities/address.entity");
const wallet_entity_1 = require("./wallet/entities/wallet.entity");
const transaction_entity_1 = require("./transactions/entities/transaction.entity");
const webhooks_module_1 = require("./webhooks/webhooks.module");
const checkout_module_1 = require("./checkout/checkout.module");
const artist_song_module_1 = require("./artist_song/artist_song.module");
const artist_entity_1 = require("./artist_song/entities/artist.entity");
const songs_entity_1 = require("./artist_song/entities/songs.entity");
const wallet_module_1 = require("./wallet/wallet.module");
const collection_module_1 = require("./collection/collection.module");
const collection_entity_1 = require("./collection/entities/collection.entity");
const stripe_module_1 = require("./stripe/stripe.module");
const analytics_module_1 = require("./analytics/analytics.module");
const draw_module_1 = require("./draw/draw.module");
const draw_participant_entity_1 = require("./draw/entities/draw.participant.entity");
const draw_entity_1 = require("./draw/entities/draw.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forRoot({
                type: "postgres",
                url: process.env.DATABASE_URL,
                entities: [
                    user_entity_1.User, orders_entity_1.Order, order_item_entity_1.OrderItem, products_entity_1.Product, payment_entity_1.Payment, coupon_entity_1.Coupon, product_review_entity_1.Review, shipment_entity_1.Shipment, address_entity_1.Address, wallet_entity_1.Wallet, transaction_entity_1.Transaction, artist_entity_1.Artist, songs_entity_1.Song, collection_entity_1.Collection,
                    draw_participant_entity_1.DrawParticipant, draw_entity_1.Draw
                ],
                synchronize: true,
            }),
            users_module_1.UsersModule,
            admin_module_1.AdminModule,
            products_module_1.ProductsModule,
            orders_module_1.OrdersModule,
            payments_module_1.PaymentsModule,
            shipments_module_1.ShipmentsModule,
            webhooks_module_1.WebhooksModule,
            checkout_module_1.CheckoutModule,
            artist_song_module_1.ArtistSongModule,
            wallet_module_1.WalletModule,
            collection_module_1.CollectionModule,
            stripe_module_1.StripeModule,
            analytics_module_1.AnalyticsModule,
            draw_module_1.DrawModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map