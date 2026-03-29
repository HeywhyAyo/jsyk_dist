import { Order } from 'src/orders/entities/orders.entity';
import { PaymentGateway, PaymentMethod, PaymentStatus } from '../enums/payment.enums';
export declare class Payment {
    id: string;
    order: Order;
    orderId: string;
    method: PaymentMethod;
    status: PaymentStatus;
    gateway: PaymentGateway;
    amount: number;
    refundedAmount: number;
    currency: string;
    transactionId: string;
    metadata: Record<string, any>;
    paidAt: Date;
    refundedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
