import { ProductsService } from './products.service';
import { QueryProductDto } from './dto/createProduct.dto';
import { SongService } from 'src/artist_song/artist_song.service';
export declare class ProductsController {
    private readonly productService;
    private readonly songService;
    constructor(productService: ProductsService, songService: SongService);
    findAll(query: QueryProductDto): Promise<import("../shared/interfaces/aResponse").aResponse<{
        data: import("./entities/products.entity").Product[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }> | undefined>;
    getFilters(query: QueryProductDto): Promise<import("../shared/interfaces/aResponse").aResponse<{
        categories: string[];
        types: string[];
        genders: string[];
        brands: {
            id: string;
            name: string;
        }[];
        priceRange: {
            min: number;
            max: number;
        };
    }>>;
    getProductSongs(productId: string): Promise<import("../shared/interfaces/aResponse").aResponse<import("../artist_song/entities/songs.entity").Song[]> | undefined>;
    findBySlug(slug: string): Promise<import("../shared/interfaces/aResponse").aResponse<import("./entities/products.entity").Product> | undefined>;
    findRelated(id: string): Promise<import("../shared/interfaces/aResponse").aResponse<import("./entities/products.entity").Product[]> | undefined>;
    findOne(id: string): Promise<import("../shared/interfaces/aResponse").aResponse<import("./entities/products.entity").Product> | undefined>;
}
