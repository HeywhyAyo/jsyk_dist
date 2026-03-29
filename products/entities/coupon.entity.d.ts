import { Order } from 'src/orders/entities/orders.entity';
export declare enum CouponType {
    PERCENTAGE = "PERCENTAGE",
    FIXED_AMOUNT = "FIXED_AMOUNT",
    FREE_SHIPPING = "FREE_SHIPPING"
}
export declare class Coupon {
    id: string;
    code: string;
    description: string;
    type: CouponType;
    value: number;
    minOrderAmount: number;
    maxDiscountAmount: number;
    usageLimit: number;
    perUserLimit: number;
    usageCount: number;
    startsAt: Date;
    expiresAt: Date;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    orders: Order[];
}
