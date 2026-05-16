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
exports.CollectionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const collection_service_1 = require("./collection.service");
const collection_ts_dto_1 = require("./dto/collection.ts.dto");
let CollectionController = class CollectionController {
    collectionService;
    constructor(collectionService) {
        this.collectionService = collectionService;
    }
    async createNewCollection(dto) {
        return await this.collectionService.create_collection(dto);
    }
    findAll(page, limit) {
        return this.collectionService.findAllCollections(page, limit);
    }
    getProducts(id, page, limit, search, status, musicCategory) {
        return this.collectionService.getProductsInCollection(id, page, limit, search, status, musicCategory);
    }
    findByArtist(artistId) {
        return this.collectionService.findByArtist(artistId);
    }
    findOne(id) {
        return this.collectionService.lookupSingleCollection(id);
    }
};
exports.CollectionController = CollectionController;
__decorate([
    (0, common_1.Post)('new-collection'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new collection' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Collection created.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Collection name already exists.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [collection_ts_dto_1.CollectionCreationDto]),
    __metadata("design:returntype", Promise)
], CollectionController.prototype, "createNewCollection", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'List all artist collections',
        description: 'Returns artist name, product count, revenue and status for each collection.',
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, example: 14 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        schema: {
            example: {
                data: [{
                        id: 'uuid',
                        artistName: 'WAVES',
                        artistImage: 'https://cdn.jsyk.com/artists/waves.jpg',
                        collectionName: 'WAVES Collection',
                        products: 22,
                        totalRevenue: 68000,
                        status: 'ACTIVE',
                        addedAt: '2024-08-07T00:00:00.000Z',
                    }],
                total: 12400, page: 1, limit: 14, totalPages: 886,
            },
        },
    }),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], CollectionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id/products'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get products in a collection',
        description: 'Returns the Artist Product Management table — Product ID, Title, Music Category, Price, Stock, Date.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'UUID of the collection' }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, description: 'Search by product name' }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: ['all', 'active', 'inactive', 'outOfStock'] }),
    (0, swagger_1.ApiQuery)({ name: 'musicCategory', required: false, description: 'Filter by music genre' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, example: 14 }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(14), common_1.ParseIntPipe)),
    __param(3, (0, common_1.Query)('search')),
    __param(4, (0, common_1.Query)('status')),
    __param(5, (0, common_1.Query)('musicCategory')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, String, String, String]),
    __metadata("design:returntype", void 0)
], CollectionController.prototype, "getProducts", null);
__decorate([
    (0, common_1.Get)('artist/:artistId'),
    (0, swagger_1.ApiOperation)({ summary: "Get an artist's collection by artistId" }),
    (0, swagger_1.ApiParam)({ name: 'artistId', description: 'UUID of the artist' }),
    __param(0, (0, common_1.Param)('artistId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CollectionController.prototype, "findByArtist", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get collection by ID with stats',
        description: 'Returns collection info + Total Products, Products Sold, Revenue, Out Of Stock counts.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'UUID of the collection' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CollectionController.prototype, "findOne", null);
exports.CollectionController = CollectionController = __decorate([
    (0, swagger_1.ApiTags)('Collections'),
    (0, common_1.Controller)('collections'),
    __metadata("design:paramtypes", [collection_service_1.CollectionService])
], CollectionController);
//# sourceMappingURL=collection.controller.js.map