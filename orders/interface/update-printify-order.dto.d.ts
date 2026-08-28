interface UpdatePrintifyTrackingDto {
    printifyOrderId: string;
    status: string;
    carrier?: string;
    trackingNumber?: string;
    trackingUrl?: string;
    shippedAt?: Date;
    deliveredAt?: Date;
}
