import { CreatePrintifyOrderDto } from './dto/PrintifyOrders.dto';
export declare class PrintifyOrderService {
    private readonly baseUrl;
    private readonly apiKey;
    private readonly PRINTIFY_SHOP_ID;
    constructor();
    private get headers();
    create_Printify_Order(dto: CreatePrintifyOrderDto): Promise<any>;
}
