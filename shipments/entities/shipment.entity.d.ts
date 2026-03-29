import { Order } from 'src/orders/entities/orders.entity';
import { ShippingMethod } from 'src/orders/enum/shipment.methods';
import { Carrier, ShipmentStatus } from '../enums/shipments.enums';
export declare class Shipment {
    id: string;
    order: Order;
    orderId: string;
    status: ShipmentStatus;
    shippingMethod: ShippingMethod;
    carrier: Carrier;
    trackingNumber: string;
    trackingUrl: string;
    estimatedDelivery: Date;
    shippedAt: Date;
    deliveredAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
