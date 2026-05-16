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
exports.DrawService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const draw_entity_1 = require("./entities/draw.entity");
const draw_participant_entity_1 = require("./entities/draw.participant.entity");
const orders_entity_1 = require("../orders/entities/orders.entity");
const order_status_1 = require("../orders/enum/order.status");
const apiResponse_1 = require("../shared/utilities/apiResponse");
const rethrow_exception_1 = require("../shared/utilities/rethrow-exception");
let DrawService = class DrawService {
    drawRepo;
    participantRepo;
    orderRepo;
    constructor(drawRepo, participantRepo, orderRepo) {
        this.drawRepo = drawRepo;
        this.participantRepo = participantRepo;
        this.orderRepo = orderRepo;
    }
    async create(dto) {
        const openDateTime = dto.opensAt ? new Date(dto.opensAt) : new Date();
        const closeDateTime = dto.closesAt ? new Date(dto.closesAt) : new Date();
        const draw = this.drawRepo.create({
            productId: dto.productId,
            title: dto.title,
            status: draw_entity_1.DrawStatus.OPEN,
            opensAt: openDateTime ?? null,
            closesAt: closeDateTime ?? null,
            description: dto.description,
            rewardDescription: dto.rewardDescription,
        });
        return await this.drawRepo.save(draw);
    }
    async createnewDraw(dto) {
        try {
            const newDraw = await this.create(dto);
            return (0, apiResponse_1.createResponse)(true, 'Draw created successfully', newDraw);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async getSingleDraw(drawId) {
        try {
            const draw = await this.findOne(drawId);
            return (0, apiResponse_1.createResponse)(true, 'Draw retrieved successfully', draw);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async join(drawId, userId) {
        const draw = await this.drawRepo.findOneBy({ id: drawId });
        if (!draw) {
            throw new common_1.HttpException((0, apiResponse_1.createUnSuccessfulResponse)(`Draw #${drawId} not found.`), common_1.HttpStatus.BAD_REQUEST);
        }
        if (draw.status !== draw_entity_1.DrawStatus.OPEN) {
            throw new common_1.BadRequestException(draw.status === draw_entity_1.DrawStatus.COMPLETED
                ? 'This draw has already been completed.'
                : 'This draw is currently closed and not accepting participants.');
        }
        const now = new Date();
        if (draw.opensAt && now < draw.opensAt) {
            throw new common_1.HttpException((0, apiResponse_1.createUnSuccessfulResponse)(`This draw does not open until ${draw.opensAt.toISOString()}.`), common_1.HttpStatus.BAD_REQUEST);
        }
        if (draw.closesAt && now > draw.closesAt) {
            throw new common_1.HttpException((0, apiResponse_1.createUnSuccessfulResponse)('This draw has closed and is no longer accepting participants.'), common_1.HttpStatus.BAD_REQUEST);
        }
        const alreadyJoined = await this.participantRepo.existsBy({
            drawId,
            userId,
        });
        if (alreadyJoined) {
            throw new common_1.HttpException((0, apiResponse_1.createUnSuccessfulResponse)('You have already entered this draw.'), common_1.HttpStatus.BAD_REQUEST);
        }
        const purchaseOrder = await this.orderRepo
            .createQueryBuilder('order')
            .innerJoin('order.items', 'item')
            .where('order.userId = :userId', { userId })
            .andWhere('item.productId = :productId', { productId: draw.productId })
            .andWhere('order.status IN (:...statuses)', {
            statuses: [order_status_1.OrderStatus.CONFIRMED, order_status_1.OrderStatus.DELIVERED],
        })
            .getOne();
        const isPurchaser = !!purchaseOrder;
        const participant = this.participantRepo.create({
            drawId,
            userId,
            isPurchaser,
            isWinner: false,
        });
        const saved = await this.participantRepo.save(participant);
        return {
            message: isPurchaser
                ? 'You have entered the draw as a verified purchaser. Good luck!'
                : 'You have entered the draw. Good luck!',
            isPurchaser,
            participant: saved,
        };
    }
    async joinDraw(drawId, userId) {
        try {
            const result = await this.join(drawId, userId);
            return (0, apiResponse_1.createResponse)(true, 'Successfully joined the draw', result);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async conductDraw(drawId) {
        const draw = await this.drawRepo.findOne({
            where: { id: drawId },
            relations: { participants: { user: true } },
        });
        if (!draw)
            throw new common_1.HttpException((0, apiResponse_1.createUnSuccessfulResponse)(`Draw #${drawId} not found.`), common_1.HttpStatus.BAD_REQUEST);
        if (draw.status === draw_entity_1.DrawStatus.COMPLETED) {
            throw new common_1.HttpException((0, apiResponse_1.createUnSuccessfulResponse)('This draw has already been conducted.'), common_1.HttpStatus.BAD_REQUEST);
        }
        const soldResult = await this.orderRepo
            .createQueryBuilder('order')
            .innerJoin('order.items', 'item')
            .select('COALESCE(SUM(item.quantity), 0)', 'totalSold')
            .where('item.productId = :productId', { productId: draw.productId })
            .andWhere('order.status IN (:...statuses)', {
            statuses: [order_status_1.OrderStatus.CONFIRMED, order_status_1.OrderStatus.DELIVERED],
        })
            .getRawOne();
        const totalSold = Number(soldResult.totalSold);
        const totalWinners = Math.max(1, Math.floor(totalSold * 0.10));
        const buyerWinnerCount = Math.floor(totalWinners * 0.75);
        const nonBuyerWinnerCount = totalWinners - buyerWinnerCount;
        const allParticipants = draw.participants;
        const buyerPool = this.shuffleArray(allParticipants.filter((p) => p.isPurchaser));
        const nonBuyerPool = this.shuffleArray(allParticipants.filter((p) => !p.isPurchaser));
        let selectedBuyers = buyerPool.slice(0, buyerWinnerCount);
        let shortfall = buyerWinnerCount - selectedBuyers.length;
        let selectedNonBuyers = nonBuyerPool.slice(0, nonBuyerWinnerCount + shortfall);
        const winners = [...selectedBuyers, ...selectedNonBuyers];
        const winnerIds = winners.map((w) => w.id);
        if (winnerIds.length > 0) {
            await this.participantRepo.update({ id: (0, typeorm_2.In)(winnerIds) }, { isWinner: true });
        }
        await this.drawRepo.update(drawId, {
            status: draw_entity_1.DrawStatus.COMPLETED,
            conductedAt: new Date(),
            totalSoldAtDraw: totalSold,
            totalWinners: winners.length,
            buyerWinnerCount: selectedBuyers.length,
            nonBuyerWinnerCount: selectedNonBuyers.length,
        });
        const updatedDraw = await this.drawRepo.findOne({
            where: { id: drawId },
            relations: { participants: { user: true } },
        });
        const finalWinners = updatedDraw.participants.filter((p) => p.isWinner);
        return {
            draw: updatedDraw,
            winners: finalWinners,
            summary: {
                totalSold,
                totalParticipants: allParticipants.length,
                totalWinners: winners.length,
                buyerWinners: selectedBuyers.length,
                nonBuyerWinners: selectedNonBuyers.length,
            },
        };
    }
    async conductDrawAndNotify(drawId) {
        try {
            const result = await this.conductDraw(drawId);
            return (0, apiResponse_1.createResponse)(true, 'Draw conducted successfully', result);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async close(drawId) {
        const draw = await this.drawRepo.findOneBy({ id: drawId });
        if (!draw)
            throw new common_1.NotFoundException(`Draw #${drawId} not found.`);
        if (draw.status !== draw_entity_1.DrawStatus.OPEN) {
            throw new common_1.BadRequestException('Only OPEN draws can be closed.');
        }
        draw.status = draw_entity_1.DrawStatus.CLOSED;
        return this.drawRepo.save(draw);
    }
    async closeDraw(drawId) {
        try {
            const closedDraw = await this.close(drawId);
            return (0, apiResponse_1.createResponse)(true, 'Draw closed successfully', closedDraw);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async findOne(drawId) {
        const draw = await this.drawRepo.findOne({
            where: { id: drawId },
            relations: { product: true, participants: { user: true } },
        });
        if (!draw)
            throw new common_1.NotFoundException(`Draw #${drawId} not found.`);
        return draw;
    }
    async getWinners(drawId) {
        const draw = await this.drawRepo.findOne({
            where: { id: drawId },
            relations: { product: true },
        });
        if (!draw)
            throw new common_1.HttpException((0, apiResponse_1.createUnSuccessfulResponse)(`Draw #${drawId} not found.`), common_1.HttpStatus.BAD_REQUEST);
        if (draw.status !== draw_entity_1.DrawStatus.COMPLETED) {
            throw new common_1.HttpException((0, apiResponse_1.createUnSuccessfulResponse)('Winners are only available after the draw has been conducted.'), common_1.HttpStatus.BAD_REQUEST);
        }
        const winners = await this.participantRepo.find({
            where: { drawId, isWinner: true },
            relations: { user: true },
        });
        return { draw, winners };
    }
    async getDrawWinners(drawId) {
        try {
            const result = await this.getWinners(drawId);
            return (0, apiResponse_1.createResponse)(true, 'Winners retrieved successfully', result);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async findByProduct(productId) {
        return this.drawRepo.find({
            where: { productId },
            order: { createdAt: 'DESC' },
        });
    }
    async getDrawsByProduct(productId) {
        try {
            const draws = await this.findByProduct(productId);
            return (0, apiResponse_1.createResponse)(true, 'Draws retrieved successfully', draws);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async checkMyResult(drawId, userId) {
        const draw = await this.drawRepo.findOne({
            where: { id: drawId },
            relations: { product: true },
        });
        if (!draw)
            throw new common_1.HttpException((0, apiResponse_1.createUnSuccessfulResponse)(`Draw #${drawId} not found.`), common_1.HttpStatus.BAD_REQUEST);
        const participant = await this.participantRepo.findOne({
            where: { drawId, userId },
        });
        return {
            participated: !!participant,
            isWinner: participant?.isWinner ?? false,
            isPurchaser: participant?.isPurchaser ?? false,
            draw,
        };
    }
    async checkUserDrawResult(drawId, userId) {
        try {
            const result = await this.checkMyResult(drawId, userId);
            return (0, apiResponse_1.createResponse)(true, 'User draw result retrieved successfully', result);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async update(drawId, dto) {
        const draw = await this.drawRepo.findOneBy({ id: drawId });
        if (!draw)
            throw new common_1.NotFoundException(`Draw #${drawId} not found.`);
        if (draw.status === draw_entity_1.DrawStatus.COMPLETED) {
            throw new common_1.BadRequestException('Completed draws cannot be updated.');
        }
        Object.assign(draw, {
            ...dto,
            closesAt: dto.closesAt ? new Date(dto.closesAt) : draw.closesAt,
        });
        return this.drawRepo.save(draw);
    }
    async updateDraw(drawId, dto) {
        try {
            const updatedDraw = await this.update(drawId, dto);
            return (0, apiResponse_1.createResponse)(true, 'Draw updated successfully', updatedDraw);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
        ;
    }
    async getOngoingDraws(productId) {
        const now = new Date();
        const draws = await this.drawRepo
            .createQueryBuilder('draw')
            .loadRelationCountAndMap('draw.participantCount', 'draw.participants')
            .where('draw.productId = :productId', { productId })
            .andWhere('draw.status = :status', { status: draw_entity_1.DrawStatus.OPEN })
            .andWhere('(draw.opensAt IS NULL OR draw.opensAt <= :now)', { now })
            .andWhere('(draw.closesAt IS NULL OR draw.closesAt >= :now)', { now })
            .getMany();
        return {
            hasOngoingDraw: draws.length > 0,
            drawIds: draws.map((d) => d.id),
        };
    }
    async checkProductOngoingDraws(productId) {
        try {
            const result = await this.getOngoingDraws(productId);
            return (0, apiResponse_1.createResponse)(true, 'Ongoing draws retrieved successfully', result);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    shuffleArray(array) {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }
};
exports.DrawService = DrawService;
exports.DrawService = DrawService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(draw_entity_1.Draw)),
    __param(1, (0, typeorm_1.InjectRepository)(draw_participant_entity_1.DrawParticipant)),
    __param(2, (0, typeorm_1.InjectRepository)(orders_entity_1.Order)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DrawService);
//# sourceMappingURL=draw.service.js.map