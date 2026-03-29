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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const products_entity_1 = require("./entities/products.entity");
const slugify_util_1 = require("../shared/utilities/slugify.util");
const Cloudinary_1 = require("../shared/services/Cloudinary");
const rethrow_exception_1 = require("../shared/utilities/rethrow-exception");
const apiResponse_1 = require("../shared/utilities/apiResponse");
const users_service_1 = require("../users/users.service");
let ProductsService = class ProductsService {
    productRepo;
    usersService;
    constructor(productRepo, usersService) {
        this.productRepo = productRepo;
        this.usersService = usersService;
    }
    async create(dto, files, createdBy) {
        if (dto.compareAtPrice !== undefined && dto.compareAtPrice <= dto.price) {
            const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)('compareAtPrice must be greater than the selling price.');
            throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
        }
        const skuExists = await this.productRepo.existsBy({ sku: dto.sku });
        if (skuExists) {
            const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(`SKU "${dto.sku}" is already in use. Please choose a different SKU.`);
            throw new common_1.HttpException(apiResponse, common_1.HttpStatus.CONFLICT);
        }
        const slug = await this.generateUniqueSlug(dto.name);
        const product = this.productRepo.create({
            ...dto,
            slug,
            images: files,
            createdBy,
        });
        return this.productRepo.save(product);
    }
    async uploadMultipleImages(files) {
        try {
            if (!files || files.length === 0) {
                throw new Error("No files provided");
            }
            const fileBuffers = files.map((file) => file.buffer);
            const uploadUrls = await (0, Cloudinary_1.uploadMultipleImagesToCloudinary)(fileBuffers);
            if (!uploadUrls || uploadUrls.length === 0) {
                throw new Error("Failed to upload files");
            }
            return uploadUrls;
        }
        catch (error) {
            console.error("Error uploading images:", error);
            return null;
        }
    }
    async create_product_async(dto, files, userId) {
        try {
            const user = await this.usersService.findUserById(userId);
            if (!user) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(`User not found or Invalid user`);
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.NOT_FOUND);
            }
            dto.images = files;
            const uploadedImages = await this.uploadMultipleImages(files);
            dto.images = uploadedImages ?? [];
            const product = await this.create(dto, dto.images, user);
            return (0, apiResponse_1.createResponse)(true, 'Product created successfully', product.id);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async findAll(query) {
        const { search, category, type, gender, brand, tagSlug, minPrice, maxPrice, isFeatured, inStock, sortBy = 'createdAt', sortOrder = 'DESC', page = 1, limit = 20, } = query;
        const qb = this.productRepo
            .createQueryBuilder('product')
            .where('product.isActive = :isActive', { isActive: true });
        if (search) {
            qb.andWhere('(product.name ILIKE :search OR product.description ILIKE :search)', { search: `%${search}%` });
        }
        if (category)
            qb.andWhere('product.category = :category', { category });
        if (type)
            qb.andWhere('product.type = :type', { type });
        if (gender)
            qb.andWhere('product.gender = :gender', { gender });
        if (tagSlug)
            qb.andWhere('product.tagSlug = :tagSlug', { tagSlug });
        if (brand) {
            qb.andWhere('product.brand ILIKE :brand', { brand: `%${brand}%` });
        }
        if (minPrice !== undefined)
            qb.andWhere('product.price >= :minPrice', { minPrice });
        if (maxPrice !== undefined)
            qb.andWhere('product.price <= :maxPrice', { maxPrice });
        if (isFeatured !== undefined)
            qb.andWhere('product.isFeatured = :isFeatured', { isFeatured });
        if (inStock)
            qb.andWhere('product.stock > 0');
        const allowedSortColumns = ['price', 'createdAt', 'name', 'stock'];
        const column = allowedSortColumns.includes(sortBy) ? sortBy : 'createdAt';
        qb.orderBy(`product.${column}`, sortOrder === 'ASC' ? 'ASC' : 'DESC');
        const skip = (page - 1) * limit;
        qb.skip(skip).take(limit);
        const [data, total] = await qb.getManyAndCount();
        return {
            data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async findOne(id) {
        const product = await this.productRepo.findOne({
            where: { id, isActive: true },
            relations: { reviews: true },
        });
        if (!product)
            throw new common_1.HttpException((0, apiResponse_1.createUnSuccessfulResponse)(`Product #${id} not found.`), common_1.HttpStatus.NOT_FOUND);
        return product;
    }
    async findBySlug(slug) {
        const product = await this.productRepo.findOne({
            where: { slug, isActive: true },
            relations: { reviews: true },
        });
        if (!product)
            throw new common_1.HttpException((0, apiResponse_1.createUnSuccessfulResponse)(`Product "${slug}" not found.`), common_1.HttpStatus.BAD_REQUEST);
        return product;
    }
    async update(id, dto) {
        const product = await this.findOneAdmin(id);
        if (dto.compareAtPrice !== undefined) {
            const effectivePrice = dto.price ?? product.price;
            if (dto.compareAtPrice <= effectivePrice) {
                throw new common_1.BadRequestException('compareAtPrice must be greater than the selling price.');
            }
        }
        if (dto.sku && dto.sku !== product.sku) {
            const skuExists = await this.productRepo.existsBy({ sku: dto.sku });
            if (skuExists) {
                throw new common_1.ConflictException(`SKU "${dto.sku}" is already in use.`);
            }
        }
        if (dto.name && dto.name !== product.name) {
            product.slug = await this.generateUniqueSlug(dto.name, id);
        }
        Object.assign(product, dto);
        return this.productRepo.save(product);
    }
    async addImages(id, dto) {
        const product = await this.findOneAdmin(id);
        const merged = [...new Set([...product.images, ...dto.urls])];
        if (merged.length > 10) {
            throw new common_1.BadRequestException(`Adding these images would exceed the 10-image limit. ` +
                `Current: ${product.images.length}, attempting to add: ${dto.urls.length}.`);
        }
        product.images = merged;
        return this.productRepo.save(product);
    }
    async removeImage(id, dto) {
        const product = await this.findOneAdmin(id);
        const exists = product.images.includes(dto.url);
        if (!exists) {
            throw new common_1.NotFoundException(`Image URL not found in this product's gallery.`);
        }
        product.images = product.images.filter((img) => img !== dto.url);
        return this.productRepo.save(product);
    }
    async toggleActive(id) {
        const product = await this.findOneAdmin(id);
        product.isActive = !product.isActive;
        await this.productRepo.save(product);
        return { isActive: product.isActive };
    }
    async toggleFeatured(id) {
        const product = await this.findOneAdmin(id);
        product.isFeatured = !product.isFeatured;
        await this.productRepo.save(product);
        return { isFeatured: product.isFeatured };
    }
    async decrementStock(id, quantity) {
        const product = await this.findOneAdmin(id);
        if (product.stock < quantity) {
            throw new common_1.BadRequestException(`Insufficient stock for "${product.name}". ` +
                `Requested: ${quantity}, available: ${product.stock}.`);
        }
        await this.productRepo.decrement({ id }, 'stock', quantity);
    }
    async incrementStock(id, quantity) {
        await this.productRepo.increment({ id }, 'stock', quantity);
    }
    async findRelated(id, limit = 8) {
        const product = await this.findOne(id);
        return this.productRepo
            .createQueryBuilder('product')
            .where('product.category = :category', { category: product.category })
            .andWhere('product.id != :id', { id })
            .andWhere('product.isActive = true')
            .orderBy('RANDOM()')
            .take(limit)
            .getMany();
    }
    async remove(id) {
        const product = await this.findOneAdmin(id);
        await this.productRepo.remove(product);
        return { message: `Product "${product.name}" has been deleted.` };
    }
    async findOneAdmin(id) {
        const product = await this.productRepo.findOneBy({ id });
        if (!product)
            throw new common_1.NotFoundException(`Product #${id} not found.`);
        return product;
    }
    async generateUniqueSlug(name, excludeId) {
        const base = (0, slugify_util_1.slugify)(name);
        let slug = base;
        let counter = 1;
        while (true) {
            const qb = this.productRepo
                .createQueryBuilder('product')
                .where('product.slug = :slug', { slug });
            if (excludeId) {
                qb.andWhere('product.id != :excludeId', { excludeId });
            }
            const existing = await qb.getOne();
            if (!existing)
                break;
            slug = `${base}-${counter}`;
            counter++;
        }
        return slug;
    }
    async getFilters() {
        const base = this.productRepo
            .createQueryBuilder('product')
            .where('product.isActive = true');
        const [categoryRows, typeRows, genderRows, brandRows, priceRange] = await Promise.all([
            base
                .clone()
                .select('DISTINCT product.category', 'category')
                .getRawMany(),
            base
                .clone()
                .select('DISTINCT product.type', 'type')
                .getRawMany(),
            base
                .clone()
                .select('DISTINCT product.gender', 'gender')
                .getRawMany(),
            base
                .clone()
                .leftJoin('product.brand', 'brand')
                .select(['brand.id AS id', 'brand.name AS name'])
                .andWhere('brand.id IS NOT NULL')
                .groupBy('brand.id, brand.name')
                .orderBy('brand.name', 'ASC')
                .getRawMany(),
            base
                .clone()
                .select('MIN(product.price)', 'min')
                .addSelect('MAX(product.price)', 'max')
                .getRawOne(),
        ]);
        return {
            categories: categoryRows.map((r) => r.category),
            types: typeRows.map((r) => r.type),
            genders: genderRows.map((r) => r.gender),
            brands: brandRows.map((r) => ({ id: r.id, name: r.name })),
            priceRange: {
                min: Number(priceRange?.min ?? 0),
                max: Number(priceRange?.max ?? 0),
            },
        };
    }
    async getFeatured(limit = 8) {
        return this.productRepo.find({
            where: { isActive: true, isFeatured: true },
            order: { updatedAt: 'DESC' },
            take: limit,
        });
    }
    async getNewArrivals(limit = 12) {
        return this.productRepo.find({
            where: { isActive: true },
            order: { createdAt: 'DESC' },
            take: limit,
        });
    }
    async getOnSale(page = 1, limit = 20) {
        const [data, total] = await this.productRepo.findAndCount({
            where: { isActive: true, compareAtPrice: (0, typeorm_2.Not)((0, typeorm_2.IsNull)()) },
            order: { updatedAt: 'DESC' },
            skip: (page - 1) * limit,
            take: limit,
        });
        return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(products_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService])
], ProductsService);
//# sourceMappingURL=products.service.js.map