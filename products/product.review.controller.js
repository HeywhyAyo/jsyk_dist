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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const product_review_service_1 = require("./product.review.service");
const review_dto_1 = require("./dto/review.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let ReviewController = class ReviewController {
    reviewService;
    constructor(reviewService) {
        this.reviewService = reviewService;
    }
    async findByProduct(productId, query) {
        return await this.reviewService.findByProduct(productId, query);
    }
    async getSummary(productId) {
        return await this.reviewService.getSummary(productId);
    }
    async create(req, dto) {
        return await this.reviewService.create_review(req.user.id, dto);
    }
    async findMyReviews(req, page, limit) {
        return await this.reviewService.findMyReviews(req.user.id, page, limit);
    }
    async update(id, req, dto) {
        return await this.reviewService.customer_update_review(id, req.user.id, dto);
    }
    async remove(id, req) {
        return await this.reviewService.remove(id, req.user.id);
    }
};
exports.ReviewController = ReviewController;
__decorate([
    (0, common_1.Get)('single/:productId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get approved reviews for a product',
        description: 'Returns paginated approved reviews. Use /summary for star counts.',
    }),
    (0, swagger_1.ApiParam)({ name: 'productId', description: 'UUID of the product' }),
    (0, swagger_1.ApiQuery)({ name: 'rating', required: false, description: 'Filter by star rating (1–5)' }),
    (0, swagger_1.ApiQuery)({ name: 'verifiedOnly', required: false, description: 'Only verified purchase reviews' }),
    (0, swagger_1.ApiQuery)({ name: 'sortBy', required: false, enum: ['createdAt', 'rating'] }),
    (0, swagger_1.ApiQuery)({ name: 'sortOrder', required: false, enum: ['ASC', 'DESC'] }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, example: 10 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        schema: {
            example: {
                data: [{
                        id: 'uuid',
                        rating: 5,
                        title: 'Fits perfectly',
                        body: 'Great quality, runs true to size.',
                        isVerifiedPurchase: true,
                        createdAt: '2024-03-28T10:00:00.000Z',
                        user: { id: 'uuid', firstName: 'John', lastName: 'D.' },
                    }],
                total: 128, page: 1, limit: 10, totalPages: 13,
            },
        },
    }),
    __param(0, (0, common_1.Param)('productId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, review_dto_1.QueryReviewDto]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "findByProduct", null);
__decorate([
    (0, common_1.Get)('/:productId/summary'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get star rating summary for a product',
        description: 'Returns averageRating, totalReviews, verifiedCount and per-star breakdown. ' +
            'Call this to render stars on product cards and the detail page.',
    }),
    (0, swagger_1.ApiParam)({ name: 'productId', description: 'UUID of the product' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        schema: {
            example: {
                averageRating: 4.3,
                totalReviews: 128,
                verifiedCount: 94,
                breakdown: { '1': 3, '2': 5, '3': 10, '4': 40, '5': 70 },
            },
        },
    }),
    __param(0, (0, common_1.Param)('productId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "getSummary", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, swagger_1.ApiOperation)({
        summary: 'Submit a product review',
        description: 'Pass orderId to get the verified purchase badge. ' +
            'Order must be DELIVERED and must contain the product.',
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Review submitted — pending admin approval.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Already reviewed / order not delivered / product not in order.' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, review_dto_1.CreateReviewDto]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('my-reviews'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all reviews written by the logged-in customer' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, example: 10 }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "findMyReviews", null);
__decorate([
    (0, common_1.Post)('edit/myreviews/:id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Edit your own review',
        description: 'After editing, the review is re-queued for admin approval.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'UUID of the review' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Review updated — pending re-approval.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'You can only edit your own reviews.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Review not found.' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, review_dto_1.UpdateReviewDto]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('delete/myreviews/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Delete your own review' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'UUID of the review' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Review deleted.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'You can only delete your own reviews.' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "remove", null);
exports.ReviewController = ReviewController = __decorate([
    (0, swagger_1.ApiTags)('Product Reviews'),
    (0, common_1.Controller)('reviews'),
    __metadata("design:paramtypes", [product_review_service_1.ReviewService])
], ReviewController);
//# sourceMappingURL=product.review.controller.js.map