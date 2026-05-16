import { CheckoutService } from './checkout.service';
import { CheckoutDto, VisitorCheckoutDto } from './dto/checkout.dto';
import { CustomRequest } from 'src/shared/interfaces/CustomRequest';
export declare class CheckoutController {
    private readonly checkoutService;
    constructor(checkoutService: CheckoutService);
    checkout(req: CustomRequest, dto: CheckoutDto): Promise<import("../shared/interfaces/aResponse").aResponse<{
        paymentUrl: string | null;
        reference: string;
        orderNumber: string;
        breakdown: {
            subtotal: number;
            discount: number;
            shippingFee: number;
            tax: number;
            total: number;
        };
    }> | undefined>;
    VisitorCheckout(dto: VisitorCheckoutDto): Promise<import("../shared/interfaces/aResponse").aResponse<{
        paymentUrl: string | null;
        reference: string;
        orderNumber: string;
        breakdown: {
            subtotal: number;
            discount: number;
            shippingFee: number;
            tax: number;
            total: number;
        };
    }> | undefined>;
}
