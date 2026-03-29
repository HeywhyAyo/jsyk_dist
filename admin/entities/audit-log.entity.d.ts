import { User } from '../../users/entities/user.entity';
export declare class AuditLog {
    id: string;
    user: User;
    userId: string;
    action: string;
    resourceType: string;
    resourceId?: string;
    details?: Record<string, any>;
    timestamp: Date;
}
