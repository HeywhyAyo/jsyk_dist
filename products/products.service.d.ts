import { Repository } from 'typeorm';
import { Product } from './entities/products.entity';
import { CreateProductDto, UpdateProductDto, QueryProductDto, AddProductImagesDto, RemoveProductImageDto } from './dto/createProduct.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { PrintifyProductDetailsDto } from 'src/printify/dto/PrintifyProductDetails.dto';
export declare class ProductsService {
    private readonly productRepo;
    private readonly usersService;
    constructor(productRepo: Repository<Product>, usersService: UsersService);
    createProduct(dto: CreateProductDto, files: string[], createdBy: User): Promise<Product>;
    uploadMultipleImages(files: Express.Multer.File[]): Promise<string[] | null>;
    uploadSingleImage(file: Express.Multer.File): Promise<string | null>;
    create_product_async(dto: CreateProductDto, files: Express.Multer.File[], userId: string): Promise<import("../shared/interfaces/aResponse").aResponse<string> | undefined>;
    create_product_upload_async(productid: string, image?: Express.Multer.File, videolink?: string): Promise<import("../shared/interfaces/aResponse").aResponse<string> | undefined>;
    findAllforMarketplace(query: QueryProductDto): Promise<{
        data: Product[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    find_all_for_marketplace(query: QueryProductDto): Promise<import("../shared/interfaces/aResponse").aResponse<{
        data: Product[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }> | undefined>;
    findOne(id: string): Promise<Product>;
    find_One_product(id: string): Promise<import("../shared/interfaces/aResponse").aResponse<Product> | undefined>;
    findBySlug(slug: string): Promise<Product>;
    find_One_product_by_slug(slug: string): Promise<import("../shared/interfaces/aResponse").aResponse<Product> | undefined>;
    update(id: string, dto: UpdateProductDto): Promise<Product>;
    update_product(id: string, dto: UpdateProductDto): Promise<import("../shared/interfaces/aResponse").aResponse<Product> | undefined>;
    update_product_of_printify(id: string, dto: PrintifyProductDetailsDto): Promise<import("../shared/interfaces/aResponse").aResponse<Product> | undefined>;
    addImagesToProduct(id: string, dto: AddProductImagesDto, files?: Express.Multer.File[]): Promise<import("../shared/interfaces/aResponse").aResponse<Product> | undefined>;
    removeImage(id: string, dto: RemoveProductImageDto): Promise<Product>;
    toggleActive(id: string): Promise<import("../shared/interfaces/aResponse").aResponse<{
        isActive: boolean;
    }> | undefined>;
    toggleFeatured(id: string): Promise<import("../shared/interfaces/aResponse").aResponse<{
        isFeatured: boolean;
    }> | undefined>;
    decrementStock(id: string, quantity: number): Promise<void>;
    incrementStock(id: string, quantity: number): Promise<void>;
    findRelated(id: string, limit?: number): Promise<import("../shared/interfaces/aResponse").aResponse<Product[]> | undefined>;
    removeProduct(id: string): Promise<import("../shared/interfaces/aResponse").aResponse<boolean> | undefined>;
    findOneProductByAdmin(id: string): Promise<Product>;
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
    get_filters_for_marketplace(): Promise<import("../shared/interfaces/aResponse").aResponse<{
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
