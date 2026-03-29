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
exports.RefreshUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class RefreshUserDto {
    token;
    email;
}
exports.RefreshUserDto = RefreshUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The refresh token",
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM3NWYyNzIxLWQ0Y2EtNGVmMC05MTY0LTcyNzg0MmM2ZDRhMSIsImVtYWlsIjoibWF5YTIzQG1haWxpbmF0b3IuY29tIiwicm9sZSI6MCwiaWF0IjoxNzQ3MjM3OTcwLCJleHAiOjE3NDc4NDI3NzB9.tTuBznL0Gj-PwMybjIzP3jTs18bGu5X-3gy0rwLT0KU",
    }),
    __metadata("design:type", String)
], RefreshUserDto.prototype, "token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The email of the user",
        example: "johndoe@example.com",
    }),
    __metadata("design:type", String)
], RefreshUserDto.prototype, "email", void 0);
//# sourceMappingURL=refresh-token-user.dto.js.map