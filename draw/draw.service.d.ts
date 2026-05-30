import { Repository } from 'typeorm';
import { Draw, DrawStatus } from './entities/draw.entity';
import { DrawParticipant } from './entities/draw.participant.entity';
import { Order } from 'src/orders/entities/orders.entity';
import { CreateDrawDto, UpdateDrawDto } from './dto/draw.dto';
export declare class DrawService {
    private readonly drawRepo;
    private readonly participantRepo;
    private readonly orderRepo;
    constructor(drawRepo: Repository<Draw>, participantRepo: Repository<DrawParticipant>, orderRepo: Repository<Order>);
    create(dto: CreateDrawDto): Promise<Draw>;
    createnewDraw(dto: CreateDrawDto): Promise<import("../shared/interfaces/aResponse").aResponse<Draw> | undefined>;
    findAll(status?: DrawStatus, page?: number, limit?: number): Promise<{
        data: any[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findAllDraws(status?: DrawStatus, page?: number, limit?: number): Promise<import("../shared/interfaces/aResponse").aResponse<{
        data: any[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }> | undefined>;
    getSingleDraw(drawId: string): Promise<import("../shared/interfaces/aResponse").aResponse<Draw> | undefined>;
    join(drawId: string, userId: string): Promise<{
        message: string;
        isPurchaser: boolean;
        participant: DrawParticipant;
    }>;
    joinDraw(drawId: string, userId: string): Promise<import("../shared/interfaces/aResponse").aResponse<{
        message: string;
        isPurchaser: boolean;
        participant: DrawParticipant;
    }> | undefined>;
    checkIfUserJoined(drawId: string, userId: string): Promise<import("../shared/interfaces/aResponse").aResponse<{
        hasJoined: boolean;
    }> | undefined>;
    conductDraw(drawId: string): Promise<{
        draw: Draw;
        winners: DrawParticipant[];
        summary: {
            totalSold: number;
            totalParticipants: number;
            totalWinners: number;
            buyerWinners: number;
            nonBuyerWinners: number;
        };
    }>;
    conductDrawAndNotify(drawId: string): Promise<import("../shared/interfaces/aResponse").aResponse<{
        draw: Draw;
        winners: DrawParticipant[];
        summary: {
            totalSold: number;
            totalParticipants: number;
            totalWinners: number;
            buyerWinners: number;
            nonBuyerWinners: number;
        };
    }> | undefined>;
    close(drawId: string): Promise<Draw>;
    closeDraw(drawId: string): Promise<import("../shared/interfaces/aResponse").aResponse<Draw> | undefined>;
    findOne(drawId: string): Promise<Draw>;
    getWinners(drawId: string): Promise<{
        draw: Draw;
        winners: DrawParticipant[];
    }>;
    getDrawWinners(drawId: string): Promise<import("../shared/interfaces/aResponse").aResponse<{
        draw: Draw;
        winners: DrawParticipant[];
    }> | undefined>;
    findByProduct(productId: string): Promise<Draw[]>;
    getDrawsByProduct(productId: string): Promise<import("../shared/interfaces/aResponse").aResponse<Draw[]> | undefined>;
    checkMyResult(drawId: string, userId: string): Promise<{
        participated: boolean;
        isWinner: boolean;
        isPurchaser: boolean;
        draw: Draw;
    }>;
    checkUserDrawResult(drawId: string, userId: string): Promise<import("../shared/interfaces/aResponse").aResponse<{
        participated: boolean;
        isWinner: boolean;
        isPurchaser: boolean;
        draw: Draw;
    }> | undefined>;
    update(drawId: string, dto: UpdateDrawDto): Promise<Draw>;
    updateDraw(drawId: string, dto: UpdateDrawDto): Promise<import("../shared/interfaces/aResponse").aResponse<Draw> | undefined>;
    getOngoingDraws(productId: string): Promise<{
        hasOngoingDraw: boolean;
        drawIds: string[];
        draws: {
            id: string;
            title: string;
            rewardDescription: string;
            opensAt: Date;
            closesAt: Date;
            participantCount: number;
        }[];
    }>;
    checkProductOngoingDraws(productId: string): Promise<import("../shared/interfaces/aResponse").aResponse<{
        hasOngoingDraw: boolean;
        drawIds: string[];
        draws: {
            id: string;
            title: string;
            rewardDescription: string;
            opensAt: Date;
            closesAt: Date;
            participantCount: number;
        }[];
    }> | undefined>;
    private shuffleArray;
}
