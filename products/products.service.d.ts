import { Repository } from 'typeorm';
import { Product } from './entities/products.entity';
import { CreateProductDto, UpdateProductDto, QueryProductDto, AddProductImagesDto, RemoveProductImageDto } from './dto/createProduct.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
export declare class ProductsService {
    private readonly productRepo;
    private readonly usersService;
    constructor(productRepo: Repository<Product>, usersService: UsersService);
    create(dto: CreateProductDto, files: string[], createdBy: User): Promise<Product>;
    uploadMultipleImages(files: Express.Multer.File[]): Promise<string[] | null>;
    create_product_async(dto: CreateProductDto, files: Express.Multer.File[], userId: string): Promise<import("../shared/interfaces/aResponse").aResponse<string> | undefined>;
    findAll(query: QueryProductDto): Promise<{
        data: Product[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<Product>;
    findBySlug(slug: string): Promise<Product>;
    update(id: string, dto: UpdateProductDto): Promise<Product>;
    addImages(id: string, dto: AddProductImagesDto): Promise<Product>;
    removeImage(id: string, dto: RemoveProductImageDto): Promise<Product>;
    toggleActive(id: string): Promise<{
        isActive: boolean;
    }>;
    toggleFeatured(id: string): Promise<{
        isFeatured: boolean;
    }>;
    decrementStock(id: string, quantity: number): Promise<void>;
    incrementStock(id: string, quantity: number): Promise<void>;
    findRelated(id: string, limit?: number): Promise<Product[]>;
    remove(id: string): Promise<{
        message: string;
    }>;
    findOneAdmin(id: string): Promise<Product>;
    private generateUniqueSlug;
    getFilters(): Promise<{
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
    }>;
    getFeatured(limit?: number): Promise<Product[]>;
    getNewArrivals(limit?: number): Promise<Product[]>;
    getOnSale(page?: number, limit?: number): Promise<{
        data: Product[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
}
