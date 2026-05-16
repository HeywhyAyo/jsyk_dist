"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsModule = void 0;
const common_1 = require("@nestjs/common");
const products_service_1 = require("./products.service");
const products_controller_1 = require("./products.controller");
const products_entity_1 = require("./entities/products.entity");
const typeorm_1 = require("@nestjs/typeorm");
const users_module_1 = require("../users/users.module");
const artist_song_module_1 = require("../artist_song/artist_song.module");
const product_review_service_1 = require("./product.review.service");
const product_review_entity_1 = require("./entities/product.review.entity");
const product_review_controller_1 = require("./product.review.controller");
const orders_entity_1 = require("../orders/entities/orders.entity");
const auth_module_1 = require("../auth/auth.module");
let ProductsModule = class ProductsModule {
};
exports.ProductsModule = ProductsModule;
exports.ProductsModule = ProductsModule = __decorate([
    (0, common_1.Module)({
        controllers: [products_controller_1.ProductsController, product_review_controller_1.ReviewController],
        providers: [products_service_1.ProductsService, product_review_service_1.ReviewService],
        imports: [typeorm_1.TypeOrmModule.forFeature([products_entity_1.Product, product_review_entity_1.Review, orders_entity_1.Order]),
            users_module_1.UsersModule,
            artist_song_module_1.ArtistSongModule,
            auth_module_1.AuthModule],
        exports: [products_service_1.ProductsService, product_review_service_1.ReviewService],
    })
], ProductsModule);
//# sourceMappingURL=products.module.js.map