import { ShippingMethod } from "src/orders/enum/shipment.methods";
export declare const FEEs: {
    STANDARDAMOUNT: number;
    withdrawalPercentage: number;
    maximumAmountsMaxToFund: number;
    maximumAmountsMaxToWithraw: number;
    maximumAmountsMaxToTransfer: number;
};
export declare const SHIPPING_FEES: Record<ShippingMethod, number>;
export declare const TAX_RATE = 0.075;
