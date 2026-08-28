export declare class PrintifyOrderLineItemDto {
    productId: string;
    variantId: number;
    quantity: number;
    externalId?: string;
}
export declare class PrintifyAddressDto {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    address1: string;
    address2?: string;
    city: string;
    region?: string;
    zip: string;
    country: string;
}
export declare class CreatePrintifyOrderDto {
    externalId: string;
    label?: string;
    lineItems: PrintifyOrderLineItemDto[];
    shippingMethod: number;
    sendShippingNotification?: boolean;
    address: PrintifyAddressDto;
}
