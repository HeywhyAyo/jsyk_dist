import { Repository } from 'typeorm';
import { Review } from './entities/product.review.entity';
import { Order } from 'src/orders/entities/orders.entity';
import { CreateReviewDto, UpdateReviewDto, QueryReviewDto } from './dto/review.dto';
export declare class ReviewService {
    private readonly reviewRepo;
    private readonly orderRepo;
    constructor(reviewRepo: Repository<Review>, orderRepo: Repository<Order>);
    create_review(userId: string, dto: CreateReviewDto): Promise<import("../shared/interfaces/aResponse").aResponse<Review> | undefined>;
    findByProduct(productId: string, query: QueryReviewDto): Promise<import("../shared/interfaces/aResponse").aResponse<{
        data: Review[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }> | undefined>;
    getSummary(productId: string): Promise<import("../shared/interfaces/aResponse").aResponse<{
        averageRating: number;
        totalReviews: number;
        verifiedCount: number;
        breakdown: Record<1 | 2 | 3 | 4 | 5, number>;
    }> | undefined>;
    findMyReviews(userId: string, page?: number, limit?: number): Promise<import("../shared/interfaces/aResponse").aResponse<{
        data: Review[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }> | undefined>;
    customer_update_review(id: string, userId: string, dto: UpdateReviewDto): Promise<import("../shared/interfaces/aResponse").aResponse<Review> | undefined>;
    remove(id: string, userId: string): Promise<import("../shared/interfaces/aResponse").aResponse<Review> | undefined>;
    getPending(page?: number, limit?: number): Promise<import("../shared/interfaces/aResponse").aResponse<{
        data: Review[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }> | undefined>;
    approve(id: string): Promise<import("../shared/interfaces/aResponse").aResponse<Promise<Review>> | undefined>;
    adminRemove(id: string): Promise<import("../shared/interfaces/aResponse").aResponse<boolean> | undefined>;
    adminFindByProduct(productId: string, page?: number, limit?: number): Promise<import("../shared/interfaces/aResponse").aResponse<{
        data: Review[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }> | undefined>;
    private findOneOrFail;
}
