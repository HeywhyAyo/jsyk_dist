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
exports.UpdateDrawDto = exports.CreateDrawDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateDrawDto {
    productId;
    title;
    description;
    rewardDescription;
    opensAt;
    closesAt;
}
exports.CreateDrawDto = CreateDrawDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'UUID of the product this draw is for',
        example: 'a3b8c1d2-4e5f-6789-abcd-ef0123456789',
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateDrawDto.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Draw title shown to participants',
        example: 'WAVES Hoodie Launch Draw',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CreateDrawDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Additional details about the draw',
        example: 'Scan your QR code to enter. Winners announced on Friday.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDrawDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'What winners receive',
        example: '₦50,000 cash prize + exclusive signed merch',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDrawDto.prototype, "rewardDescription", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'When QR scanning opens (ISO 8601). Null means open immediately.',
        example: '2024-04-01T00:00:00.000Z',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateDrawDto.prototype, "opensAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'When QR scanning closes (ISO 8601). Null means admin closes manually.',
        example: '2024-04-07T23:59:59.000Z',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateDrawDto.prototype, "closesAt", void 0);
class UpdateDrawDto {
    title;
    description;
    rewardDescription;
    closesAt;
}
exports.UpdateDrawDto = UpdateDrawDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'WAVES Hoodie Draw — Extended' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], UpdateDrawDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Updated draw details.' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateDrawDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '₦100,000 cash prize' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateDrawDto.prototype, "rewardDescription", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2024-04-14T23:59:59.000Z' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateDrawDto.prototype, "closesAt", void 0);
//# sourceMappingURL=draw.dto.js.map