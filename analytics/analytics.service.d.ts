import { Repository } from 'typeorm';
import { Order } from 'src/orders/entities/orders.entity';
import { Product } from 'src/products/entities/products.entity';
import { User } from 'src/users/entities/user.entity';
export type PeriodFilter = 'this_week' | 'this_month' | 'this_year';
export declare class AnalyticsService {
    private readonly orderRepo;
    private readonly productRepo;
    private readonly userRepo;
    constructor(orderRepo: Repository<Order>, productRepo: Repository<Product>, userRepo: Repository<User>);
    private percentChange;
    private getWeekBounds;
    getSummaryCards(): Promise<{
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
    }>;
    getSummaryCardsData(): Promise<import("../shared/interfaces/aResponse").aResponse<{
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
    getSalesTrend(period: PeriodFilter): Promise<{
        labels: string[];
        data: number[];
    }>;
    getSalesTrendData(period: PeriodFilter): Promise<import("../shared/interfaces/aResponse").aResponse<{
        labels: string[];
        data: number[];
    }> | undefined>;
    getRevenueTrend(period: PeriodFilter): Promise<{
        labels: string[];
        data: number[];
    }>;
    getRevenueTrendData(period: PeriodFilter): Promise<import("../shared/interfaces/aResponse").aResponse<{
        labels: string[];
        data: number[];
    }> | undefined>;
    getUsersTrend(period: PeriodFilter): Promise<{
        labels: string[];
        data: number[];
    }>;
    getUsersTrendData(period: PeriodFilter): Promise<import("../shared/interfaces/aResponse").aResponse<{
        labels: string[];
        data: number[];
    }> | undefined>;
    getTopArtists(limit?: number): Promise<{
        rank: number;
        artistId: string;
        artistName: string;
        artistImage: string;
        totalSales: number;
    }[]>;
    getTopArtistsData(limit?: number): Promise<import("../shared/interfaces/aResponse").aResponse<{
        rank: number;
        artistId: string;
        artistName: string;
        artistImage: string;
        totalSales: number;
    }[]> | undefined>;
    private resolvePeriod;
    private formatChartData;
}
