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
exports.PrintifyProductDetailsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class PrintifyProductDetailsDto {
    printifyProductId;
    printifyBlueprintId;
    printifyPrintProviderId;
    printifyVariantId;
    printifyArtworkId;
    artworkUrl;
}
exports.PrintifyProductDetailsDto = PrintifyProductDetailsDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '66ab92cxxx',
        description: 'Product ID returned by Printify',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PrintifyProductDetailsDto.prototype, "printifyProductId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 384,
        description: 'Printify blueprint ID',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], PrintifyProductDetailsDto.prototype, "printifyBlueprintId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 1,
        description: 'Printify print provider ID',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], PrintifyProductDetailsDto.prototype, "printifyPrintProviderId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 1,
        description: 'Printify print variant ID',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], PrintifyProductDetailsDto.prototype, "printifyVariantId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '5d15ca551163cde90d7b2203',
        description: 'Uploaded artwork/image ID returned by Printify',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PrintifyProductDetailsDto.prototype, "printifyArtworkId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'https://cdn.jsyk.com/designs/jsyk-london.png',
        description: 'URL of the artwork used for the Printify product',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], PrintifyProductDetailsDto.prototype, "artworkUrl", void 0);
//# sourceMappingURL=PrintifyProductDetails.dto.js.map