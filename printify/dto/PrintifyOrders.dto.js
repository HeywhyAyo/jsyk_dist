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
exports.CreatePrintifyOrderDto = exports.PrintifyAddressDto = exports.PrintifyOrderLineItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class PrintifyOrderLineItemDto {
    productId;
    variantId;
    quantity;
    externalId;
}
exports.PrintifyOrderLineItemDto = PrintifyOrderLineItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '5bfd0b66a342bcc9b5563216',
        description: 'Product ID returned by Printify',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PrintifyOrderLineItemDto.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 17887,
        description: 'Printify variant ID selected by the customer',
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], PrintifyOrderLineItemDto.prototype, "variantId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], PrintifyOrderLineItemDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'order-item-123',
        description: 'Your own order-item ID',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PrintifyOrderLineItemDto.prototype, "externalId", void 0);
class PrintifyAddressDto {
    firstName;
    lastName;
    email;
    phone;
    address1;
    address2;
    city;
    region;
    zip;
    country;
}
exports.PrintifyAddressDto = PrintifyAddressDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'John',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PrintifyAddressDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Smith',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PrintifyAddressDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'john@example.com',
    }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], PrintifyAddressDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '+447123456789',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PrintifyAddressDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '10 Example Street',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PrintifyAddressDto.prototype, "address1", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Apartment 2',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PrintifyAddressDto.prototype, "address2", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'London',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PrintifyAddressDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Greater London',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PrintifyAddressDto.prototype, "region", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'SW1A 1AA',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PrintifyAddressDto.prototype, "zip", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'GB',
        description: 'ISO country code',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PrintifyAddressDto.prototype, "country", void 0);
class CreatePrintifyOrderDto {
    externalId;
    label;
    lineItems;
    shippingMethod;
    sendShippingNotification;
    address;
}
exports.CreatePrintifyOrderDto = CreatePrintifyOrderDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'ORDER-10001',
        description: 'Your own unique order ID',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePrintifyOrderDto.prototype, "externalId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'ORDER-10001',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePrintifyOrderDto.prototype, "label", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [PrintifyOrderLineItemDto],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => PrintifyOrderLineItemDto),
    __metadata("design:type", Array)
], CreatePrintifyOrderDto.prototype, "lineItems", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: '1 = standard, 2 = priority, 3 = Printify Express, 4 = economy',
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreatePrintifyOrderDto.prototype, "shippingMethod", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreatePrintifyOrderDto.prototype, "sendShippingNotification", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: PrintifyAddressDto,
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => PrintifyAddressDto),
    __metadata("design:type", PrintifyAddressDto)
], CreatePrintifyOrderDto.prototype, "address", void 0);
//# sourceMappingURL=PrintifyOrders.dto.js.map