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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const roleEnum_1 = require("../users/shared/enum/roleEnum");
const roles_decorator_1 = require("../auth/roles.decorator");
const swagger_1 = require("@nestjs/swagger");
const products_service_1 = require("../products/products.service");
const createProduct_dto_1 = require("../products/dto/createProduct.dto");
const platform_express_1 = require("@nestjs/platform-express");
const create_admin_dto_1 = require("./dto/create-admin.dto");
const users_service_1 = require("../users/users.service");
const artist_song_service_1 = require("../artist_song/artist_song.service");
const artist_song_dto_1 = require("../artist_song/dto/artist_song.dto");
const product_review_service_1 = require("../products/product.review.service");
const collection_ts_dto_1 = require("../collection/dto/collection.ts.dto");
const collection_service_1 = require("../collection/collection.service");
const muscic_category_1 = require("../collection/enum/muscic.category");
const orders_service_1 = require("../orders/orders.service");
const order_status_1 = require("../orders/enum/order.status");
const orders_dto_1 = require("../orders/dto/orders.dto");
const draw_service_1 = require("../draw/draw.service");
const draw_dto_1 = require("../draw/dto/draw.dto");
const draw_entity_1 = require("../draw/entities/draw.entity");
const PrintifyProductDetails_dto_1 = require("../printify/dto/PrintifyProductDetails.dto");
let AdminController = class AdminController {
    adminService;
    productService;
    userService;
    artistService;
    songService;
    reviewService;
    collectionService;
    orderService;
    drawService;
    constructor(adminService, productService, userService, artistService, songService, reviewService, collectionService, orderService, drawService) {
        this.adminService = adminService;
        this.productService = productService;
        this.userService = userService;
        this.artistService = artistService;
        this.songService = songService;
        this.reviewService = reviewService;
        this.collectionService = collectionService;
        this.orderService = orderService;
        this.drawService = drawService;
    }
    async createProduct(dto, req, file) {
        return await this.productService.create_product_async(dto, file, req.user.id);
    }
    async createProduct_uploadFiles(dto, files) {
        return await this.productService.create_product_upload_async(dto.productId, files.image?.[0], dto.videolink);
    }
    async updateProduct(productId, dto) {
        return await this.productService.update_product(productId, dto);
    }
    async MakeAdmin(createAdminDto) {
        return await this.userService.make_system_admin(createAdminDto);
    }
    async findAllUsers(page = 1, limit = 10, search) {
        return await this.userService.all_users_service(page, limit, search);
    }
    async getUserDetails(id, req) {
        return this.userService.admin_user_details(id);
    }
    async createNewArtist(dto) {
        return await this.artistService.create_artist(dto);
    }
    async updateArtist(dto) {
        return await this.artistService.updateArtistInfo(dto.artistId, dto);
    }
    async createSong(dto) {
        return await this.songService.create(dto);
    }
    async updateSongById(dto) {
        return await this.songService.update(dto.songId, dto);
    }
    async findByArtist(artistId) {
        return await this.songService.findByArtist(artistId);
    }
    async attachToProduct(productId, dto) {
        return await this.songService.attachToProduct(productId, dto.songIds, dto.requiresQrcode);
    }
    async completePrintifyProduct(productId, dto) {
        return await this.productService.update_product_of_printify(productId, dto);
    }
    async detachFromProduct(productId, dto) {
        return await this.songService.detachFromProduct(productId, dto.songIds);
    }
    async removeArtist(artistId) {
        return await this.artistService.removeArtist(artistId);
    }
    async addImages(id, dto, file) {
        return await this.productService.addImagesToProduct(id, dto, file);
    }
    async toggleActive(id) {
        return await this.productService.toggleActive(id);
    }
    async toggleFeatured(id) {
        return await this.productService.toggleFeatured(id);
    }
    async remove(id) {
        return await this.productService.removeProduct(id);
    }
    async getPending(page, limit) {
        return await this.reviewService.getPending(page, limit);
    }
    async adminFindByProduct(productId, page, limit) {
        return await this.reviewService.adminFindByProduct(productId, page, limit);
    }
    updateCollection(id, dto) {
        return this.collectionService.update(dto.collectionId, dto);
    }
    async approve(id) {
        return await this.reviewService.approve(id);
    }
    async adminRemove(id) {
        return await this.reviewService.adminRemove(id);
    }
    getStats() {
        return this.orderService.getOrderStats();
    }
    findAllOrders(query) {
        return this.orderService.findAllOrders(query);
    }
    updateStatus(id, status) {
        return this.orderService.updateOrderStatus(id, status);
    }
    findOneOrder(id) {
        return this.orderService.findSingleOrderAdmin(id);
    }
    createDraw(dto) {
        return this.drawService.createnewDraw(dto);
    }
    findOne(id) {
        return this.drawService.getSingleDraw(id);
    }
    update(id, dto) {
        return this.drawService.updateDraw(id, dto);
    }
    close(id) {
        return this.drawService.closeDraw(id);
    }
    conduct(id) {
        return this.drawService.conductDrawAndNotify(id);
    }
    findAllDraws(status, page, limit) {
        return this.drawService.findAllDraws(status, page, limit);
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Post)('products'),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("file", 10)),
    (0, swagger_1.ApiBody)({
        description: "Request centered around creating a new product. All fields except images are required. " +
            "Images are optional and can be uploaded separately via the /admin/products/:id/images endpoint. " +
            "This separation allows for faster product creation without waiting for image uploads, and provides flexibility to add or change images later.",
        schema: {
            type: "object",
            properties: {
                name: {
                    type: "string",
                    description: "Display name of the product",
                    example: "Nike Air Force 1 Low",
                    maxLength: 200,
                },
                description: {
                    type: "string",
                    description: "Full product description",
                    example: "A timeless classic with a sleek low-top silhouette.",
                },
                category: {
                    type: "string",
                    enum: ["T_SHIRTS", "SHIRTS", "HOODIES", "JACKETS", "COATS", "TROUSERS", "JEANS", "SHORTS", "DRESSES", "SKIRTS", "ACTIVEWEAR", "UNDERWEAR", "SWIMWEAR", "SUITS", "SNEAKERS", "BOOTS", "SANDALS", "LOAFERS", "HEELS", "FLATS", "SLIPPERS", "SPORT_SHOES", "BAGS", "BELTS", "HATS", "SUNGLASSES", "WATCHES", "JEWELRY", "SCARVES", "WALLETS"],
                    description: "Product category",
                    example: "SNEAKERS",
                },
                type: {
                    type: "string",
                    enum: ["CLOTHING", "SHOES", "ACCESSORIES"],
                    description: "Product type (clothing, shoes, accessories)",
                    example: "SHOES",
                },
                gender: {
                    type: "string",
                    enum: ["MEN", "WOMEN", "UNISEX", "KIDS"],
                    description: "Target gender for this product",
                    example: "UNISEX",
                },
                musicCategory: {
                    type: "string",
                    enum: [
                        'HIP_HOP',
                        'AFROBEATS',
                        'RNB',
                        'POP',
                        'REGGAE',
                        'DANCEHALL',
                        'AMAPIANO',
                        'HIGHLIFE',
                        'JAZZ',
                        'CLASSICAL',
                        'ELECTRONIC',
                        'ROCK',
                        'GOSPEL',
                        'COUNTRY',
                        'ALTERNATIVE'
                    ],
                    description: "Music category for this product",
                    example: muscic_category_1.MusicCategory.HIP_HOP,
                },
                collectionId: {
                    type: "string",
                    description: "Collection id of the product - required if this product belongs to an artist collection. The collection determines which artist's songs can be attached to this product, and the music category field becomes required.",
                    example: "A UUID.",
                },
                brand: {
                    type: "string",
                    description: "Brand name of the product",
                    example: "Nike",
                    maxLength: 100,
                },
                sku: {
                    type: "string",
                    description: "Unique stock keeping unit identifier",
                    example: "NK-AF1-WHT-42",
                    maxLength: 100,
                },
                price: {
                    type: "number",
                    description: "Selling price of the product in kobo/cents",
                    example: 45000,
                    minimum: 0,
                },
                compareAtPrice: {
                    type: "number",
                    description: "Original price before discount — must be greater than price",
                    example: 60000,
                },
                stock: {
                    type: "number",
                    description: "Available stock quantity",
                    example: 50,
                    minimum: 0,
                },
                sizes: {
                    type: "array",
                    items: { type: "string" },
                    description: "Available size options for this product",
                    example: ['XS', 'S', 'M', 'L', 'XL'],
                },
                tagName: {
                    type: "string",
                    description: "Tag label for grouping (e.g. 'New Arrival', 'Sale')",
                    example: "New Arrival",
                    maxLength: 100,
                },
                tagSlug: {
                    type: "string",
                    description: "URL-safe slug version of the tag",
                    example: "new-arrival",
                    maxLength: 100,
                },
                isFeatured: {
                    type: "boolean",
                    description: "Pin this product to featured sections on the storefront",
                    example: false,
                    default: false,
                },
                colors: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            name: {
                                type: "string",
                                description: "Display name shown to the user next to the swatch",
                                example: "Midnight Black",
                            },
                            hexCode: {
                                type: "string",
                                description: "Valid CSS hex color code used to render the swatch circle",
                                example: "#1A1A1A",
                            },
                        },
                    },
                    description: "Available color options for this product. Leave empty or omit if the product has no color variants. Each color needs a display name and a CSS hex code for the swatch.",
                },
                file: {
                    type: "array",
                    items: { type: "string", format: "binary" },
                    description: "Product images (optional, max 10 files)",
                },
            },
            required: ["name", "category", "type", "gender", "brand", "sku", "price", "stock"],
        },
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new product - Step 1 of product creation' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Product created.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Validation error.' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'SKU already in use.' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createProduct_dto_1.CreateProductDto, Object, Array]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createProduct", null);
__decorate([
    (0, common_1.Post)('products/upload'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'image', maxCount: 1 },
        { name: 'video', maxCount: 1 },
    ])),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiOperation)({
        summary: 'Upload an image and/or a video - Step 2 of product creation',
        description: 'Accepts one optional image (jpg, jpeg, png, webp) and one optional video (mp4, mov, webm). ' +
            'Both fields are optional — send either or both. ' +
            'Use multipart/form-data, NOT application/json.',
    }),
    (0, swagger_1.ApiBody)({
        description: 'Optional image and/or video file',
        schema: {
            type: 'object',
            properties: {
                image: {
                    type: 'string',
                    format: 'binary',
                    description: 'Optional image file — jpg, jpeg, png or webp',
                },
                videolink: {
                    type: "string",
                    description: "Optional video URL if the video is already hosted somewhere. If both video file and videolink are provided, the uploaded video file will take precedence and the videolink will be ignored.",
                    example: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                },
                productId: {
                    type: "string",
                    description: "Full product Identity",
                    example: "The product ID returned from the step 1 stage",
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Files received successfully.',
        schema: {
            example: {
                message: 'Files received.',
                image: {
                    originalname: 'photo.jpg',
                    mimetype: 'image/jpeg',
                    size: 204800,
                },
                video: {
                    originalname: 'clip.mp4',
                    mimetype: 'video/mp4',
                    size: 5242880,
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'No file provided, or wrong file type.',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createProduct_dto_1.CreateProductUploadDto, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createProduct_uploadFiles", null);
__decorate([
    (0, common_1.Post)('update-product-via-id/:productId'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a product' }),
    (0, swagger_1.ApiParam)({ name: 'productId', description: 'Product UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Product updated.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product not found.' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'SKU conflict.' }),
    __param(0, (0, common_1.Param)('productId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, createProduct_dto_1.UpdateProductDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateProduct", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Make a user an Administrator" }),
    (0, swagger_1.ApiBody)({
        type: create_admin_dto_1.CreateAdminDto,
        description: "Update Status",
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Promoted to an admin" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "User not found" }),
    (0, swagger_1.ApiResponse)({ status: 500, description: "Internal Server Error" }),
    (0, roles_decorator_1.Roles)(roleEnum_1.UserRole.SUPERADMIN),
    (0, common_1.Post)("make-admin"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_admin_dto_1.CreateAdminDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "MakeAdmin", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "Get all system users in detail - using search and pagination",
    }),
    (0, swagger_1.ApiQuery)({
        name: "page",
        required: false,
        description: "Page number for pagination (default: 1)",
        example: 1,
        type: Number,
    }),
    (0, swagger_1.ApiQuery)({
        name: "limit",
        required: false,
        description: "Number of items per page (default: 10)",
        example: 10,
        type: Number,
    }),
    (0, swagger_1.ApiQuery)({
        name: "search",
        required: false,
        description: "Search by email",
        type: String,
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Users found" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Users not found" }),
    (0, swagger_1.ApiResponse)({ status: 500, description: "Internal Server Error" }),
    (0, swagger_1.ApiOperation)({ summary: "Get paginated list of users" }),
    (0, common_1.Get)("all-users"),
    __param(0, (0, common_1.Query)("page")),
    __param(1, (0, common_1.Query)("limit")),
    __param(2, (0, common_1.Query)("search")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "findAllUsers", null);
__decorate([
    (0, swagger_1.ApiQuery)({
        name: "id",
        required: false,
        description: "Search by user ID",
        type: String,
    }),
    (0, swagger_1.ApiOperation)({ summary: "Retrieve user details" }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)("user-details"),
    __param(0, (0, common_1.Query)("id")),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getUserDetails", null);
__decorate([
    (0, common_1.Post)('new-artist'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new artist' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Artist created.' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Artist name already exists.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [artist_song_dto_1.CreateArtistDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createNewArtist", null);
__decorate([
    (0, common_1.Post)('update-artist-details'),
    (0, swagger_1.ApiOperation)({ summary: 'Update artist details' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [artist_song_dto_1.UpdateArtistDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateArtist", null);
__decorate([
    (0, common_1.Post)('add-songs-to-artist'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new song under an artist' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Song created.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [artist_song_dto_1.CreateSongDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createSong", null);
__decorate([
    (0, common_1.Post)('update-song'),
    (0, swagger_1.ApiOperation)({ summary: 'Update song details or streaming links' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [artist_song_dto_1.UpdateSongDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateSongById", null);
__decorate([
    (0, common_1.Get)('artist/:artistId'),
    (0, swagger_1.ApiOperation)({ summary: 'List all songs by an artist' }),
    __param(0, (0, common_1.Param)('artistId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "findByArtist", null);
__decorate([
    (0, common_1.Post)('attach/:productId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Attach songs and collection to a product  - Step 3 of product creation',
        description: 'Links songs to a product. The product detail page will then ' +
            'display the music section with artist info and streaming links.',
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Songs attached to product.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product or one or more songs not found.' }),
    __param(0, (0, common_1.Param)('productId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, artist_song_dto_1.AttachSongsDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "attachToProduct", null);
__decorate([
    (0, common_1.Post)('complete-printify/:productId'),
    (0, swagger_1.ApiOperation)({ summary: 'complete printify product and update details - Step - 4' }),
    (0, swagger_1.ApiParam)({ name: 'productId', description: 'Product UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Product updated with printify details.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product not found.' }),
    __param(0, (0, common_1.Param)('productId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, PrintifyProductDetails_dto_1.PrintifyProductDetailsDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "completePrintifyProduct", null);
__decorate([
    (0, common_1.Post)('detach/:productId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Detach songs from a product',
        description: 'Removes the link between songs and a product. Songs are not deleted.',
    }),
    __param(0, (0, common_1.Param)('productId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, artist_song_dto_1.AttachSongsDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "detachFromProduct", null);
__decorate([
    (0, common_1.Post)('remove/artist/:artistId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Delete an artist and all their songs' }),
    __param(0, (0, common_1.Param)('artistId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "removeArtist", null);
__decorate([
    (0, common_1.Post)(':id/images'),
    (0, swagger_1.ApiOperation)({
        summary: 'Add images to product gallery',
        description: 'Appends image URLs to the product gallery. Max 10 images total per product. Duplicate URLs are ignored.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Product UUID' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Images added.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Would exceed 10-image limit.' }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("file", 10)),
    (0, swagger_1.ApiBody)({
        description: "Appends image file to the product gallery. ",
        schema: {
            type: "object",
            properties: {
                file: {
                    type: "string",
                    format: "binary",
                    description: "An example would be scan result",
                },
            },
            required: [
                "file"
            ],
        },
    }),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, createProduct_dto_1.AddProductImagesDto, Array]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "addImages", null);
__decorate([
    (0, common_1.Post)(':id/toggle-active'),
    (0, swagger_1.ApiOperation)({ summary: 'Toggle product active status' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Product UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns the new isActive value.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "toggleActive", null);
__decorate([
    (0, common_1.Post)(':id/toggle-featured'),
    (0, swagger_1.ApiOperation)({ summary: 'Toggle product featured status' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Product UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns the new isFeatured value.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "toggleFeatured", null);
__decorate([
    (0, common_1.Post)('delete/product/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a product' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Product UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Product deleted.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product not found.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('reviews/pending'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get moderation queue',
        description: 'All pending reviews sorted oldest first so none get buried.',
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, example: 20 }),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(20), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getPending", null);
__decorate([
    (0, common_1.Get)('reviews/product/:productId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all reviews for a product (approved + pending)' }),
    (0, swagger_1.ApiParam)({ name: 'productId', description: 'UUID of the product' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, example: 20 }),
    __param(0, (0, common_1.Param)('productId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(20), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "adminFindByProduct", null);
__decorate([
    (0, common_1.Post)('update-a-collection'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a collection' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'UUID of the collection' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, collection_ts_dto_1.UpdateCollectionDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateCollection", null);
__decorate([
    (0, common_1.Post)('reviews/:id/approve'),
    (0, swagger_1.ApiOperation)({ summary: 'Approve a review' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'UUID of the review' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Review approved and now publicly visible.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Review not found.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "approve", null);
__decorate([
    (0, common_1.Post)('reviews/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Remove a review permanently' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'UUID of the review' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "adminRemove", null);
__decorate([
    (0, common_1.Get)('order/stats'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get order statistics',
        description: 'Returns totalOrders, confirmedOrders, shippedOrders, deliveredOrders.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Order stats returned.',
        schema: {
            example: {
                totalOrders: 12400,
                confirmedOrders: 3200,
                shippedOrders: 1800,
                deliveredOrders: 6900,
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)('orders'),
    (0, swagger_1.ApiOperation)({
        summary: 'List all orders with filters and pagination',
        description: 'Supports search (order number / customer name / email), ' +
            'status filter and date range filter. All filters are optional and combinable.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'search',
        required: false,
        description: 'Search by order number, customer name or email',
        example: 'JSYK-20240328',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'status',
        required: false,
        enum: order_status_1.OrderStatus,
        description: 'Filter by order status',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'from',
        required: false,
        description: 'Start date (inclusive) — ISO 8601 e.g. 2024-01-01',
        example: '2024-01-01',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'to',
        required: false,
        description: 'End date (inclusive, full day) — ISO 8601 e.g. 2024-12-31',
        example: '2024-12-31',
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, example: 20 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Paginated orders returned.',
        schema: {
            example: {
                data: [
                    {
                        id: 'uuid',
                        orderNumber: 'JSYK-20240328-4821',
                        status: 'CONFIRMED',
                        total: 43700,
                        createdAt: '2024-03-28T10:00:00.000Z',
                        user: {
                            id: 'uuid',
                            firstName: 'John',
                            lastName: 'Doe',
                            email: 'john@example.com',
                        },
                        payment: { status: 'PAID' },
                    },
                ],
                total: 12400,
                page: 1,
                limit: 20,
                totalPages: 620,
            },
        },
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [orders_dto_1.QueryOrderDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "findAllOrders", null);
__decorate([
    (0, common_1.Post)('orders/:id/status'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update order status',
        description: 'Manually advance an order status. ' +
            'CONFIRMED is set automatically by the Paystack webhook — ' +
            'use this for PROCESSING, SHIPPED, DELIVERED or CANCELLED.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'UUID of the order' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            required: ['status'],
            properties: {
                status: {
                    type: 'string',
                    enum: Object.values(order_status_1.OrderStatus),
                    example: 'SHIPPED',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Order status updated.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Order not found.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Get)('orders/:id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get full order detail',
        description: 'Returns complete order with customer info, shipping address, ' +
            'all items (with color snapshot), payment and shipment details.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'UUID of the order' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Full order detail returned.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Order not found.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "findOneOrder", null);
__decorate([
    (0, common_1.Post)('create-draw'),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a draw for a product',
        description: 'Creates a draw and opens it for QR code participation. ' +
            'Set opensAt and closesAt to control the entry window.',
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Draw created.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [draw_dto_1.CreateDrawDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "createDraw", null);
__decorate([
    (0, common_1.Get)('draws/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get draw detail with all participants' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'UUID of the draw' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('update-draw/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update draw details' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'UUID of the draw' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, draw_dto_1.UpdateDrawDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('draws/:id/close'),
    (0, swagger_1.ApiOperation)({
        summary: 'Close a draw — stop accepting participants',
        description: 'Closes entry. Run /conduct next to select winners.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'UUID of the draw' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "close", null);
__decorate([
    (0, common_1.Post)('draws/:id/conduct'),
    (0, swagger_1.ApiOperation)({
        summary: 'Conduct the draw — select winners',
        description: 'Runs the winner selection algorithm. ' +
            '10% of total units sold = total winners. ' +
            '75% of winners must be verified purchasers, 25% open pool. ' +
            'Draw status is set to COMPLETED. This action cannot be undone.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'UUID of the draw' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Draw conducted. Winners selected.',
        schema: {
            example: {
                draw: { id: 'uuid', status: 'COMPLETED', conductedAt: '2024-04-07T18:00:00.000Z' },
                winners: [
                    { id: 'uuid', isPurchaser: true, user: { firstName: 'John' } },
                ],
                summary: {
                    totalSold: 100,
                    totalParticipants: 240,
                    totalWinners: 10,
                    buyerWinners: 7,
                    nonBuyerWinners: 3,
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Draw already completed.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "conduct", null);
__decorate([
    (0, common_1.Get)('all-draws'),
    (0, swagger_1.ApiOperation)({
        summary: 'List all draws with status and participant counts',
        description: 'Returns all draws across all products. ' +
            'Filter by status to view only OPEN, CLOSED or COMPLETED draws.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'status',
        required: false,
        enum: draw_entity_1.DrawStatus,
        description: 'Filter by draw status',
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, example: 10 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        schema: {
            example: {
                data: [
                    {
                        id: 'uuid',
                        title: 'WAVES Hoodie Launch Draw',
                        rewardDescription: '₦50,000 cash prize',
                        status: 'OPEN',
                        product: {
                            id: 'uuid',
                            name: 'Oversized Fleece Hoodie',
                            imageUrl: 'https://cdn.jsyk.com/products/hoodie.jpg',
                        },
                        participantCount: 240,
                        winnerCount: 0,
                        totalSoldAtDraw: 0,
                        totalWinners: 0,
                        opensAt: '2024-04-01T00:00:00.000Z',
                        closesAt: '2024-04-07T23:59:59.000Z',
                        conductedAt: null,
                        createdAt: '2024-03-28T10:00:00.000Z',
                    },
                    {
                        id: 'uuid',
                        title: 'Burna Boy Tee Draw',
                        rewardDescription: 'Signed album + merch bundle',
                        status: 'COMPLETED',
                        product: {
                            id: 'uuid',
                            name: 'Burna Boy Last Last Tee',
                            imageUrl: 'https://cdn.jsyk.com/products/burna-tee.jpg',
                        },
                        participantCount: 520,
                        winnerCount: 15,
                        totalSoldAtDraw: 150,
                        totalWinners: 15,
                        opensAt: null,
                        closesAt: '2024-03-15T23:59:59.000Z',
                        conductedAt: '2024-03-16T12:00:00.000Z',
                        createdAt: '2024-03-01T09:00:00.000Z',
                    },
                ],
                total: 24,
                page: 1,
                limit: 20,
                totalPages: 2,
            },
        },
    }),
    __param(0, (0, common_1.Query)('status')),
    __param(1, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "findAllDraws", null);
exports.AdminController = AdminController = __decorate([
    (0, swagger_1.ApiBearerAuth)("bearerAuth"),
    (0, common_1.Controller)('admin'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roleEnum_1.UserRole.ADMIN, roleEnum_1.UserRole.SUPERADMIN),
    __metadata("design:paramtypes", [admin_service_1.AdminService,
        products_service_1.ProductsService,
        users_service_1.UsersService,
        artist_song_service_1.ArtistSongService,
        artist_song_service_1.SongService,
        product_review_service_1.ReviewService,
        collection_service_1.CollectionService,
        orders_service_1.OrdersService,
        draw_service_1.DrawService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map