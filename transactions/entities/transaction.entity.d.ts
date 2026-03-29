import { User } from '../../users/entities/user.entity';
export declare class Transaction {
    id: string;
    amount: number;
    status: 'pending' | 'completed' | 'failed';
    type: string;
    description: string;
    createdAt: Date;
    userId: string;
    user: User;
}
