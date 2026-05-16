import { Repository } from 'typeorm';
import { Order } from '../orders/entities/orders.entity';
import { OrderItem } from '../orders/entities/order_item.entity';
import { Payment } from '../payments/entities/payment.entity';
import { Address } from '../users/entities/address.entity';
import { Coupon } from '../products/entities/coupon.entity';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from '../products/products.service';
import { CheckoutDto, VisitorCheckoutDto } from './dto/checkout.dto';
import Stripe from 'stripe';
export declare class CheckoutService {
    private readonly orderRepo;
    private readonly orderItemRepo;
    private readonly paymentRepo;
    private readonly addressRepo;
    private readonly couponRepo;
    private readonly productService;
    private readonly userService;
    private readonly logger;
    private STRIPE_API_KEY;
    private STRIPE_SUCCESS_URL;
    private STRIPE_CANCEL_URL;
    constructor(orderRepo: Repository<Order>, orderItemRepo: Repository<OrderItem>, paymentRepo: Repository<Payment>, addressRepo: Repository<Address>, couponRepo: Repository<Coupon>, productService: ProductsService, userService: UsersService);
    checkout(userId: string, dto: CheckoutDto): Promise<import("../shared/interfaces/aResponse").aResponse<{
        paymentUrl: string | null;
        reference: string;
        orderNumber: string;
        breakdown: {
            subtotal: number;
            discount: number;
            shippingFee: number;
            tax: number;
            total: number;
        };
    }> | undefined>;
    stripe_checkout(email: string, amount: number, reference: string, userId: string, orderId: string, orderNumber: string): Promise<Stripe.Response<Stripe.Checkout.Session>>;
    visitor_checkout(dto: VisitorCheckoutDto): Promise<import("../shared/interfaces/aResponse").aResponse<{
        paymentUrl: string | null;
        reference: string;
        orderNumber: string;
        breakdown: {
            subtotal: number;
            discount: number;
            shippingFee: number;
            tax: number;
            total: number;
        };
    }> | undefined>;
    private initializePaystackTransaction;
    private validateCoupon;
    private calculateDiscount;
    private generateOrderNumber;
}
