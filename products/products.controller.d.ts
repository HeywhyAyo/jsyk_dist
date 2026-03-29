import { ProductsService } from './products.service';
import { QueryProductDto } from './dto/createProduct.dto';
export declare class ProductsController {
    private readonly productService;
    constructor(productService: ProductsService);
    findAll(query: QueryProductDto): Promise<{
        data: import("./entities/products.entity").Product[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findBySlug(slug: string): Promise<import("./entities/products.entity").Product>;
    findRelated(id: string): Promise<import("./entities/products.entity").Product[]>;
    findOne(id: string): Promise<import("./entities/products.entity").Product>;
}
