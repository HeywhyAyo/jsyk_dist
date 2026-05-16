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
exports.AnalyticsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const analytics_service_1 = require("./analytics.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const roleEnum_1 = require("../users/shared/enum/roleEnum");
const roles_decorator_1 = require("../auth/roles.decorator");
let AnalyticsController = class AnalyticsController {
    analyticsService;
    constructor(analyticsService) {
        this.analyticsService = analyticsService;
    }
    getSummaryCards() {
        return this.analyticsService.getSummaryCardsData();
    }
    getSalesTrend(period = 'this_year') {
        return this.analyticsService.getSalesTrendData(period);
    }
    getRevenueTrend(period = 'this_year') {
        return this.analyticsService.getRevenueTrendData(period);
    }
    getUsersTrend(period = 'this_week') {
        return this.analyticsService.getUsersTrendData(period);
    }
    getTopArtists(limit) {
        return this.analyticsService.getTopArtistsData(limit);
    }
};
exports.AnalyticsController = AnalyticsController;
__decorate([
    (0, common_1.Get)('summary'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get dashboard summary cards',
        description: 'Returns Total Sales, Total Users, Orders and Total Products ' +
            'each with a percentage change vs last week.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        schema: {
            example: {
                totalSales: { value: 2450000, percentChange: 12 },
                totalUsers: { value: 1208, percentChange: 8.5 },
                totalOrders: { value: 684, percentChange: 8.5 },
                totalProducts: { value: 10000, percentChange: 9.5 },
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "getSummaryCards", null);
__decorate([
    (0, common_1.Get)('sales-trend'),
    (0, swagger_1.ApiOperation)({ summary: 'Get Sales Trend chart data' }),
    (0, swagger_1.ApiQuery)({
        name: 'period',
        required: false,
        enum: ['this_week', 'this_month', 'this_year'],
        example: 'this_year',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        schema: {
            example: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                data: [10000, 8000, 15000, 22000, 18000, 25000,
                    30000, 28000, 24000, 26000, 23000, 27000],
            },
        },
    }),
    __param(0, (0, common_1.Query)('period')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "getSalesTrend", null);
__decorate([
    (0, common_1.Get)('revenue-trend'),
    (0, swagger_1.ApiOperation)({ summary: 'Get Total Revenue chart data' }),
    (0, swagger_1.ApiQuery)({
        name: 'period',
        required: false,
        enum: ['this_week', 'this_month', 'this_year'],
        example: 'this_year',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        schema: {
            example: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                data: [10000, 8000, 15000, 22000, 18000, 25000,
                    30000, 28000, 24000, 26000, 23000, 27000],
            },
        },
    }),
    __param(0, (0, common_1.Query)('period')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "getRevenueTrend", null);
__decorate([
    (0, common_1.Get)('users-trend'),
    (0, swagger_1.ApiOperation)({ summary: 'Get Total Users chart data' }),
    (0, swagger_1.ApiQuery)({
        name: 'period',
        required: false,
        enum: ['this_week', 'this_month', 'this_year'],
        example: 'this_week',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        schema: {
            example: {
                labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                data: [10000, 20000, 30000, 32000, 36000, 40000, 45000],
            },
        },
    }),
    __param(0, (0, common_1.Query)('period')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "getUsersTrend", null);
__decorate([
    (0, common_1.Get)('top-artists'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get top artists by sales',
        description: 'Returns up to 12 artists ranked by total units sold from confirmed orders. ' +
            'Each entry includes rank, artistName, artistImage and totalSales.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        example: 10,
        description: 'Number of artists to return (default 10)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        schema: {
            example: [
                { rank: 1, artistId: 'uuid', artistName: 'Burna Boy', artistImage: 'https://cdn.jsyk.com/artists/burna-boy.jpg', totalSales: 1432 },
                { rank: 2, artistId: 'uuid', artistName: 'Wizkid', artistImage: 'https://cdn.jsyk.com/artists/wizkid.jpg', totalSales: 1432 },
                { rank: 3, artistId: 'uuid', artistName: 'Davido', artistImage: 'https://cdn.jsyk.com/artists/davido.jpg', totalSales: 1432 },
            ],
        },
    }),
    __param(0, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "getTopArtists", null);
exports.AnalyticsController = AnalyticsController = __decorate([
    (0, swagger_1.ApiTags)('Admin / Analytics'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roleEnum_1.UserRole.ADMIN, roleEnum_1.UserRole.SUPERADMIN),
    (0, common_1.Controller)('admin/analytics'),
    __metadata("design:paramtypes", [analytics_service_1.AnalyticsService])
], AnalyticsController);
//# sourceMappingURL=analytics.controller.js.map