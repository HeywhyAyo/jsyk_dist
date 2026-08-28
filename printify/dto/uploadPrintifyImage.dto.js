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
exports.UploadPrintifyImageDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UploadPrintifyImageDto {
    fileName;
    url;
}
exports.UploadPrintifyImageDto = UploadPrintifyImageDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'jsyk-london.png',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UploadPrintifyImageDto.prototype, "fileName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://cdn.yoursite.com/designs/jsyk-london.png',
    }),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], UploadPrintifyImageDto.prototype, "url", void 0);
//# sourceMappingURL=uploadPrintifyImage.dto.js.map