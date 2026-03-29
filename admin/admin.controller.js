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
let AdminController = class AdminController {
    adminService;
    productService;
    constructor(adminService, productService) {
        this.adminService = adminService;
        this.productService = productService;
    }
    create(dto, req, file) {
        return this.productService.create_product_async(dto, file, req.user.id);
    }
    update(dto) {
        return this.productService.update(dto.product_id, dto);
    }
    addImages(id, dto) {
        return this.productService.addImages(id, dto);
    }
    toggleActive(id) {
        return this.productService.toggleActive(id);
    }
    toggleFeatured(id) {
        return this.productService.toggleFeatured(id);
    }
    remove(id) {
        return this.productService.remove(id);
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
                file: {
                    type: "string",
                    format: "binary",
                    description: "An example would be scan result",
                },
            },
        },
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new product' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Product created.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Validation error.' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'SKU already in use.' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createProduct_dto_1.CreateProductDto, Object, Array]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('update-product-via-id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a product' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Product updated.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product not found.' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'SKU conflict.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createProduct_dto_1.UpdateProductDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/images'),
    (0, swagger_1.ApiOperation)({
        summary: 'Add images to product gallery',
        description: 'Appends image URLs to the product gallery. Max 10 images total per product. Duplicate URLs are ignored.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Product UUID' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Images added.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Would exceed 10-image limit.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, createProduct_dto_1.AddProductImagesDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "addImages", null);
__decorate([
    (0, common_1.Post)(':id/toggle-active'),
    (0, swagger_1.ApiOperation)({ summary: 'Toggle product active status' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Product UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns the new isActive value.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "toggleActive", null);
__decorate([
    (0, common_1.Post)(':id/toggle-featured'),
    (0, swagger_1.ApiOperation)({ summary: 'Toggle product featured status' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Product UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns the new isFeatured value.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "toggleFeatured", null);
__decorate([
    (0, common_1.Post)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a product' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Product UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Product deleted.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product not found.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "remove", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roleEnum_1.UserRole.ADMIN, roleEnum_1.UserRole.SUPERADMIN),
    __metadata("design:paramtypes", [admin_service_1.AdminService,
        products_service_1.ProductsService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map