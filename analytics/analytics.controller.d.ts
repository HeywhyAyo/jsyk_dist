import { AnalyticsService, PeriodFilter } from './analytics.service';
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
    getSummaryCards(): Promise<import("../shared/interfaces/aResponse").aResponse<{
        totalSales: {
            value: number;
            percentChange: number;
        };
        totalUsers: {
            value: number;
            percentChange: number;
        };
        totalOrders: {
            value: number;
            percentChange: number;
        };
        totalProducts: {
            value: number;
            percentChange: number;
        };
    }> | undefined>;
    getSalesTrend(period?: PeriodFilter): Promise<import("../shared/interfaces/aResponse").aResponse<{
        labels: string[];
        data: number[];
    }> | undefined>;
    getRevenueTrend(period?: PeriodFilter): Promise<import("../shared/interfaces/aResponse").aResponse<{
        labels: string[];
        data: number[];
    }> | undefined>;
    getUsersTrend(period?: PeriodFilter): Promise<import("../shared/interfaces/aResponse").aResponse<{
        labels: string[];
        data: number[];
    }> | undefined>;
    getTopArtists(limit: number): Promise<import("../shared/interfaces/aResponse").aResponse<{
        rank: number;
        artistId: string;
        artistName: string;
        artistImage: string;
        totalSales: number;
    }[]> | undefined>;
}
