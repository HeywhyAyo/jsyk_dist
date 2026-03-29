import { User } from '../../users/entities/user.entity';
export declare class Wallet {
    id: string;
    balance: number;
    currency: string;
    lastUsedFacility: string;
    lastUsedDate: Date | null;
    userId: string;
    last_funding_date: Date | null;
    isLocked: boolean;
    user: User;
    createdAt: Date;
    updatedAt: Date;
}
