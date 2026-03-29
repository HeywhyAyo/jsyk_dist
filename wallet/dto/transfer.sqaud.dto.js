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
exports.CreateTransferDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateTransferDto {
    remark;
    bank_code;
    account_number;
    account_name;
    amount;
}
exports.CreateTransferDto = CreateTransferDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "50000",
        description: 'send to my friend',
    }),
    __metadata("design:type", String)
], CreateTransferDto.prototype, "remark", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "50000",
        description: 'Bank code',
    }),
    __metadata("design:type", String)
], CreateTransferDto.prototype, "bank_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "734934834645",
        description: 'account number',
    }),
    __metadata("design:type", String)
], CreateTransferDto.prototype, "account_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Heywhy",
        description: 'account name',
    }),
    __metadata("design:type", String)
], CreateTransferDto.prototype, "account_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 50000,
        description: 'Amount in kobo (₦1 = 100 kobo)',
    }),
    __metadata("design:type", Number)
], CreateTransferDto.prototype, "amount", void 0);
//# sourceMappingURL=transfer.sqaud.dto.js.map