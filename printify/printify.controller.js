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
exports.PrintifyController = void 0;
const common_1 = require("@nestjs/common");
const printify_service_1 = require("./printify.service");
const CreatePrintifyProduct_dto_1 = require("./dto/CreatePrintifyProduct.dto");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
let PrintifyController = class PrintifyController {
    printifyService;
    constructor(printifyService) {
        this.printifyService = printifyService;
    }
    async getBlueprints() {
        return this.printifyService.get_printify_blueprints();
    }
    async getPrintProviders(blueprintId) {
        return this.printifyService.get_printify_print_providers(blueprintId);
    }
    async getVariants(blueprintId, printProviderId) {
        return this.printifyService.get_printify_variants(blueprintId, printProviderId);
    }
    async uploadImage(file) {
        return this.printifyService.upload_Artwork_to_printify(file);
    }
    async createProduct(dto) {
        return await this.printifyService.create_product_in_printify(dto);
    }
    async createWebhook(dto) {
        return await this.printifyService.createWebhook(dto.topic, dto.url);
    }
    async getArtworks(page, limit) {
        return this.printifyService.get_printify_artworks(page, limit);
    }
};
exports.PrintifyController = PrintifyController;
__decorate([
    (0, common_1.Get)('catalog/blueprints'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get Printify blueprints',
        description: 'Returns the available products/templates from the Printify catalogue.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Blueprints retrieved successfully.',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PrintifyController.prototype, "getBlueprints", null);
__decorate([
    (0, common_1.Get)('catalog/blueprints/:blueprintId/print-providers'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get print providers for a Printify blueprint',
    }),
    (0, swagger_1.ApiParam)({
        name: 'blueprintId',
        example: 5,
        description: 'Printify blueprint ID',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Print providers retrieved successfully.',
    }),
    __param(0, (0, common_1.Param)('blueprintId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PrintifyController.prototype, "getPrintProviders", null);
__decorate([
    (0, common_1.Get)('catalog/blueprints/:blueprintId/print-providers/:printProviderId/variants'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get variants for a blueprint and print provider',
    }),
    (0, swagger_1.ApiParam)({
        name: 'blueprintId',
        example: 5,
        description: 'Printify blueprint ID',
    }),
    (0, swagger_1.ApiParam)({
        name: 'printProviderId',
        example: 29,
        description: 'Printify print provider ID',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Variants retrieved successfully.',
    }),
    __param(0, (0, common_1.Param)('blueprintId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('printProviderId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], PrintifyController.prototype, "getVariants", null);
__decorate([
    (0, common_1.Post)('images/upload'),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, swagger_1.ApiBody)({
        description: "Upload the artwork image to Printify. The image will be used to create products in the Printify shop.",
        schema: {
            type: "object",
            properties: {
                file: {
                    type: "array",
                    items: { type: "string", format: "binary" },
                    description: "Product artwork image to be uploaded to Printify.",
                },
            },
            required: ["file"],
        },
    }),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PrintifyController.prototype, "uploadImage", null);
__decorate([
    (0, common_1.Post)('shops/products'),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a Printify product',
        description: 'Creates a product in a Printify shop using a blueprint, print provider, variants and uploaded artwork.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Printify product created successfully.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Failed to create Printify product.',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreatePrintifyProduct_dto_1.CreatePrintifyProductDto]),
    __metadata("design:returntype", Promise)
], PrintifyController.prototype, "createProduct", null);
__decorate([
    (0, common_1.Post)('create-webhook'),
    (0, swagger_1.ApiOperation)({
        summary: 'Create printify webhooks',
        description: 'Create printify webooks',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Printify webhook created successfully.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Failed to create Printify webhook.',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreatePrintifyProduct_dto_1.PrintifyWebhookDto]),
    __metadata("design:returntype", Promise)
], PrintifyController.prototype, "createWebhook", null);
__decorate([
    (0, common_1.Get)('artworks'),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(100), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], PrintifyController.prototype, "getArtworks", null);
exports.PrintifyController = PrintifyController = __decorate([
    (0, common_1.Controller)('printify'),
    __metadata("design:paramtypes", [printify_service_1.PrintifyService])
], PrintifyController);
//# sourceMappingURL=printify.controller.js.map