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
exports.PrintifyWebhookDto = exports.CreatePrintifyProductDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const PrintifyVariant_dto_1 = require("./PrintifyVariant.dto");
const PrintifyPrintArea_dto_1 = require("./PrintifyPrintArea.dto");
class CreatePrintifyProductDto {
    title;
    description;
    tags;
    blueprintId;
    printProviderId;
    variants;
    printAreas;
}
exports.CreatePrintifyProductDto = CreatePrintifyProductDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'JSYK London T-Shirt',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePrintifyProductDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Premium JSYK London T-Shirt',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePrintifyProductDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: ['JSYK', 'T-Shirt'],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreatePrintifyProductDto.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 384,
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreatePrintifyProductDto.prototype, "blueprintId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreatePrintifyProductDto.prototype, "printProviderId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [PrintifyVariant_dto_1.PrintifyVariantDto],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => PrintifyVariant_dto_1.PrintifyVariantDto),
    __metadata("design:type", Array)
], CreatePrintifyProductDto.prototype, "variants", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [PrintifyPrintArea_dto_1.PrintifyPrintAreaDto],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => PrintifyPrintArea_dto_1.PrintifyPrintAreaDto),
    __metadata("design:type", Array)
], CreatePrintifyProductDto.prototype, "printAreas", void 0);
class PrintifyWebhookDto {
    topic;
    url;
}
exports.PrintifyWebhookDto = PrintifyWebhookDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'printify_product_123',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PrintifyWebhookDto.prototype, "topic", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://yourdomain.com/printify-webhook',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PrintifyWebhookDto.prototype, "url", void 0);
//# sourceMappingURL=CreatePrintifyProduct.dto.js.map