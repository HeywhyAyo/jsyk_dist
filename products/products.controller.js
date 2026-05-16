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
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const products_service_1 = require("./products.service");
const createProduct_dto_1 = require("./dto/createProduct.dto");
const artist_song_service_1 = require("../artist_song/artist_song.service");
let ProductsController = class ProductsController {
    productService;
    songService;
    constructor(productService, songService) {
        this.productService = productService;
        this.songService = songService;
    }
    async findAll(query) {
        return await this.productService.find_all_for_marketplace(query);
    }
    async getFilters(query) {
        return await this.productService.get_filters_for_marketplace();
    }
    async getProductSongs(productId) {
        return await this.songService.getProductSongs(productId);
    }
    async findBySlug(slug) {
        return await this.productService.find_One_product_by_slug(slug);
    }
    async findRelated(id) {
        return await this.productService.findRelated(id);
    }
    async findOne(id) {
        return await this.productService.find_One_product(id);
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, common_1.Get)('marketplace'),
    (0, swagger_1.ApiOperation)({
        summary: 'List all active products',
        description: 'Returns a paginated list of active products. Supports filtering by ' +
            'category, type, gender, brand, tag, price range, and stock availability.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Paginated product list returned.' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createProduct_dto_1.QueryProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('filters/marketplace'),
    (0, swagger_1.ApiOperation)({
        summary: 'List all filters for marketplace',
        description: 'Returns a paginated list of active products. Supports filtering by ' +
            'category, type, gender, brand, tag, price range, and stock availability.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Filter list returned.' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createProduct_dto_1.QueryProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getFilters", null);
__decorate([
    (0, common_1.Get)(':productId/songs'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all songs attached to a product',
        description: 'Returns songs with artist info and all streaming platform links. ' +
            'Only call this when the product detail page loads — ' +
            'check if the array is non-empty before rendering the music section.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Songs returned. Empty array means no music attached.',
        schema: {
            example: [
                {
                    id: 'uuid',
                    title: 'Last Last',
                    coverUrl: 'https://cdn.jsyk.com/songs/last-last.jpg',
                    releaseYear: 2022,
                    spotifyUrl: 'https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT',
                    appleMusicUrl: 'https://music.apple.com/us/album/last-last/1621914515',
                    youtubeMusicUrl: 'https://music.youtube.com/watch?v=abc123',
                    tidalUrl: 'https://tidal.com/browse/track/234567890',
                    artist: {
                        id: 'uuid',
                        name: 'Burna Boy',
                        imageUrl: 'https://cdn.jsyk.com/artists/burna-boy.jpg',
                        isVerified: true,
                    },
                },
            ],
        },
    }),
    __param(0, (0, common_1.Param)('productId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getProductSongs", null);
__decorate([
    (0, common_1.Get)('slug/:slug'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get product by slug',
        description: 'Fetch a single active product using its URL-safe slug. Used for SEO-friendly product pages.',
    }),
    (0, swagger_1.ApiParam)({ name: 'slug', example: 'nike-air-force-1-low' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Product found.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product not found.' }),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findBySlug", null);
__decorate([
    (0, common_1.Get)(':id/related'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get related products',
        description: 'Returns up to 8 random active products in the same category. Used for "You may also like" sections.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Product UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Related products returned.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findRelated", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get product by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Product UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Product found.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product not found.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findOne", null);
exports.ProductsController = ProductsController = __decorate([
    (0, swagger_1.ApiTags)('Products'),
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService,
        artist_song_service_1.SongService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map