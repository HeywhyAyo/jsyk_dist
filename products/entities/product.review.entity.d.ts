import { Product } from './products.entity';
import { User } from 'src/users/entities/user.entity';
import { Order } from 'src/orders/entities/orders.entity';
export declare class Review {
    id: string;
    product: Product;
    productId: string;
    user: User;
    userId: string;
    order: Order;
    orderId: string;
    rating: number;
    title: string;
    body: string;
    isVerifiedPurchase: boolean;
    isApproved: boolean;
    createdAt: Date;
    updatedAt: Date;
}
