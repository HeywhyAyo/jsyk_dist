import { ShippingMethod } from 'src/orders/enum/shipment.methods';
export declare class CheckoutItemDto {
    productId: string;
    quantity: number;
}
export declare class CheckoutDto {
    items: CheckoutItemDto[];
    shippingAddressId: string;
    shippingMethod: ShippingMethod;
    couponCode?: string;
    notes?: string;
}
export declare class VisitorCheckoutDto extends CheckoutDto {
    email: string;
    firstName?: string;
    lastName?: string;
}
export declare class CheckoutBreakdownDto {
    subtotal: number;
    discount: number;
    shippingFee: number;
    tax: number;
    total: number;
}
export declare class CheckoutResponseDto {
    paymentUrl: string;
    reference: string;
    orderNumber: string;
    breakdown: CheckoutBreakdownDto;
}
