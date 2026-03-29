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
exports.SquadPaymentData = exports.SqaudMetadataDto = exports.SquadPaymentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class SquadPaymentDto {
    amount;
}
exports.SquadPaymentDto = SquadPaymentDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Amount to send",
        example: 1000,
    }),
    __metadata("design:type", Number)
], SquadPaymentDto.prototype, "amount", void 0);
class SqaudMetadataDto {
    userId;
}
exports.SqaudMetadataDto = SqaudMetadataDto;
class SquadPaymentData {
    email;
    amount;
    currency;
    callback_url;
    initiate_type;
    transaction_ref;
    metadata;
}
exports.SquadPaymentData = SquadPaymentData;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => SqaudMetadataDto }),
    __metadata("design:type", SqaudMetadataDto)
], SquadPaymentData.prototype, "metadata", void 0);
//# sourceMappingURL=payment.squad.dto.js.map