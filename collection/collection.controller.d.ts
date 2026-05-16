import { CollectionService } from './collection.service';
import { CollectionCreationDto } from './dto/collection.ts.dto';
export declare class CollectionController {
    private readonly collectionService;
    constructor(collectionService: CollectionService);
    createNewCollection(dto: CollectionCreationDto): Promise<import("../shared/interfaces/aResponse").aResponse<string> | undefined>;
    findAll(page: number, limit: number): Promise<import("../shared/interfaces/aResponse").aResponse<{
        data: any[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }> | undefined>;
    getProducts(id: string, page: number, limit: number, search?: string, status?: string, musicCategory?: string): Promise<import("../shared/interfaces/aResponse").aResponse<{
        data: import("../products/entities/products.entity").Product[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }> | undefined>;
    findByArtist(artistId: string): Promise<import("../shared/interfaces/aResponse").aResponse<import("./entities/collection.entity").Collection> | undefined>;
    findOne(id: string): Promise<import("../shared/interfaces/aResponse").aResponse<{
        collection: import("./entities/collection.entity").Collection;
        stats: {
            totalProducts: number;
            productsSold: number;
            revenue: number;
            outOfStock: number;
        };
    }> | undefined>;
}
