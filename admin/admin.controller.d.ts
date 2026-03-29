import { AdminService } from './admin.service';
import { ProductsService } from 'src/products/products.service';
import { AddProductImagesDto, CreateProductDto, UpdateProductDto } from 'src/products/dto/createProduct.dto';
import { CustomRequest } from 'src/shared/interfaces/CustomRequest';
export declare class AdminController {
    private readonly adminService;
    private productService;
    constructor(adminService: AdminService, productService: ProductsService);
    create(dto: CreateProductDto, req: CustomRequest, file: Express.Multer.File[]): Promise<import("../shared/interfaces/aResponse").aResponse<string> | undefined>;
    update(dto: UpdateProductDto): Promise<import("../products/entities/products.entity").Product>;
    addImages(id: string, dto: AddProductImagesDto): Promise<import("../products/entities/products.entity").Product>;
    toggleActive(id: string): Promise<{
        isActive: boolean;
    }>;
    toggleFeatured(id: string): Promise<{
        isFeatured: boolean;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
