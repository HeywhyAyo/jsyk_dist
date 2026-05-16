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
exports.ReviewService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_review_entity_1 = require("./entities/product.review.entity");
const orders_entity_1 = require("../orders/entities/orders.entity");
const order_status_1 = require("../orders/enum/order.status");
const rethrow_exception_1 = require("../shared/utilities/rethrow-exception");
const apiResponse_1 = require("../shared/utilities/apiResponse");
let ReviewService = class ReviewService {
    reviewRepo;
    orderRepo;
    constructor(reviewRepo, orderRepo) {
        this.reviewRepo = reviewRepo;
        this.orderRepo = orderRepo;
    }
    async create_review(userId, dto) {
        try {
            const alreadyReviewed = await this.reviewRepo.existsBy({
                userId,
                productId: dto.productId,
            });
            if (alreadyReviewed) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)('You have already submitted a review for this product.');
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            let isVerifiedPurchase = false;
            if (dto.orderId) {
                const order = await this.orderRepo.findOne({
                    where: {
                        id: dto.orderId,
                        userId,
                        status: order_status_1.OrderStatus.DELIVERED,
                    },
                    relations: { items: true },
                });
                if (!order) {
                    const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)('Order not found or has not been delivered yet.');
                    throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
                }
                const containsProduct = order.items.some((item) => item.productId === dto.productId);
                if (!containsProduct) {
                    const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)('This order does not contain the product you are trying to review.');
                    throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
                }
                isVerifiedPurchase = true;
            }
            const review = this.reviewRepo.create({
                userId,
                productId: dto.productId,
                orderId: dto.orderId,
                rating: dto.rating,
                title: dto.title,
                body: dto.body,
                isVerifiedPurchase,
                isApproved: false,
            });
            const result = await this.reviewRepo.save(review);
            return (0, apiResponse_1.createResponse)(true, 'Review submitted successfully. It will be visible once approved by an admin.', result);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async findByProduct(productId, query) {
        try {
            const { rating, verifiedOnly, sortBy = 'createdAt', sortOrder = 'DESC', page = 1, limit = 10, } = query;
            const qb = this.reviewRepo
                .createQueryBuilder('review')
                .leftJoinAndSelect('review.user', 'user')
                .where('review.productId = :productId', { productId })
                .andWhere('review.isApproved = true');
            if (rating)
                qb.andWhere('review.rating = :rating', { rating });
            if (verifiedOnly)
                qb.andWhere('review.isVerifiedPurchase = true');
            const sortableColumns = ['createdAt', 'rating'];
            const column = sortableColumns.includes(sortBy) ? sortBy : 'createdAt';
            qb.orderBy(`review.${column}`, sortOrder === 'ASC' ? 'ASC' : 'DESC');
            qb.skip((page - 1) * limit).take(limit);
            const [data, total] = await qb.getManyAndCount();
            return (0, apiResponse_1.createResponse)(true, 'Reviews retrieved successfully.', { data, total, page, limit, totalPages: Math.ceil(total / limit) });
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async getSummary(productId) {
        try {
            const rows = await this.reviewRepo
                .createQueryBuilder('review')
                .select('review.rating', 'rating')
                .addSelect('COUNT(*)', 'count')
                .addSelect(`SUM(CASE WHEN review."isVerifiedPurchase" = true THEN 1 ELSE 0 END)`, 'verifiedCount')
                .where('review.productId = :productId', { productId })
                .andWhere('review.isApproved = true')
                .groupBy('review.rating')
                .getRawMany();
            const breakdown = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
            let totalReviews = 0;
            let ratingSum = 0;
            let verifiedCount = 0;
            for (const row of rows) {
                const star = Number(row.rating);
                const count = Number(row.count);
                breakdown[star] = count;
                totalReviews += count;
                ratingSum += star * count;
                verifiedCount += Number(row.verifiedCount);
            }
            const averageRating = totalReviews > 0
                ? Math.round((ratingSum / totalReviews) * 10) / 10
                : 0;
            const result = {
                averageRating,
                totalReviews,
                verifiedCount,
                breakdown: breakdown,
            };
            return (0, apiResponse_1.createResponse)(true, 'Rating summary retrieved successfully.', result);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async findMyReviews(userId, page = 1, limit = 10) {
        try {
            const [data, total] = await this.reviewRepo.findAndCount({
                where: { userId },
                relations: { product: true },
                order: { createdAt: 'DESC' },
                skip: (page - 1) * limit,
                take: limit,
            });
            return (0, apiResponse_1.createResponse)(true, 'Your reviews retrieved successfully.', { data, total, page, limit, totalPages: Math.ceil(total / limit) });
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async customer_update_review(id, userId, dto) {
        try {
            const review = await this.findOneOrFail(id);
            if (review.userId !== userId) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)('You can only edit your own reviews.');
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            Object.assign(review, dto, { isApproved: false });
            const result = await this.reviewRepo.save(review);
            return (0, apiResponse_1.createResponse)(true, 'Review updated successfully. It will be visible again once approved.', result);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async remove(id, userId) {
        try {
            const review = await this.findOneOrFail(id);
            if (review.userId !== userId) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)('You can only delete your own reviews.');
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const result = await this.reviewRepo.remove(review);
            return (0, apiResponse_1.createResponse)(true, 'Review deleted successfully.', result);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async getPending(page = 1, limit = 20) {
        try {
            const [data, total] = await this.reviewRepo.findAndCount({
                where: { isApproved: false },
                relations: { user: true, product: true },
                order: { createdAt: 'ASC' },
                skip: (page - 1) * limit,
                take: limit,
            });
            return (0, apiResponse_1.createResponse)(true, 'Pending reviews retrieved successfully.', { data, total, page, limit, totalPages: Math.ceil(total / limit) });
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async approve(id) {
        try {
            const review = await this.findOneOrFail(id);
            review.isApproved = true;
            const result = this.reviewRepo.save(review);
            return (0, apiResponse_1.createResponse)(true, 'Review approved successfully.', result);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async adminRemove(id) {
        try {
            const review = await this.findOneOrFail(id);
            await this.reviewRepo.remove(review);
            return (0, apiResponse_1.createResponse)(true, 'Review removed successfully.', true);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async adminFindByProduct(productId, page = 1, limit = 20) {
        try {
            const [data, total] = await this.reviewRepo.findAndCount({
                where: { productId },
                relations: { user: true },
                order: { createdAt: 'DESC' },
                skip: (page - 1) * limit,
                take: limit,
            });
            return (0, apiResponse_1.createResponse)(true, 'Reviews retrieved successfully.', { data, total, page, limit, totalPages: Math.ceil(total / limit) });
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async findOneOrFail(id) {
        const review = await this.reviewRepo.findOne({
            where: { id },
            relations: { user: true, product: true },
        });
        if (!review)
            throw new common_1.NotFoundException(`Review #${id} not found.`);
        return review;
    }
};
exports.ReviewService = ReviewService;
exports.ReviewService = ReviewService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_review_entity_1.Review)),
    __param(1, (0, typeorm_1.InjectRepository)(orders_entity_1.Order)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ReviewService);
//# sourceMappingURL=product.review.service.js.map