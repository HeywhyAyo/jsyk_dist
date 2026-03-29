import { Repository } from 'typeorm';
import { Payment } from 'src/payments/entities/payment.entity';
import { Order } from '../orders/entities/orders.entity';
import { ProductsService } from '../products/products.service';
export declare class WebhooksService {
    private readonly paymentRepo;
    private readonly orderRepo;
    private readonly productService;
    private readonly logger;
    constructor(paymentRepo: Repository<Payment>, orderRepo: Repository<Order>, productService: ProductsService);
    handleEvent(event: Record<string, any>): Promise<void>;
    handleChargeSuccess(data: Record<string, any>): Promise<void>;
    handleChargeFailed(data: Record<string, any>): Promise<void>;
    handleRefundProcessed(data: Record<string, any>): Promise<void>;
}
