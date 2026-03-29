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
exports.enableTwoFaOnboardDto = exports.getOtpWithEmailDTO = exports.verifyTOTP = exports.EnableTwoFaDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class EnableTwoFaDto {
    code;
}
exports.EnableTwoFaDto = EnableTwoFaDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Verification code sent to email",
        example: "299202",
    }),
    __metadata("design:type", String)
], EnableTwoFaDto.prototype, "code", void 0);
class verifyTOTP {
    email;
    code;
}
exports.verifyTOTP = verifyTOTP;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Users email",
        example: "johndoe@mailinator.com",
    }),
    __metadata("design:type", String)
], verifyTOTP.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Verification code sent to email",
        example: "299202",
    }),
    __metadata("design:type", String)
], verifyTOTP.prototype, "code", void 0);
class getOtpWithEmailDTO {
    email;
}
exports.getOtpWithEmailDTO = getOtpWithEmailDTO;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Users email",
        example: "johndoe@mailinator.com",
    }),
    __metadata("design:type", String)
], getOtpWithEmailDTO.prototype, "email", void 0);
class enableTwoFaOnboardDto {
    email;
    code;
}
exports.enableTwoFaOnboardDto = enableTwoFaOnboardDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Users email',
        example: 'johndoe@mailinator.com'
    }),
    __metadata("design:type", String)
], enableTwoFaOnboardDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Verification code sent to email",
        example: "299202",
    }),
    __metadata("design:type", String)
], enableTwoFaOnboardDto.prototype, "code", void 0);
//# sourceMappingURL=enable-user.dto.js.map