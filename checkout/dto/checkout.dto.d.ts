import { ShippingMethod } from 'src/orders/enum/shipment.methods';
export declare class CheckoutItemDto {
    productId: string;
    quantity: number;
    selectedColor?: string;
}
export declare class CheckoutDto {
    items: CheckoutItemDto[];
    shippingAddressId: string;
    shippingMethod: ShippingMethod;
    couponCode?: string;
    notes?: string;
}
export declare class VisitorCheckoutDto {
    email: string;
    items: CheckoutItemDto[];
    shippingMethod: ShippingMethod;
    couponCode?: string;
    notes?: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
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
