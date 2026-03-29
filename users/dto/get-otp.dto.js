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
exports.VerifyAuthCode = exports.getOTPDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
class getOTPDTO {
    email;
}
exports.getOTPDTO = getOTPDTO;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The email of the user",
        example: "johndoe@example.com",
    }),
    __metadata("design:type", String)
], getOTPDTO.prototype, "email", void 0);
class VerifyAuthCode {
    code;
    card_number;
}
exports.VerifyAuthCode = VerifyAuthCode;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The email of the user",
        example: "johndoe@example.com",
    }),
    __metadata("design:type", String)
], VerifyAuthCode.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The email of the user",
        example: "johndoe@example.com",
    }),
    __metadata("design:type", String)
], VerifyAuthCode.prototype, "card_number", void 0);
//# sourceMappingURL=get-otp.dto.js.map