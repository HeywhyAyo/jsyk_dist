import { PrintifyService } from './printify.service';
import { CreatePrintifyProductDto, PrintifyWebhookDto } from './dto/CreatePrintifyProduct.dto';
export declare class PrintifyController {
    private readonly printifyService;
    constructor(printifyService: PrintifyService);
    getBlueprints(): Promise<import("../shared/interfaces/aResponse").aResponse<any>>;
    getPrintProviders(blueprintId: number): Promise<import("../shared/interfaces/aResponse").aResponse<any>>;
    getVariants(blueprintId: number, printProviderId: number): Promise<import("../shared/interfaces/aResponse").aResponse<any>>;
    uploadImage(file: Express.Multer.File): Promise<import("../shared/interfaces/aResponse").aResponse<any> | undefined>;
    createProduct(dto: CreatePrintifyProductDto): Promise<import("../shared/interfaces/aResponse").aResponse<any> | undefined>;
    createWebhook(dto: PrintifyWebhookDto): Promise<any>;
    getArtworks(page: number, limit: number): Promise<import("../shared/interfaces/aResponse").aResponse<any>>;
}
