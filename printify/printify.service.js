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
exports.PrintifyService = void 0;
const common_1 = require("@nestjs/common");
const apiResponse_1 = require("../shared/utilities/apiResponse");
const rethrow_exception_1 = require("../shared/utilities/rethrow-exception");
let PrintifyService = class PrintifyService {
    baseUrl = 'https://api.printify.com/v1';
    apiKey = process.env.PRINTIFY_API_KEY;
    PRINTIFY_SHOP_ID = process.env.PRINTIFY_SHOP_ID;
    PRINTIFY_WEBHOOK_SECRET = process.env.PRINTIFY_WEBHOOK_SECRET;
    constructor() { }
    get headers() {
        return {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json;charset=utf-8',
            'User-Agent': 'JSYK-Ecommerce',
        };
    }
    async upload_Artwork_to_printify(file) {
        try {
            const uploadedArtwork = await this.uploadLocalImage(file);
            return (0, apiResponse_1.createResponse)(true, 'Printify image uploaded successfully', uploadedArtwork);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async create_product_in_printify(dto) {
        try {
            const shopIdString = this.PRINTIFY_SHOP_ID;
            if (!shopIdString) {
                throw new common_1.HttpException((0, apiResponse_1.createUnSuccessfulResponse)('Printify shop ID is not configured'), common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            const shopId = parseInt(shopIdString, 10);
            const createdProduct = await this.createProduct(shopId, dto);
            return (0, apiResponse_1.createResponse)(true, 'Printify product created successfully', createdProduct);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async get_printify_blueprints() {
        const blueprints = await this.getBlueprints();
        return (0, apiResponse_1.createResponse)(true, 'Printify blueprints retrieved successfully', blueprints);
    }
    async get_printify_print_providers(blueprintId) {
        const printProviders = await this.getPrintProviders(blueprintId);
        return (0, apiResponse_1.createResponse)(true, 'Printify print providers retrieved successfully', printProviders);
    }
    async get_printify_artworks(page = 1, limit = 100) {
        const artworks = await this.getArtworks(page, limit);
        return (0, apiResponse_1.createResponse)(true, 'Printify artworks retrieved successfully', artworks);
    }
    async get_printify_variants(blueprintId, printProviderId) {
        const variants = await this.getVariants(blueprintId, printProviderId);
        return (0, apiResponse_1.createResponse)(true, 'Printify variants retrieved successfully', variants);
    }
    async getArtworks(page, limit) {
        const response = await fetch(`${this.baseUrl}/uploads.json?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: this.headers,
        });
        if (!response.ok) {
            const error = await response.text();
            const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(`Failed to retrieve Printify artworks: ${error}`);
            throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
        }
        return response.json();
    }
    async getBlueprints() {
        const response = await fetch(`${this.baseUrl}/catalog/blueprints.json`, {
            method: 'GET',
            headers: this.headers,
        });
        if (!response.ok) {
            const error = await response.text();
            const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(`Failed to get Printify blueprints: ${error}`);
            throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
        }
        return response.json();
    }
    async getPrintProviders(blueprintId) {
        const response = await fetch(`${this.baseUrl}/catalog/blueprints/${blueprintId}/print_providers.json`, {
            method: 'GET',
            headers: this.headers,
        });
        if (!response.ok) {
            const error = await response.text();
            const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(`Failed to get Printify print providers: ${error}`);
            throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
        }
        return response.json();
    }
    async getVariants(blueprintId, printProviderId) {
        const response = await fetch(`${this.baseUrl}/catalog/blueprints/${blueprintId}/print_providers/${printProviderId}/variants.json`, {
            method: 'GET',
            headers: this.headers,
        });
        if (!response.ok) {
            const error = await response.text();
            const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(`Failed to get Printify variants: ${error}`);
            throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
        }
        return response.json();
    }
    async uploadLocalImage(file) {
        const contents = file.buffer.toString('base64');
        const response = await fetch(`${this.baseUrl}/uploads/images.json`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
                'User-Agent': 'JSYK-Ecommerce',
            },
            body: JSON.stringify({
                file_name: file.originalname,
                contents,
            }),
        });
        if (!response.ok) {
            const error = await response.text();
            const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(`Printify image upload failed: ${error}`);
            throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
        }
        return response.json();
    }
    async uploadImage(dto) {
        const response = await fetch(`${this.baseUrl}/uploads/images.json`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                file_name: dto.fileName,
                url: dto.url,
            }),
        });
        if (!response.ok) {
            const error = await response.text();
            const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("Printify image upload failed");
            throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
        }
        return response.json();
    }
    async createProduct(shopId, dto) {
        const response = await fetch(`${this.baseUrl}/shops/${shopId}/products.json`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                title: dto.title,
                description: dto.description,
                tags: dto.tags,
                blueprint_id: dto.blueprintId,
                print_provider_id: dto.printProviderId,
                variants: dto.variants.map((variant) => ({
                    id: variant.id,
                    price: variant.price,
                    is_enabled: variant.isEnabled,
                })),
                print_areas: dto.printAreas.map((area) => ({
                    variant_ids: area.variantIds,
                    placeholders: [
                        {
                            position: area.position,
                            ...(area.decorationMethod && {
                                decoration_method: area.decorationMethod,
                            }),
                            images: [
                                {
                                    id: area.artwork.imageId,
                                    x: area.artwork.x,
                                    y: area.artwork.y,
                                    scale: area.artwork.scale,
                                    angle: area.artwork.angle ?? 0,
                                },
                            ],
                        },
                    ],
                })),
            }),
        });
        if (!response.ok) {
            const error = await response.text();
            const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(`Printify product creation failed: ${error}`);
            throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
        }
        return response.json();
    }
    async createWebhook(topic, url) {
        const shopId = this.PRINTIFY_SHOP_ID;
        const secret = this.PRINTIFY_WEBHOOK_SECRET;
        const response = await fetch(`${this.baseUrl}/shops/${shopId}/webhooks.json`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                topic,
                url,
                secret,
            }),
        });
        if (!response.ok) {
            const error = await response.text();
            const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(`Failed to create Printify webhook: ${error}`);
            throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
        }
        return response.json();
    }
};
exports.PrintifyService = PrintifyService;
exports.PrintifyService = PrintifyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PrintifyService);
//# sourceMappingURL=printify.service.js.map