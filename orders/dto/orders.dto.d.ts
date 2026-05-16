import { OrderStatus } from '../enum/order.status';
export declare class QueryOrderDto {
    search?: string;
    status?: OrderStatus;
    from?: string;
    to?: string;
    page?: number;
    limit?: number;
}
