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
exports.CollectionCreationDto = exports.UpdateCollectionDto = exports.CreateCollectionDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const collection_entity_1 = require("../entities/collection.entity");
class CreateCollectionDto {
    name;
    description;
    coverImageUrl;
}
exports.CreateCollectionDto = CreateCollectionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'WAVES Collection' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CreateCollectionDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Official WAVES merch collection.' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCollectionDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://cdn.jsyk.com/collections/waves-cover.jpg' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreateCollectionDto.prototype, "coverImageUrl", void 0);
class UpdateCollectionDto {
    name;
    description;
    collectionId;
    coverImageUrl;
    status;
}
exports.UpdateCollectionDto = UpdateCollectionDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'WAVES Collection Vol. 2' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], UpdateCollectionDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Updated description.' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateCollectionDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'UUID of the collection' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateCollectionDto.prototype, "collectionId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://cdn.jsyk.com/collections/waves-cover-v2.jpg' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], UpdateCollectionDto.prototype, "coverImageUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: collection_entity_1.CollectionStatus, example: collection_entity_1.CollectionStatus.ACTIVE }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(collection_entity_1.CollectionStatus),
    __metadata("design:type", String)
], UpdateCollectionDto.prototype, "status", void 0);
class CollectionCreationDto {
    artistId;
    name;
}
exports.CollectionCreationDto = CollectionCreationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'UUID Identifier of the Artist' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CollectionCreationDto.prototype, "artistId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'WAVES Collection' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CollectionCreationDto.prototype, "name", void 0);
//# sourceMappingURL=collection.ts.dto.js.map