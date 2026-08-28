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
exports.PrintifyVariantDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class PrintifyVariantDto {
    id;
    price;
    isEnabled;
}
exports.PrintifyVariantDto = PrintifyVariantDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 45740,
        description: 'Printify variant ID',
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], PrintifyVariantDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 2499,
        description: 'Price in the smallest currency unit. For example 2499 = 24.99.',
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], PrintifyVariantDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], PrintifyVariantDto.prototype, "isEnabled", void 0);
//# sourceMappingURL=PrintifyVariant.dto.js.map