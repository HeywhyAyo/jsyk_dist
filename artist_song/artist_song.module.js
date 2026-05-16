"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtistSongModule = void 0;
const common_1 = require("@nestjs/common");
const artist_song_service_1 = require("./artist_song.service");
const artist_song_controller_1 = require("./artist_song.controller");
const typeorm_1 = require("@nestjs/typeorm");
const artist_entity_1 = require("./entities/artist.entity");
const songs_entity_1 = require("./entities/songs.entity");
const products_entity_1 = require("../products/entities/products.entity");
const admin_controller_1 = require("../admin/admin.controller");
const products_controller_1 = require("../products/products.controller");
const auth_module_1 = require("../auth/auth.module");
const products_module_1 = require("../products/products.module");
const admin_module_1 = require("../admin/admin.module");
const users_module_1 = require("../users/users.module");
const collection_entity_1 = require("../collection/entities/collection.entity");
const collection_module_1 = require("../collection/collection.module");
const orders_module_1 = require("../orders/orders.module");
const draw_module_1 = require("../draw/draw.module");
let ArtistSongModule = class ArtistSongModule {
};
exports.ArtistSongModule = ArtistSongModule;
exports.ArtistSongModule = ArtistSongModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([artist_entity_1.Artist, songs_entity_1.Song, products_entity_1.Product, collection_entity_1.Collection]),
            auth_module_1.AuthModule,
            (0, common_1.forwardRef)(() => products_module_1.ProductsModule),
            (0, common_1.forwardRef)(() => admin_module_1.AdminModule),
            users_module_1.UsersModule,
            collection_module_1.CollectionModule,
            orders_module_1.OrdersModule,
            draw_module_1.DrawModule
        ],
        controllers: [artist_song_controller_1.ArtistSongController,
            products_controller_1.ProductsController,
            admin_controller_1.AdminController,
        ],
        providers: [artist_song_service_1.ArtistSongService, artist_song_service_1.SongService],
        exports: [artist_song_service_1.ArtistSongService, artist_song_service_1.SongService],
    })
], ArtistSongModule);
//# sourceMappingURL=artist_song.module.js.map