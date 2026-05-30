import { DrawService } from './draw.service';
import { CustomRequest } from 'src/shared/interfaces/CustomRequest';
export declare class DrawController {
    private readonly drawService;
    constructor(drawService: DrawService);
    join(drawId: string, req: CustomRequest): Promise<import("../shared/interfaces/aResponse").aResponse<{
        message: string;
        isPurchaser: boolean;
        participant: import("./entities/draw.participant.entity").DrawParticipant;
    }> | undefined>;
    checkMyResult(drawId: string, req: CustomRequest): Promise<import("../shared/interfaces/aResponse").aResponse<{
        participated: boolean;
        isWinner: boolean;
        isPurchaser: boolean;
        draw: import("./entities/draw.entity").Draw;
    }> | undefined>;
    getWinners(drawId: string): Promise<import("../shared/interfaces/aResponse").aResponse<{
        draw: import("./entities/draw.entity").Draw;
        winners: import("./entities/draw.participant.entity").DrawParticipant[];
    }> | undefined>;
    findByProduct(productId: string): Promise<import("../shared/interfaces/aResponse").aResponse<import("./entities/draw.entity").Draw[]> | undefined>;
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
    checkIfJoined(drawId: string, req: CustomRequest): Promise<import("../shared/interfaces/aResponse").aResponse<{
        hasJoined: boolean;
    }> | undefined>;
}
