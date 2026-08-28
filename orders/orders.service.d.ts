import { Repository } from 'typeorm';
import { Order } from './entities/orders.entity';
import { OrderStatus } from './enum/order.status';
import { QueryOrderDto } from './dto/orders.dto';
export declare class OrdersService {
    private readonly orderRepo;
    private readonly logger;
    constructor(orderRepo: Repository<Order>);
    getStats(): Promise<{
        totalOrders: number;
        confirmedOrders: number;
        shippedOrders: number;
        deliveredOrders: number;
    }>;
    getOrderStats(): Promise<import("../shared/interfaces/aResponse").aResponse<{
        totalOrders: number;
        confirmedOrders: number;
        shippedOrders: number;
        deliveredOrders: number;
    }> | undefined>;
    findAll(query: QueryOrderDto): Promise<{
        data: Order[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findAllOrders(query: QueryOrderDto): Promise<import("../shared/interfaces/aResponse").aResponse<{
        data: Order[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }> | undefined>;
    findOne(id: string): Promise<Order>;
    findSingleOrderAdmin(id: string): Promise<import("../shared/interfaces/aResponse").aResponse<Order> | undefined>;
    findByOrderNumber(orderNumber: string): Promise<Order>;
    findByOrderNumberAfterPayment(orderNumber: string): Promise<import("../shared/interfaces/aResponse").aResponse<Order> | undefined>;
    findMyOrders(userId: string, page?: number, limit?: number): Promise<{
        data: Order[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findByUserOrders(userId: string, page: number, limit: number): Promise<import("../shared/interfaces/aResponse").aResponse<{
        data: Order[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }> | undefined>;
    findMyOrder(orderId: string, userId: string): Promise<Order>;
    findByUserOrder(orderid: string, userid: string): Promise<import("../shared/interfaces/aResponse").aResponse<Order> | undefined>;
    updateStatus(id: string, status: OrderStatus): Promise<Order>;
    updateOrderStatus(id: string, status: OrderStatus): Promise<import("../shared/interfaces/aResponse").aResponse<Order> | undefined>;
    updatePrintifyTracking(dto: UpdatePrintifyTrackingDto): Promise<void>;
    updatePrintifyStatus(printifyOrderId: string, status: string): Promise<Order | undefined>;
}
