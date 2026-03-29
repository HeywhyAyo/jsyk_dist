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
exports.TestChargeDto = exports.CreatePaystackSubscriptionDto = exports.CreatePaystackDto = exports.MetadataDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class MetadataDto {
    amount;
}
exports.MetadataDto = MetadataDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 500 }),
    __metadata("design:type", Number)
], MetadataDto.prototype, "amount", void 0);
class CreatePaystackDto {
    amount;
}
exports.CreatePaystackDto = CreatePaystackDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1000, description: "Amount in kobo (₦10.00 = 1000)" }),
    __metadata("design:type", Number)
], CreatePaystackDto.prototype, "amount", void 0);
class CreatePaystackSubscriptionDto {
    productId;
}
exports.CreatePaystackSubscriptionDto = CreatePaystackSubscriptionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "74f1d3bb1f9e44001fdd93c2" }),
    __metadata("design:type", String)
], CreatePaystackSubscriptionDto.prototype, "productId", void 0);
class TestChargeDto {
    code;
}
exports.TestChargeDto = TestChargeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "74f1d-3bb1ff-9e44-001fdd9-3c2" }),
    __metadata("design:type", String)
], TestChargeDto.prototype, "code", void 0);
//# sourceMappingURL=create-paystack.dto.js.map