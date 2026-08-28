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
    async createProduct(dto, files, createdBy) {
        if (dto.compareAtPrice !== undefined && dto.compareAtPrice <= dto.price) {
            const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)('compare At Price must be greater than the selling price.');
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
            sizes: dto.sizes ? dto.sizes : [],
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
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("Failed to upload files");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            return uploadUrls;
        }
        catch (error) {
            console.error("Error uploading images:", error);
            return null;
        }
    }
    async uploadSingleImage(file) {
        try {
            if (!file) {
                throw new Error("No file provided");
            }
            const fileBuffers = file.buffer;
            const uploadUrls = await (0, Cloudinary_1.uploadImageToCloudinary)(fileBuffers);
            if (!uploadUrls || uploadUrls.length === 0) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("Failed to upload files");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
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
            if (dto.compareAtPrice !== undefined && dto.compareAtPrice <= dto.price) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)('compare At Price must be greater than the selling price.');
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const skuExists = await this.productRepo.existsBy({ sku: dto.sku });
            if (skuExists) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(`SKU "${dto.sku}" is already in use. Please choose a different SKU.`);
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.CONFLICT);
            }
            if (!dto.name || !dto.price || !dto.category || !dto.gender || !dto.description
                || !dto.stock || !dto.type || !dto.brand) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)('Missing required fields: check and retry again with all.');
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            if (dto.collectionId && !dto.musicCategory) {
                throw new common_1.HttpException((0, apiResponse_1.createUnSuccessfulResponse)('musicCategory is required when assigning a product to a collection.'), common_1.HttpStatus.BAD_REQUEST);
            }
            const user = await this.usersService.findUserById(userId);
            if (!user) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(`User not found or Invalid user`);
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.NOT_FOUND);
            }
            let images = files;
            const uploadedImages = await this.uploadMultipleImages(files);
            images = uploadedImages ?? [];
            const product = await this.createProduct(dto, images, user);
            return (0, apiResponse_1.createResponse)(true, 'Product created successfully', product.id);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async create_product_upload_async(productid, image, videolink) {
        try {
            const hasImage = image;
            if (!hasImage) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)('Please provide at least one file — a image.');
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
            if (hasImage && !allowedImageTypes.includes(hasImage.mimetype)) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(`Invalid image type "${hasImage.mimetype}". Allowed types: jpg, jpeg, png, webp.`);
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const product = await this.findOneProductByAdmin(productid);
            if (!product) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(`Product not found or Invalid product ID.`);
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            if (hasImage) {
                const uploadedImage = await this.uploadSingleImage(image);
                if (uploadedImage) {
                    product.imageUrl = uploadedImage;
                }
            }
            product.advertVideoUrl = videolink ?? product.advertVideoUrl;
            await this.productRepo.save(product);
            return (0, apiResponse_1.createResponse)(true, 'Files uploaded and product updated successfully', product.id);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async findAllforMarketplace(query) {
        const { search, category, type, gender, brand, minPrice, maxPrice, isFeatured, sortBy = 'createdAt', sortOrder = 'DESC', page = 1, limit = 20, } = query;
        console.log('Query parameters:', query);
        const qb = this.productRepo
            .createQueryBuilder('product')
            .where('product.isActive = true')
            .andWhere('product.stock > 0');
        if (search) {
            qb.andWhere('(product.name ILIKE :search OR product.description ILIKE :search)', { search: `%${search}%` });
        }
        if (category)
            qb.andWhere('product.category = :category', { category });
        if (type)
            qb.andWhere('product.type = :type', { type });
        if (gender)
            qb.andWhere('product.gender = :gender', { gender });
        if (brand) {
            qb.andWhere('product.brand ILIKE :brand', { brand: `%${brand}%` });
        }
        if (isFeatured !== undefined)
            qb.andWhere('product.isFeatured = :isFeatured', { isFeatured });
        if (minPrice !== undefined)
            qb.andWhere('product.price >= :minPrice', { minPrice });
        if (maxPrice !== undefined)
            qb.andWhere('product.price <= :maxPrice', { maxPrice });
        const sortableColumns = ['price', 'createdAt', 'name', 'stock'];
        const column = sortableColumns.includes(sortBy) ? sortBy : 'createdAt';
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
    async find_all_for_marketplace(query) {
        try {
            const result = await this.findAllforMarketplace(query);
            return (0, apiResponse_1.createResponse)(true, 'Products retrieved successfully.', result);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async findOne(id) {
        const product = await this.productRepo.findOne({
            where: { id, isActive: true },
            relations: { reviews: true, songs: true },
        });
        if (!product)
            throw new common_1.HttpException((0, apiResponse_1.createUnSuccessfulResponse)(`Product #${id} not found.`), common_1.HttpStatus.NOT_FOUND);
        return product;
    }
    async find_One_product(id) {
        try {
            const product = await this.findOne(id);
            return (0, apiResponse_1.createResponse)(true, 'Product retrieved successfully.', product);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
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
    async find_One_product_by_slug(slug) {
        try {
            const product = await this.findBySlug(slug);
            return (0, apiResponse_1.createResponse)(true, 'Product retrieved successfully.', product);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async update(id, dto) {
        const product = await this.findOneProductByAdmin(id);
        if (dto.compareAtPrice !== undefined) {
            const effectivePrice = dto.price ?? product.price;
            if (dto.compareAtPrice <= effectivePrice) {
                throw new common_1.HttpException((0, apiResponse_1.createUnSuccessfulResponse)('compareAtPrice must be greater than the selling price.'), common_1.HttpStatus.BAD_REQUEST);
                ;
            }
        }
        if (dto.collectionId && !dto.musicCategory) {
            throw new common_1.HttpException((0, apiResponse_1.createUnSuccessfulResponse)('musicCategory is required when assigning a product to a collection.'), common_1.HttpStatus.BAD_REQUEST);
        }
        if (dto.sku && dto.sku !== product.sku) {
            const skuExists = await this.productRepo.existsBy({ sku: dto.sku });
            if (skuExists) {
                throw new common_1.HttpException((0, apiResponse_1.createUnSuccessfulResponse)(`SKU "${dto.sku}" is already in use.`), common_1.HttpStatus.BAD_REQUEST);
            }
        }
        if (dto.name && dto.name !== product.name) {
            product.slug = await this.generateUniqueSlug(dto.name, id);
        }
        Object.assign(product, dto);
        return this.productRepo.save(product);
    }
    async update_product(id, dto) {
        try {
            const updatedProduct = await this.update(id, dto);
            return (0, apiResponse_1.createResponse)(true, 'Product updated successfully.', updatedProduct);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async update_product_of_printify(id, dto) {
        const product = await this.findOneProductByAdmin(id);
        if (!product) {
            throw new common_1.HttpException((0, apiResponse_1.createUnSuccessfulResponse)(`Product #${id} not found.`), common_1.HttpStatus.BAD_REQUEST);
        }
        Object.assign(product, dto);
        try {
            const updatedProduct = await this.productRepo.save(product);
            return (0, apiResponse_1.createResponse)(true, 'Product updated successfully with printify details.', updatedProduct);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async addImagesToProduct(id, dto, files) {
        try {
            const product = await this.findOneProductByAdmin(id);
            if (files && files.length > 0) {
                dto.urls = await this.uploadMultipleImages(files);
                if (!dto.urls) {
                    throw new common_1.HttpException((0, apiResponse_1.createUnSuccessfulResponse)("Something went wrong document not uploaded. Please try again"), common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }
            product.images = dto.urls;
            const result = await this.productRepo.save(product);
            return (0, apiResponse_1.createResponse)(true, 'Images added successfully.', result);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async removeImage(id, dto) {
        const product = await this.findOneProductByAdmin(id);
        const exists = product.images.includes(dto.url);
        if (!exists) {
            throw new common_1.HttpException((0, apiResponse_1.createUnSuccessfulResponse)('Image URL not found in this product\'s gallery.'), common_1.HttpStatus.BAD_REQUEST);
        }
        product.images = product.images.filter((img) => img !== dto.url);
        return this.productRepo.save(product);
    }
    async toggleActive(id) {
        try {
            const product = await this.findOneProductByAdmin(id);
            product.isActive = !product.isActive;
            await this.productRepo.save(product);
            return (0, apiResponse_1.createResponse)(true, 'Product is now ' + (product.isActive ? 'active' : 'inactive') + '.', { isActive: product.isActive });
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async toggleFeatured(id) {
        try {
            const product = await this.findOneProductByAdmin(id);
            product.isFeatured = !product.isFeatured;
            await this.productRepo.save(product);
            return (0, apiResponse_1.createResponse)(true, `Product "${product.name}" is now ${product.isFeatured ? 'featured' : 'not featured'}.`, { isFeatured: product.isFeatured });
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async decrementStock(id, quantity) {
        const product = await this.findOneProductByAdmin(id);
        if (product.stock < quantity) {
            const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(`Insufficient stock for "${product.name}". ` +
                `Requested: ${quantity}, available: ${product.stock}.`);
            throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
        }
        await this.productRepo.decrement({ id }, 'stock', quantity);
    }
    async incrementStock(id, quantity) {
        await this.productRepo.increment({ id }, 'stock', quantity);
    }
    async findRelated(id, limit = 8) {
        try {
            const product = await this.findOne(id);
            const result = await this.productRepo
                .createQueryBuilder('product')
                .where('product.category = :category', { category: product.category })
                .andWhere('product.id != :id', { id })
                .andWhere('product.isActive = true')
                .orderBy('RANDOM()')
                .take(limit)
                .getMany();
            return (0, apiResponse_1.createResponse)(true, 'Related products retrieved successfully.', result);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async removeProduct(id) {
        try {
            const product = await this.findOneProductByAdmin(id);
            await this.productRepo.remove(product);
            return (0, apiResponse_1.createResponse)(true, `Product "${product.name}" has been deleted.`, true);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async findOneProductByAdmin(id) {
        const product = await this.productRepo.findOneBy({ id });
        if (!product)
            throw new common_1.HttpException((0, apiResponse_1.createUnSuccessfulResponse)(`Product #${id} not found.`), common_1.HttpStatus.NOT_FOUND);
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
                .select('DISTINCT product.brand', 'brand')
                .andWhere('product.brand IS NOT NULL')
                .orderBy('product.brand', 'ASC')
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
            brands: brandRows.map((r) => ({ id: r.brand, name: r.brand })),
            priceRange: {
                min: Number(priceRange?.min ?? 0),
                max: Number(priceRange?.max ?? 0),
            },
        };
    }
    async get_filters_for_marketplace() {
        try {
            const filter = await this.getFilters();
            return (0, apiResponse_1.createResponse)(true, 'Filters retrieved successfully.', filter);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
            throw error;
        }
    }
    async getFeatured(limit = 8) {
        return this.productRepo
            .createQueryBuilder('product')
            .where('product.isActive = true')
            .andWhere('product.isFeatured = true')
            .andWhere('product.stock > 0')
            .orderBy('product.updatedAt', 'DESC')
            .take(limit)
            .getMany();
    }
    async getNewArrivals(limit = 12) {
        return this.productRepo
            .createQueryBuilder('product')
            .where('product.isActive = true')
            .andWhere('product.stock > 0')
            .orderBy('product.createdAt', 'DESC')
            .take(limit)
            .getMany();
    }
    async getOnSale(page = 1, limit = 20) {
        const qb = this.productRepo
            .createQueryBuilder('product')
            .where('product.isActive = true')
            .andWhere('product.stock > 0')
            .andWhere('product.compareAtPrice IS NOT NULL')
            .orderBy('product.updatedAt', 'DESC')
            .skip((page - 1) * limit)
            .take(limit);
        const [data, total] = await qb.getManyAndCount();
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