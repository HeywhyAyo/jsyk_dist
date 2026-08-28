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
exports.PrintifyArtworkDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class PrintifyArtworkDto {
    imageId;
    x = 0.5;
    y = 0.5;
    scale = 1;
    angle = 0;
}
exports.PrintifyArtworkDto = PrintifyArtworkDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '5d15ca551163cde90d7b2203',
        description: 'Image ID returned from Printify upload endpoint',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PrintifyArtworkDto.prototype, "imageId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 0.5,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PrintifyArtworkDto.prototype, "x", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 0.5,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PrintifyArtworkDto.prototype, "y", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PrintifyArtworkDto.prototype, "scale", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 0,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], PrintifyArtworkDto.prototype, "angle", void 0);
//# sourceMappingURL=PrintifyArtwork.dto.js.map