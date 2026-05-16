"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const admin_controller_1 = require("./admin.controller");
const auth_module_1 = require("../auth/auth.module");
const products_module_1 = require("../products/products.module");
const users_module_1 = require("../users/users.module");
const artist_song_module_1 = require("../artist_song/artist_song.module");
const collection_module_1 = require("../collection/collection.module");
const orders_module_1 = require("../orders/orders.module");
const draw_module_1 = require("../draw/draw.module");
let AdminModule = class AdminModule {
};
exports.AdminModule = AdminModule;
exports.AdminModule = AdminModule = __decorate([
    (0, common_1.Module)({
        controllers: [admin_controller_1.AdminController],
        providers: [admin_service_1.AdminService],
        imports: [auth_module_1.AuthModule,
            products_module_1.ProductsModule,
            users_module_1.UsersModule,
            (0, common_1.forwardRef)(() => artist_song_module_1.ArtistSongModule),
            collection_module_1.CollectionModule,
            orders_module_1.OrdersModule,
            draw_module_1.DrawModule],
        exports: [admin_service_1.AdminService],
    })
], AdminModule);
//# sourceMappingURL=admin.module.js.map