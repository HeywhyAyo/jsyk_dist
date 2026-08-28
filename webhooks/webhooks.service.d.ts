import { Repository } from 'typeorm';
import { Payment } from 'src/payments/entities/payment.entity';
import { Order } from '../orders/entities/orders.entity';
import { OrdersService } from '../orders/orders.service';
import { ProductsService } from '../products/products.service';
import { UsersService } from 'src/users/users.service';
import { PrintifyWebhookDto } from 'src/printify/dto/printify-webhook.dto';
import { PrintifyOrderService } from 'src/printify/printify-order.service';
export declare class WebhooksService {
    private readonly paymentRepo;
    private readonly orderRepo;
    private readonly orderService;
    private readonly productService;
    private readonly usersService;
    private readonly printifyOrderService;
    private readonly logger;
    private readonly PRINTIFY_WEBHOOK_SECRET;
    constructor(paymentRepo: Repository<Payment>, orderRepo: Repository<Order>, orderService: OrdersService, productService: ProductsService, usersService: UsersService, printifyOrderService: PrintifyOrderService);
    handleEvent(event: Record<string, any>): Promise<void>;
    handleChargeSuccess(data: Record<string, any>): Promise<void>;
    handleChargeFailed(data: Record<string, any>): Promise<void>;
    handleRefundProcessed(data: Record<string, any>): Promise<void>;
    private purchaseEailSender;
    verifySignature(rawBody: Buffer | undefined, signature: string): void;
    handle_Printify_Webhook(payload: PrintifyWebhookDto): Promise<void>;
    private handleShipmentCreated;
    private handleShipmentDelivered;
    private handleOrderUpdated;
}
