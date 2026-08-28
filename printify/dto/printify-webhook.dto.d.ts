export declare class PrintifyCarrierDto {
    code: string;
    tracking_number: string;
    tracking_url?: string;
}
export declare class PrintifyShipmentDataDto {
    shop_id: number;
    shipped_at?: string;
    delivered_at?: string;
    carrier: PrintifyCarrierDto;
    skus: string[];
}
export declare class PrintifyWebhookResourceDto {
    id: string;
    type: string;
    data: PrintifyShipmentDataDto;
}
export declare class PrintifyWebhookDto {
    id: string;
    type: 'order:shipment:created' | 'order:shipment:delivered' | 'order:updated' | string;
    created_at: string;
    resource: PrintifyWebhookResourceDto;
}
