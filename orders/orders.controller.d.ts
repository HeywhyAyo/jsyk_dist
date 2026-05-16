import { OrdersService } from './orders.service';
import { CustomRequest } from 'src/shared/interfaces/CustomRequest';
export declare class OrdersController {
    private readonly orderService;
    constructor(orderService: OrdersService);
    findMyOrders(req: CustomRequest, page: number, limit: number): Promise<import("../shared/interfaces/aResponse").aResponse<{
        data: import("./entities/orders.entity").Order[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }> | undefined>;
    findMyOrder(id: string, req: CustomRequest): Promise<import("../shared/interfaces/aResponse").aResponse<import("./entities/orders.entity").Order> | undefined>;
    findByOrderNumber(orderNumber: string): Promise<import("../shared/interfaces/aResponse").aResponse<import("./entities/orders.entity").Order> | undefined>;
}
