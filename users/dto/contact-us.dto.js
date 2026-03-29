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
exports.ContactUsDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
class ContactUsDTO {
    firstName;
    lastName;
    email;
    message;
}
exports.ContactUsDTO = ContactUsDTO;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The first name of the user",
        example: "John",
    }),
    __metadata("design:type", String)
], ContactUsDTO.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The last name of the user",
        example: "Doe",
    }),
    __metadata("design:type", String)
], ContactUsDTO.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The email of the user",
        example: "johndoe@example.com",
    }),
    __metadata("design:type", String)
], ContactUsDTO.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The message sent by user",
        example: "I'd like to purchase product xyz but i don't how to go about it.",
    }),
    __metadata("design:type", String)
], ContactUsDTO.prototype, "message", void 0);
//# sourceMappingURL=contact-us.dto.js.map