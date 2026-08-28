import { CreatePrintifyProductDto } from './dto/CreatePrintifyProduct.dto';
export declare class PrintifyService {
    private readonly baseUrl;
    private readonly apiKey;
    private readonly PRINTIFY_SHOP_ID;
    private readonly PRINTIFY_WEBHOOK_SECRET;
    constructor();
    private get headers();
    upload_Artwork_to_printify(file: Express.Multer.File): Promise<import("../shared/interfaces/aResponse").aResponse<any> | undefined>;
    create_product_in_printify(dto: CreatePrintifyProductDto): Promise<import("../shared/interfaces/aResponse").aResponse<any> | undefined>;
    get_printify_blueprints(): Promise<import("../shared/interfaces/aResponse").aResponse<any>>;
    get_printify_print_providers(blueprintId: number): Promise<import("../shared/interfaces/aResponse").aResponse<any>>;
    get_printify_artworks(page?: number, limit?: number): Promise<import("../shared/interfaces/aResponse").aResponse<any>>;
    get_printify_variants(blueprintId: number, printProviderId: number): Promise<import("../shared/interfaces/aResponse").aResponse<any>>;
    private getArtworks;
    private getBlueprints;
    private getPrintProviders;
    private getVariants;
    private uploadLocalImage;
    private uploadImage;
    private createProduct;
    createWebhook(topic: string, url: string): Promise<any>;
}
