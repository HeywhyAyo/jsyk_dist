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
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryProductDto = exports.RemoveProductImageDto = exports.AddProductImagesDto = exports.UpdateProductDto = exports.CreateProductDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const product_category_1 = require("../enum/product.category");
const product_types_1 = require("../enum/product.types");
const gender_1 = require("../enum/gender");
class CreateProductDto {
    name;
    description;
    category;
    type;
    gender;
    brand;
    sku;
    price;
    compareAtPrice;
    stock;
    images;
    tagName;
    tagSlug;
    isFeatured;
}
exports.CreateProductDto = CreateProductDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Display name of the product',
        example: 'Nike Air Force 1 Low',
        maxLength: 200,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CreateProductDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Full product description',
        example: 'A timeless classic with a sleek low-top silhouette.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Product category',
        enum: product_category_1.ProductCategory,
        example: product_category_1.ProductCategory.SNEAKERS,
    }),
    (0, class_validator_1.IsEnum)(product_category_1.ProductCategory),
    __metadata("design:type", String)
], CreateProductDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Product type (clothing, shoes, accessories)',
        enum: product_types_1.ProductType,
        example: product_types_1.ProductType.SHOES,
    }),
    (0, class_validator_1.IsEnum)(product_types_1.ProductType),
    __metadata("design:type", String)
], CreateProductDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Target gender for this product',
        enum: gender_1.Gender,
        example: gender_1.Gender.UNISEX,
    }),
    (0, class_validator_1.IsEnum)(gender_1.Gender),
    __metadata("design:type", String)
], CreateProductDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Brand name of the product',
        example: 'Nike',
        maxLength: 100,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateProductDto.prototype, "brand", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique stock keeping unit identifier',
        example: 'NK-AF1-WHT-42',
        maxLength: 100,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateProductDto.prototype, "sku", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Selling price of the product in kobo/cents',
        example: 45000,
        minimum: 0,
    }),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_validator_1.IsPositive)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Original price before discount — must be greater than price. ' +
            'Renders as a strikethrough price on the storefront.',
        example: 60000,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_validator_1.IsPositive)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "compareAtPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Available stock quantity',
        example: 50,
        minimum: 0,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "stock", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Additional gallery image URLs (max 10)',
        example: [
            'https://cdn.jsyk.com/products/af1-side.jpg',
            'https://cdn.jsyk.com/products/af1-back.jpg',
        ],
        type: [String],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMaxSize)(10),
    (0, class_validator_1.IsUrl)({}, { each: true }),
    __metadata("design:type", Array)
], CreateProductDto.prototype, "images", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Tag label for grouping (e.g. "New Arrival", "Sale")',
        example: 'New Arrival',
        maxLength: 100,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateProductDto.prototype, "tagName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'URL-safe slug version of the tag. Must be lowercase and hyphen-separated.',
        example: 'new-arrival',
        maxLength: 100,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    (0, class_validator_1.Matches)(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message: 'tagSlug must be lowercase and hyphen-separated (e.g. "new-arrival")',
    }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "tagSlug", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Pin this product to featured sections on the storefront',
        example: false,
        default: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateProductDto.prototype, "isFeatured", void 0);
class UpdateProductDto extends (0, swagger_1.PartialType)(CreateProductDto) {
    isActive;
    product_id;
}
exports.UpdateProductDto = UpdateProductDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Activate or deactivate the product listing',
        example: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateProductDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the product to update (required for admin updates)',
        example: 'UUID',
    }),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "product_id", void 0);
class AddProductImagesDto {
    urls;
}
exports.AddProductImagesDto = AddProductImagesDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Image URLs to append to the product gallery (max 10)',
        example: [
            'https://cdn.jsyk.com/products/af1-side.jpg',
            'https://cdn.jsyk.com/products/af1-back.jpg',
        ],
        type: [String],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMaxSize)(10),
    (0, class_validator_1.IsUrl)({}, { each: true }),
    __metadata("design:type", Array)
], AddProductImagesDto.prototype, "urls", void 0);
class RemoveProductImageDto {
    url;
}
exports.RemoveProductImageDto = RemoveProductImageDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Exact URL of the image to remove from the gallery',
        example: 'https://cdn.jsyk.com/products/af1-side.jpg',
    }),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], RemoveProductImageDto.prototype, "url", void 0);
class QueryProductDto {
    search;
    category;
    type;
    gender;
    brand;
    tagSlug;
    minPrice;
    maxPrice;
    isFeatured;
    inStock;
    sortBy = 'createdAt';
    sortOrder = 'DESC';
    page = 1;
    limit = 20;
}
exports.QueryProductDto = QueryProductDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Full-text search across product name and description',
        example: 'Air Force',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QueryProductDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by product category',
        enum: product_category_1.ProductCategory,
        example: product_category_1.ProductCategory.SNEAKERS,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(product_category_1.ProductCategory),
    __metadata("design:type", String)
], QueryProductDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by product type',
        enum: product_types_1.ProductType,
        example: product_types_1.ProductType.SHOES,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(product_types_1.ProductType),
    __metadata("design:type", String)
], QueryProductDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by gender',
        enum: gender_1.Gender,
        example: gender_1.Gender.MEN,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(gender_1.Gender),
    __metadata("design:type", String)
], QueryProductDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by brand name (case-insensitive)',
        example: 'Nike',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QueryProductDto.prototype, "brand", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by tag slug',
        example: 'new-arrival',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QueryProductDto.prototype, "tagSlug", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Minimum price filter (inclusive)',
        example: 5000,
        minimum: 0,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], QueryProductDto.prototype, "minPrice", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Maximum price filter (inclusive)',
        example: 100000,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], QueryProductDto.prototype, "maxPrice", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Return only featured products',
        example: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => value === 'true' || value === true),
    __metadata("design:type", Boolean)
], QueryProductDto.prototype, "isFeatured", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Return only products with stock greater than 0',
        example: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => value === 'true' || value === true),
    __metadata("design:type", Boolean)
], QueryProductDto.prototype, "inStock", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Column to sort by',
        enum: ['price', 'createdAt', 'name', 'stock'],
        default: 'createdAt',
        example: 'price',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QueryProductDto.prototype, "sortBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Sort direction',
        enum: ['ASC', 'DESC'],
        default: 'DESC',
        example: 'DESC',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QueryProductDto.prototype, "sortOrder", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Page number — 1-based',
        example: 1,
        minimum: 1,
        default: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], QueryProductDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Number of results per page',
        example: 20,
        minimum: 1,
        default: 20,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], QueryProductDto.prototype, "limit", void 0);
//# sourceMappingURL=createProduct.dto.js.map