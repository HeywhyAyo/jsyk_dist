import { Order } from './orders.entity';
import { Product } from 'src/products/entities/products.entity';
export declare class OrderItem {
    id: string;
    order: Order;
    orderId: string;
    product: Product;
    productId: string;
    productName: string;
    sku: string;
    imageUrl: string;
    selectedColor: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    createdAt: Date;
}
