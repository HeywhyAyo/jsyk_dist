export declare class CreateReviewDto {
    productId: string;
    orderId?: string;
    rating: number;
    title?: string;
    body?: string;
}
export declare class UpdateReviewDto {
    rating?: number;
    title?: string;
    body?: string;
}
export declare class QueryReviewDto {
    rating?: number;
    verifiedOnly?: boolean;
    sortBy?: 'createdAt' | 'rating';
    sortOrder?: 'ASC' | 'DESC';
    page?: number;
    limit?: number;
}
