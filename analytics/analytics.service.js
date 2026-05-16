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
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const orders_entity_1 = require("../orders/entities/orders.entity");
const order_status_1 = require("../orders/enum/order.status");
const products_entity_1 = require("../products/entities/products.entity");
const user_entity_1 = require("../users/entities/user.entity");
const apiResponse_1 = require("../shared/utilities/apiResponse");
const rethrow_exception_1 = require("../shared/utilities/rethrow-exception");
let AnalyticsService = class AnalyticsService {
    orderRepo;
    productRepo;
    userRepo;
    constructor(orderRepo, productRepo, userRepo) {
        this.orderRepo = orderRepo;
        this.productRepo = productRepo;
        this.userRepo = userRepo;
    }
    percentChange(current, previous) {
        if (previous === 0)
            return current > 0 ? 100 : 0;
        return Math.round(((current - previous) / previous) * 100 * 10) / 10;
    }
    getWeekBounds() {
        const now = new Date();
        const day = now.getDay();
        const diffToMonday = (day === 0 ? -6 : 1 - day);
        const thisWeekStart = new Date(now);
        thisWeekStart.setDate(now.getDate() + diffToMonday);
        thisWeekStart.setHours(0, 0, 0, 0);
        const lastWeekStart = new Date(thisWeekStart);
        lastWeekStart.setDate(thisWeekStart.getDate() - 7);
        const lastWeekEnd = new Date(thisWeekStart);
        lastWeekEnd.setMilliseconds(-1);
        return { thisWeekStart, lastWeekStart, lastWeekEnd };
    }
    async getSummaryCards() {
        const { thisWeekStart, lastWeekStart, lastWeekEnd } = this.getWeekBounds();
        const [totalSalesResult, thisWeekSalesResult, lastWeekSalesResult, totalUsers, thisWeekUsers, lastWeekUsers, totalOrders, thisWeekOrders, lastWeekOrders, totalProducts, thisWeekProducts, lastWeekProducts,] = await Promise.all([
            this.orderRepo
                .createQueryBuilder('order')
                .select('COALESCE(SUM(order.total), 0)', 'total')
                .where('order.status = :status', { status: order_status_1.OrderStatus.CONFIRMED })
                .getRawOne(),
            this.orderRepo
                .createQueryBuilder('order')
                .select('COALESCE(SUM(order.total), 0)', 'total')
                .where('order.status = :status', { status: order_status_1.OrderStatus.CONFIRMED })
                .andWhere('order.createdAt >= :start', { start: thisWeekStart })
                .getRawOne(),
            this.orderRepo
                .createQueryBuilder('order')
                .select('COALESCE(SUM(order.total), 0)', 'total')
                .where('order.status = :status', { status: order_status_1.OrderStatus.CONFIRMED })
                .andWhere('order.createdAt >= :start', { start: lastWeekStart })
                .andWhere('order.createdAt <= :end', { end: lastWeekEnd })
                .getRawOne(),
            this.userRepo.count(),
            this.userRepo
                .createQueryBuilder('user')
                .where('user.createdAt >= :start', { start: thisWeekStart })
                .getCount(),
            this.userRepo
                .createQueryBuilder('user')
                .where('user.createdAt >= :start', { start: lastWeekStart })
                .andWhere('user.createdAt <= :end', { end: lastWeekEnd })
                .getCount(),
            this.orderRepo.count(),
            this.orderRepo
                .createQueryBuilder('order')
                .where('order.createdAt >= :start', { start: thisWeekStart })
                .getCount(),
            this.orderRepo
                .createQueryBuilder('order')
                .where('order.createdAt >= :start', { start: lastWeekStart })
                .andWhere('order.createdAt <= :end', { end: lastWeekEnd })
                .getCount(),
            this.productRepo.count({ where: { isActive: true } }),
            this.productRepo
                .createQueryBuilder('product')
                .where('product.isActive = true')
                .andWhere('product.createdAt >= :start', { start: thisWeekStart })
                .getCount(),
            this.productRepo
                .createQueryBuilder('product')
                .where('product.isActive = true')
                .andWhere('product.createdAt >= :start', { start: lastWeekStart })
                .andWhere('product.createdAt <= :end', { end: lastWeekEnd })
                .getCount(),
        ]);
        return {
            totalSales: {
                value: Number(totalSalesResult.total),
                percentChange: this.percentChange(Number(thisWeekSalesResult.total), Number(lastWeekSalesResult.total)),
            },
            totalUsers: {
                value: totalUsers,
                percentChange: this.percentChange(thisWeekUsers, lastWeekUsers),
            },
            totalOrders: {
                value: totalOrders,
                percentChange: this.percentChange(thisWeekOrders, lastWeekOrders),
            },
            totalProducts: {
                value: totalProducts,
                percentChange: this.percentChange(thisWeekProducts, lastWeekProducts),
            },
        };
    }
    async getSummaryCardsData() {
        try {
            const res = await this.getSummaryCards();
            return (0, apiResponse_1.createResponse)(true, 'Summary cards data retrieved successfully', res);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async getSalesTrend(period) {
        const { groupBy, start, format } = this.resolvePeriod(period);
        const rows = await this.orderRepo
            .createQueryBuilder('order')
            .select(`DATE_TRUNC('${groupBy}', order.createdAt)`, 'period')
            .addSelect('COALESCE(SUM(order.total), 0)', 'total')
            .where('order.status = :status', { status: order_status_1.OrderStatus.CONFIRMED })
            .andWhere('order.createdAt >= :start', { start })
            .groupBy(`DATE_TRUNC('${groupBy}', order.createdAt)`)
            .orderBy(`DATE_TRUNC('${groupBy}', order.createdAt)`, 'ASC')
            .getRawMany();
        return this.formatChartData(rows, period, 'total', format);
    }
    async getSalesTrendData(period) {
        try {
            const res = await this.getSalesTrend(period);
            return (0, apiResponse_1.createResponse)(true, 'Sales trend data retrieved successfully', res);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async getRevenueTrend(period) {
        return this.getSalesTrend(period);
    }
    async getRevenueTrendData(period) {
        try {
            const res = await this.getRevenueTrend(period);
            return (0, apiResponse_1.createResponse)(true, 'Revenue trend data retrieved successfully', res);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async getUsersTrend(period) {
        const { groupBy, start, format } = this.resolvePeriod(period);
        const rows = await this.userRepo
            .createQueryBuilder('user')
            .select(`DATE_TRUNC('${groupBy}', user.createdAt)`, 'period')
            .addSelect('COUNT(*)', 'total')
            .where('user.createdAt >= :start', { start })
            .groupBy(`DATE_TRUNC('${groupBy}', user.createdAt)`)
            .orderBy(`DATE_TRUNC('${groupBy}', user.createdAt)`, 'ASC')
            .getRawMany();
        return this.formatChartData(rows, period, 'total', format);
    }
    async getUsersTrendData(period) {
        try {
            const res = await this.getUsersTrend(period);
            return (0, apiResponse_1.createResponse)(true, 'Users trend data retrieved successfully', res);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async getTopArtists(limit = 10) {
        const rows = await this.orderRepo
            .createQueryBuilder('order')
            .innerJoin('order.items', 'item')
            .innerJoin('item.product', 'product')
            .innerJoin('product.collection', 'collection')
            .innerJoin('collection.artist', 'artist')
            .select('artist.id', 'artistId')
            .addSelect('artist.name', 'artistName')
            .addSelect('artist.imageUrl', 'artistImage')
            .addSelect('SUM(item.quantity)', 'totalSales')
            .where('order.status = :status', { status: order_status_1.OrderStatus.CONFIRMED })
            .groupBy('artist.id, artist.name, artist.imageUrl')
            .orderBy('SUM(item.quantity)', 'DESC')
            .limit(limit)
            .getRawMany();
        return rows.map((row, index) => ({
            rank: index + 1,
            artistId: row.artistId,
            artistName: row.artistName,
            artistImage: row.artistImage,
            totalSales: Number(row.totalSales),
        }));
    }
    async getTopArtistsData(limit = 10) {
        try {
            const res = await this.getTopArtists(limit);
            return (0, apiResponse_1.createResponse)(true, 'Top artists data retrieved successfully', res);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    resolvePeriod(period) {
        const now = new Date();
        if (period === 'this_week') {
            const day = now.getDay();
            const diffToMonday = day === 0 ? -6 : 1 - day;
            const start = new Date(now);
            start.setDate(now.getDate() + diffToMonday);
            start.setHours(0, 0, 0, 0);
            return { groupBy: 'day', start, format: 'day' };
        }
        if (period === 'this_month') {
            const start = new Date(now.getFullYear(), now.getMonth(), 1);
            return { groupBy: 'day', start, format: 'day' };
        }
        const start = new Date(now.getFullYear(), 0, 1);
        return { groupBy: 'month', start, format: 'month' };
    }
    formatChartData(rows, period, valueKey, format) {
        const now = new Date();
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const lookup = new Map();
        for (const row of rows) {
            const d = new Date(row.period);
            const key = format === 'month'
                ? `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
                : `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
            lookup.set(key, Number(row[valueKey]));
        }
        const labels = [];
        const data = [];
        if (format === 'month') {
            for (let m = 0; m < 12; m++) {
                const key = `${now.getFullYear()}-${String(m + 1).padStart(2, '0')}`;
                labels.push(monthNames[m]);
                data.push(lookup.get(key) ?? 0);
            }
        }
        else if (period === 'this_week') {
            const day = now.getDay();
            const diffToMonday = day === 0 ? -6 : 1 - day;
            for (let i = 0; i < 7; i++) {
                const d = new Date(now);
                d.setDate(now.getDate() + diffToMonday + i);
                const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
                labels.push(dayNames[i]);
                data.push(lookup.get(key) ?? 0);
            }
        }
        else {
            const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
            for (let d = 1; d <= daysInMonth; d++) {
                const key = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
                labels.push(String(d));
                data.push(lookup.get(key) ?? 0);
            }
        }
        return { labels, data };
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(orders_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(products_entity_1.Product)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map