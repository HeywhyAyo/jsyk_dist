import { Product } from 'src/products/entities/products.entity';
import { DrawParticipant } from './draw.participant.entity';
export declare enum DrawStatus {
    OPEN = "OPEN",
    CLOSED = "CLOSED",
    COMPLETED = "COMPLETED"
}
export declare class Draw {
    id: string;
    product: Product;
    productId: string;
    title: string;
    description: string;
    rewardDescription: string;
    status: DrawStatus;
    totalSoldAtDraw: number;
    totalWinners: number;
    buyerWinnerCount: number;
    nonBuyerWinnerCount: number;
    conductedAt: Date;
    opensAt: Date;
    closesAt: Date;
    createdAt: Date;
    updatedAt: Date;
    participants: DrawParticipant[];
}
