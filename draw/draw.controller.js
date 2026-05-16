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
exports.DrawController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const draw_service_1 = require("./draw.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let DrawController = class DrawController {
    drawService;
    constructor(drawService) {
        this.drawService = drawService;
    }
    join(drawId, req) {
        return this.drawService.joinDraw(drawId, req.user.id);
    }
    checkMyResult(drawId, req) {
        return this.drawService.checkUserDrawResult(drawId, req.user.id);
    }
    getWinners(drawId) {
        return this.drawService.getDrawWinners(drawId);
    }
    findByProduct(productId) {
        return this.drawService.getDrawsByProduct(productId);
    }
    checkProductOngoingDraws(productId) {
        return this.drawService.checkProductOngoingDraws(productId);
    }
};
exports.DrawController = DrawController;
__decorate([
    (0, common_1.Post)(':drawId/join'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Join a draw by scanning the product QR code',
        description: 'The authenticated user is registered as a draw participant. ' +
            'isPurchaser is set automatically by checking the user\'s order history. ' +
            'A user can only join each draw once.',
    }),
    (0, swagger_1.ApiParam)({ name: 'drawId', description: 'UUID of the draw' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Successfully joined the draw.',
        schema: {
            example: {
                message: 'You have entered the draw as a verified purchaser. Good luck!',
                isPurchaser: true,
                participant: {
                    id: 'uuid',
                    drawId: 'uuid',
                    userId: 'uuid',
                    isPurchaser: true,
                    isWinner: false,
                    scannedAt: '2024-04-01T10:00:00.000Z',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Draw is closed or not yet open.' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'User already entered this draw.' }),
    __param(0, (0, common_1.Param)('drawId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], DrawController.prototype, "join", null);
__decorate([
    (0, common_1.Get)(':drawId/my-result'),
    (0, swagger_1.ApiOperation)({
        summary: 'Check if the logged-in user won a draw',
        description: 'Returns participated, isWinner and isPurchaser for the current user. ' +
            'Use this to render the result page after a draw is completed.',
    }),
    (0, swagger_1.ApiParam)({ name: 'drawId', description: 'UUID of the draw' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        schema: {
            example: {
                participated: true,
                isWinner: true,
                isPurchaser: true,
                draw: {
                    id: 'uuid',
                    title: 'WAVES Hoodie Launch Draw',
                    rewardDescription: '₦50,000 cash prize',
                    status: 'COMPLETED',
                    conductedAt: '2024-04-07T18:00:00.000Z',
                },
            },
        },
    }),
    __param(0, (0, common_1.Param)('drawId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], DrawController.prototype, "checkMyResult", null);
__decorate([
    (0, common_1.Get)(':drawId/winners'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get winners of a completed draw',
        description: 'Returns the full winner list. Only available after draw is COMPLETED.',
    }),
    (0, swagger_1.ApiParam)({ name: 'drawId', description: 'UUID of the draw' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        schema: {
            example: {
                draw: {
                    id: 'uuid',
                    title: 'WAVES Hoodie Launch Draw',
                    totalWinners: 10,
                    buyerWinnerCount: 7,
                    nonBuyerWinnerCount: 3,
                    conductedAt: '2024-04-07T18:00:00.000Z',
                },
                winners: [
                    {
                        id: 'uuid',
                        isPurchaser: true,
                        isWinner: true,
                        user: { id: 'uuid', firstName: 'John', lastName: 'D.' },
                    },
                ],
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Draw not yet completed.' }),
    __param(0, (0, common_1.Param)('drawId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DrawController.prototype, "getWinners", null);
__decorate([
    (0, common_1.Get)('product/:productId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all draws for a product' }),
    (0, swagger_1.ApiParam)({ name: 'productId', description: 'UUID of the product' }),
    __param(0, (0, common_1.Param)('productId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DrawController.prototype, "findByProduct", null);
__decorate([
    (0, common_1.Get)('ongoing/:productId'),
    (0, swagger_1.ApiOperation)({ summary: 'Check if a product has any ongoing draws' }),
    (0, swagger_1.ApiParam)({ name: 'productId', description: 'UUID of the product' }),
    __param(0, (0, common_1.Param)('productId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DrawController.prototype, "checkProductOngoingDraws", null);
exports.DrawController = DrawController = __decorate([
    (0, swagger_1.ApiTags)('Draws'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('draws'),
    __metadata("design:paramtypes", [draw_service_1.DrawService])
], DrawController);
//# sourceMappingURL=draw.controller.js.map