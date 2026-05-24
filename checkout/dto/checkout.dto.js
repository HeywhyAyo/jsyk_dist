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
exports.CheckoutResponseDto = exports.CheckoutBreakdownDto = exports.VisitorCheckoutDto = exports.CheckoutDto = exports.CheckoutItemDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const shipment_methods_1 = require("../../orders/enum/shipment.methods");
class CheckoutItemDto {
    productId;
    quantity;
    selectedColor;
    selectedSize;
}
exports.CheckoutItemDto = CheckoutItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'UUID of the product being purchased',
        example: 'a3b8c1d2-4e5f-6789-abcd-ef0123456789',
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CheckoutItemDto.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Number of units to purchase',
        example: 2,
        minimum: 1,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CheckoutItemDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'The color the customer selected before adding to cart. ' +
            'Must be a valid hex code matching one of the product\'s available colors. ' +
            'Omit if the product has no color options.',
        example: '#1A1A1A',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsHexColor)(),
    __metadata("design:type", String)
], CheckoutItemDto.prototype, "selectedColor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'The size of the product selected',
        example: 'XL',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CheckoutItemDto.prototype, "selectedSize", void 0);
class CheckoutDto {
    items;
    shippingAddressId;
    shippingMethod;
    couponCode;
    notes;
}
exports.CheckoutDto = CheckoutDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'List of products and quantities the customer is purchasing',
        type: [CheckoutItemDto],
        example: [
            {
                productId: 'a3b8c1d2-4e5f-6789-abcd-ef0123456789',
                quantity: 2,
                selectedColor: '#1A1A1A',
            },
            {
                productId: 'b1c2d3e4-5f67-89ab-cdef-012345678901',
                quantity: 1,
                selectedColor: '#F5F5F5',
            },
        ],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CheckoutItemDto),
    __metadata("design:type", Array)
], CheckoutDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "UUID of the customer's saved delivery address",
        example: 'c4d5e6f7-8901-2345-bcde-f01234567890',
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CheckoutDto.prototype, "shippingAddressId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Delivery method chosen by the customer',
        enum: shipment_methods_1.ShippingMethod,
        example: shipment_methods_1.ShippingMethod.EXPRESS,
    }),
    (0, class_validator_1.IsEnum)(shipment_methods_1.ShippingMethod),
    __metadata("design:type", String)
], CheckoutDto.prototype, "shippingMethod", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Coupon code to apply a discount to the order',
        example: 'SAVE20',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CheckoutDto.prototype, "couponCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Optional delivery instructions or notes for the order',
        example: 'Please leave at the front door.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CheckoutDto.prototype, "notes", void 0);
class VisitorCheckoutDto {
    email;
    items;
    shippingMethod;
    couponCode;
    notes;
    phone;
    street;
    city;
    state;
    country;
    postalCode;
}
exports.VisitorCheckoutDto = VisitorCheckoutDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email address for guest checkout. Required if user is not authenticated.',
        example: 'john.doe@example.com',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], VisitorCheckoutDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'List of products and quantities the customer is purchasing',
        type: [CheckoutItemDto],
        example: [
            {
                productId: 'a3b8c1d2-4e5f-6789-abcd-ef0123456789',
                quantity: 2,
                selectedColor: '#1A1A1A',
            },
            {
                productId: 'b1c2d3e4-5f67-89ab-cdef-012345678901',
                quantity: 1,
                selectedColor: '#F5F5F5',
            },
        ],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CheckoutItemDto),
    __metadata("design:type", Array)
], VisitorCheckoutDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Delivery method chosen by the customer',
        enum: shipment_methods_1.ShippingMethod,
        example: shipment_methods_1.ShippingMethod.EXPRESS,
    }),
    (0, class_validator_1.IsEnum)(shipment_methods_1.ShippingMethod),
    __metadata("design:type", String)
], VisitorCheckoutDto.prototype, "shippingMethod", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Coupon code to apply a discount to the order',
        example: 'SAVE20',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VisitorCheckoutDto.prototype, "couponCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Optional delivery instructions or notes for the order',
        example: 'Please leave at the front door.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VisitorCheckoutDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Phone number',
        type: String,
        example: '+1-800-123-4567',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VisitorCheckoutDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Street address',
        type: String,
        example: '123 Main Street',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 255),
    __metadata("design:type", String)
], VisitorCheckoutDto.prototype, "street", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'City name',
        type: String,
        example: 'New York',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 100),
    __metadata("design:type", String)
], VisitorCheckoutDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'State or province',
        type: String,
        example: 'NY',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VisitorCheckoutDto.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Country name',
        type: String,
        example: 'United States',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 100),
    __metadata("design:type", String)
], VisitorCheckoutDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Postal or ZIP code',
        type: String,
        minLength: 1,
        maxLength: 20,
        example: '10001',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 20),
    __metadata("design:type", String)
], VisitorCheckoutDto.prototype, "postalCode", void 0);
class CheckoutBreakdownDto {
    subtotal;
    discount;
    shippingFee;
    tax;
    total;
}
exports.CheckoutBreakdownDto = CheckoutBreakdownDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 45000, description: 'Sum of all item prices' }),
    __metadata("design:type", Number)
], CheckoutBreakdownDto.prototype, "subtotal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 9000, description: 'Discount applied by coupon' }),
    __metadata("design:type", Number)
], CheckoutBreakdownDto.prototype, "discount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5000, description: 'Shipping fee based on method chosen' }),
    __metadata("design:type", Number)
], CheckoutBreakdownDto.prototype, "shippingFee", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2700, description: '7.5% VAT on (subtotal - discount)' }),
    __metadata("design:type", Number)
], CheckoutBreakdownDto.prototype, "tax", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 43700, description: 'Final amount charged to the customer' }),
    __metadata("design:type", Number)
], CheckoutBreakdownDto.prototype, "total", void 0);
class CheckoutResponseDto {
    paymentUrl;
    reference;
    orderNumber;
    breakdown;
}
exports.CheckoutResponseDto = CheckoutResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Paystack-hosted payment page. Redirect the customer here.',
        example: 'https://checkout.paystack.com/0peioxfhpn',
    }),
    __metadata("design:type", String)
], CheckoutResponseDto.prototype, "paymentUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique payment reference. Use to verify payment on return.',
        example: 'JSYK-20240328-0042-1711612800000',
    }),
    __metadata("design:type", String)
], CheckoutResponseDto.prototype, "reference", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Human-readable order identifier.',
        example: 'JSYK-20240328-0042',
    }),
    __metadata("design:type", String)
], CheckoutResponseDto.prototype, "orderNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Full cost breakdown for display on the order summary page.',
        type: CheckoutBreakdownDto,
    }),
    __metadata("design:type", CheckoutBreakdownDto)
], CheckoutResponseDto.prototype, "breakdown", void 0);
//# sourceMappingURL=checkout.dto.js.map