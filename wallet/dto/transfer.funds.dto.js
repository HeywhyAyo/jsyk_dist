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
exports.TransferFundsDto = exports.AtLeastOneConstraint = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
let AtLeastOneConstraint = class AtLeastOneConstraint {
    validate(_, args) {
        const obj = args.object;
        const hasOne = obj.email ||
            obj.referralCode ||
            obj.cardNumber;
        if (!hasOne) {
            throw new common_1.HttpException({
                successful: false,
                data: null,
                message: 'You must provide at least one of: email, referralCode, cardNumber',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        return true;
    }
    defaultMessage() {
        return '';
    }
};
exports.AtLeastOneConstraint = AtLeastOneConstraint;
exports.AtLeastOneConstraint = AtLeastOneConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'atLeastOne', async: false })
], AtLeastOneConstraint);
class TransferFundsDto {
    email;
    amount;
}
exports.TransferFundsDto = TransferFundsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "the user email",
        example: "johndoe@example.com",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Validate)(AtLeastOneConstraint),
    __metadata("design:type", String)
], TransferFundsDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Amount to send",
        example: 1000,
    }),
    __metadata("design:type", Number)
], TransferFundsDto.prototype, "amount", void 0);
//# sourceMappingURL=transfer.funds.dto.js.map