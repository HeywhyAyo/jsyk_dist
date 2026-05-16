import { Repository } from 'typeorm';
import { Collection } from './entities/collection.entity';
import { Product } from 'src/products/entities/products.entity';
import { Artist } from 'src/artist_song/entities/artist.entity';
import { CollectionCreationDto, UpdateCollectionDto } from './dto/collection.ts.dto';
export declare class CollectionService {
    private readonly collectionRepo;
    private readonly productRepo;
    private readonly artistRepo;
    constructor(collectionRepo: Repository<Collection>, productRepo: Repository<Product>, artistRepo: Repository<Artist>);
    create_collection(dto: CollectionCreationDto): Promise<import("../shared/interfaces/aResponse").aResponse<string> | undefined>;
    findAll(page?: number, limit?: number): Promise<{
        data: any[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findAllCollections(page: number, limit: number): Promise<import("../shared/interfaces/aResponse").aResponse<{
        data: any[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }> | undefined>;
    findOne(id: string): Promise<{
        collection: Collection;
        stats: {
            totalProducts: number;
            productsSold: number;
            revenue: number;
            outOfStock: number;
        };
    }>;
    lookupSingleCollection(id: string): Promise<import("../shared/interfaces/aResponse").aResponse<{
        collection: Collection;
        stats: {
            totalProducts: number;
            productsSold: number;
            revenue: number;
            outOfStock: number;
        };
    }> | undefined>;
    getProducts(collectionId: string, page?: number, limit?: number, search?: string, status?: string, musicCategory?: string): Promise<{
        data: Product[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getProductsInCollection(collectionId: string, page: number, limit: number, search?: string, status?: string, musicCategory?: string): Promise<import("../shared/interfaces/aResponse").aResponse<{
        data: Product[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }> | undefined>;
    update(id: string, dto: UpdateCollectionDto): Promise<Collection>;
    findByArtist(artistId: string): Promise<import("../shared/interfaces/aResponse").aResponse<Collection> | undefined>;
}
