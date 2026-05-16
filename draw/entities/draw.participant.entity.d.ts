import { Draw } from './draw.entity';
import { User } from 'src/users/entities/user.entity';
export declare class DrawParticipant {
    id: string;
    draw: Draw;
    drawId: string;
    user: User;
    userId: string;
    isPurchaser: boolean;
    isWinner: boolean;
    scannedAt: Date;
}
