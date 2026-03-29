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
exports.CreateVisitorAccountDto = exports.CreateUserData = exports.CreateUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateUserDto {
    email;
    password;
    confirmpassword;
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The email of the user",
        example: "johndoe@example.com",
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The password of the user. Must be at least 8 characters",
        example: "johndoe123",
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The confirm password of the user. Must be at least 8 characters",
        example: "johndoe123",
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "confirmpassword", void 0);
class CreateUserData {
    email;
    password;
}
exports.CreateUserData = CreateUserData;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The email of the user",
        example: "johndoe@example.com",
    }),
    __metadata("design:type", String)
], CreateUserData.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The password of the user. Must be at least 8 characters",
        example: "johndoe123",
    }),
    __metadata("design:type", String)
], CreateUserData.prototype, "password", void 0);
class CreateVisitorAccountDto {
    email;
    firstName;
    lastName;
}
exports.CreateVisitorAccountDto = CreateVisitorAccountDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email address for guest checkout. Required if user is not authenticated.',
        example: 'john.doe@example.com',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateVisitorAccountDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'First name of the guest customer',
        example: 'John',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVisitorAccountDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Last name of the guest customer',
        example: 'Doe',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVisitorAccountDto.prototype, "lastName", void 0);
//# sourceMappingURL=create-user.dto.js.map