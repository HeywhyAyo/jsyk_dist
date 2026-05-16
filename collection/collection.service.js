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
exports.CollectionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const collection_entity_1 = require("./entities/collection.entity");
const products_entity_1 = require("../products/entities/products.entity");
const artist_entity_1 = require("../artist_song/entities/artist.entity");
const apiResponse_1 = require("../shared/utilities/apiResponse");
const rethrow_exception_1 = require("../shared/utilities/rethrow-exception");
let CollectionService = class CollectionService {
    collectionRepo;
    productRepo;
    artistRepo;
    constructor(collectionRepo, productRepo, artistRepo) {
        this.collectionRepo = collectionRepo;
        this.productRepo = productRepo;
        this.artistRepo = artistRepo;
    }
    async create_collection(dto) {
        try {
            if (!dto.artistId) {
                throw new common_1.HttpException((0, apiResponse_1.createUnSuccessfulResponse)('artistId is required to create a collection.'), common_1.HttpStatus.BAD_REQUEST);
            }
            if (!dto.name) {
                throw new common_1.HttpException((0, apiResponse_1.createUnSuccessfulResponse)('Collection name is required.'), common_1.HttpStatus.BAD_REQUEST);
            }
            const artist = await this.artistRepo.findOneBy({ id: dto.artistId });
            if (!artist) {
                throw new common_1.HttpException((0, apiResponse_1.createUnSuccessfulResponse)('Artist not found.'), common_1.HttpStatus.BAD_REQUEST);
            }
            const collection = this.collectionRepo.create({
                artistId: dto.artistId,
                name: `${dto.name} Collection`,
                status: collection_entity_1.CollectionStatus.NEW,
            });
            const created_collection = await this.collectionRepo.save(collection);
            return (0, apiResponse_1.createResponse)(true, 'Collection created successfully', created_collection.id);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async findAll(page = 1, limit = 10) {
        const [collections, total] = await this.collectionRepo.findAndCount({
            relations: { artist: true },
            order: { createdAt: 'DESC' },
            skip: (page - 1) * limit,
            take: limit,
        });
        const data = await Promise.all(collections.map(async (col) => {
            const productCount = await this.productRepo.count({
                where: { collectionId: col.id },
            });
            const revenueResult = await this.productRepo
                .createQueryBuilder('product')
                .select('SUM(product.price * (product.stock))', 'revenue')
                .where('product.collectionId = :id', { id: col.id })
                .getRawOne();
            return {
                id: col.id,
                artistName: col.artist.name,
                artistImage: col.artist.imageUrl,
                collectionName: col.name,
                products: productCount,
                totalRevenue: Number(revenueResult?.revenue ?? 0),
                status: col.status,
                addedAt: col.createdAt,
            };
        }));
        return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
    }
    async findAllCollections(page, limit) {
        try {
            const res = await this.findAll(page, limit);
            return (0, apiResponse_1.createResponse)(true, 'Collections retrieved successfully', res);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async findOne(id) {
        const collection = await this.collectionRepo.findOne({
            where: { id },
            relations: { artist: true },
        });
        if (!collection)
            throw new common_1.HttpException((0, apiResponse_1.createUnSuccessfulResponse)(`Collection #${id} not found.`), common_1.HttpStatus.NOT_FOUND);
        const totalProducts = await this.productRepo.count({
            where: { collectionId: id },
        });
        const outOfStock = await this.productRepo
            .createQueryBuilder('product')
            .where('product.collectionId = :id', { id })
            .andWhere('product.stock = 0')
            .getCount();
        const revenueResult = await this.productRepo
            .createQueryBuilder('product')
            .leftJoin('product.collection', 'collection')
            .innerJoin('order_items', 'item', 'item.productId = product.id')
            .innerJoin('orders', 'order', 'order.id = item.orderId AND order.status = :status', {
            status: 'CONFIRMED',
        })
            .select('SUM(item.totalPrice)', 'revenue')
            .addSelect('SUM(item.quantity)', 'sold')
            .where('product.collectionId = :id', { id })
            .getRawOne();
        return {
            collection,
            stats: {
                totalProducts,
                productsSold: Number(revenueResult?.sold ?? 0),
                revenue: Number(revenueResult?.revenue ?? 0),
                outOfStock,
            },
        };
    }
    async lookupSingleCollection(id) {
        try {
            const collection = await this.findOne(id);
            if (!collection) {
                throw new common_1.HttpException((0, apiResponse_1.createUnSuccessfulResponse)(`Collection #${id} not found.`), common_1.HttpStatus.NOT_FOUND);
            }
            return (0, apiResponse_1.createResponse)(true, 'Collection retrieved successfully', collection);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async getProducts(collectionId, page = 1, limit = 10, search, status, musicCategory) {
        const exists = await this.collectionRepo.existsBy({ id: collectionId });
        if (!exists)
            throw new common_1.HttpException((0, apiResponse_1.createUnSuccessfulResponse)(`Collection #${collectionId} not found.`), common_1.HttpStatus.NOT_FOUND);
        const qb = this.productRepo
            .createQueryBuilder('product')
            .where('product.collectionId = :collectionId', { collectionId });
        if (search) {
            qb.andWhere('product.name ILIKE :search', { search: `%${search}%` });
        }
        if (status === 'active')
            qb.andWhere('product.isActive = true');
        if (status === 'inactive')
            qb.andWhere('product.isActive = false');
        if (status === 'outOfStock')
            qb.andWhere('product.stock = 0');
        if (musicCategory) {
            qb.andWhere('product.musicCategory = :musicCategory', { musicCategory });
        }
        qb.orderBy('product.createdAt', 'DESC')
            .skip((page - 1) * limit)
            .take(limit);
        const [data, total] = await qb.getManyAndCount();
        return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
    }
    async getProductsInCollection(collectionId, page, limit, search, status, musicCategory) {
        try {
            const res = await this.getProducts(collectionId, page, limit, search, status, musicCategory);
            return (0, apiResponse_1.createResponse)(true, 'Products retrieved successfully', res);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async update(id, dto) {
        const collection = await this.collectionRepo.findOneBy({ id });
        if (!collection)
            throw new common_1.HttpException((0, apiResponse_1.createUnSuccessfulResponse)(`Collection #${id} not found.`), common_1.HttpStatus.NOT_FOUND);
        Object.assign(collection, dto);
        return this.collectionRepo.save(collection);
    }
    async findByArtist(artistId) {
        try {
            const collection = await this.collectionRepo.findOne({
                where: { artistId },
                relations: { artist: true },
            });
            if (!collection) {
                throw new common_1.HttpException((0, apiResponse_1.createUnSuccessfulResponse)(`Collection for artist #${artistId} not found.`), common_1.HttpStatus.NOT_FOUND);
            }
            return (0, apiResponse_1.createResponse)(true, 'Collection retrieved successfully', collection);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
};
exports.CollectionService = CollectionService;
exports.CollectionService = CollectionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(collection_entity_1.Collection)),
    __param(1, (0, typeorm_1.InjectRepository)(products_entity_1.Product)),
    __param(2, (0, typeorm_1.InjectRepository)(artist_entity_1.Artist)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CollectionService);
//# sourceMappingURL=collection.service.js.map