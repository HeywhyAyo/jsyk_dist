import { ReviewService } from './product.review.service';
import { CreateReviewDto, UpdateReviewDto, QueryReviewDto } from './dto/review.dto';
import { CustomRequest } from 'src/shared/interfaces/CustomRequest';
export declare class ReviewController {
    private readonly reviewService;
    constructor(reviewService: ReviewService);
    findByProduct(productId: string, query: QueryReviewDto): Promise<import("../shared/interfaces/aResponse").aResponse<{
        data: import("./entities/product.review.entity").Review[];
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
    create(req: CustomRequest, dto: CreateReviewDto): Promise<import("../shared/interfaces/aResponse").aResponse<import("./entities/product.review.entity").Review> | undefined>;
    findMyReviews(req: CustomRequest, page: number, limit: number): Promise<import("../shared/interfaces/aResponse").aResponse<{
        data: import("./entities/product.review.entity").Review[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }> | undefined>;
    update(id: string, req: CustomRequest, dto: UpdateReviewDto): Promise<import("../shared/interfaces/aResponse").aResponse<import("./entities/product.review.entity").Review> | undefined>;
    remove(id: string, req: CustomRequest): Promise<import("../shared/interfaces/aResponse").aResponse<import("./entities/product.review.entity").Review> | undefined>;
}
