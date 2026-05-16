import { ProductCategory } from '../enum/product.category';
import { ProductType } from '../enum/product.types';
import { Gender } from '../enum/gender';
import { MusicCategory } from 'src/collection/enum/muscic.category';
export declare class ProductColorDto {
    name: string;
    hexCode: string;
}
export declare class CreateProductDto {
    name: string;
    sizes?: string[];
    description?: string;
    category: ProductCategory;
    type: ProductType;
    gender: Gender;
    brand: string;
    sku: string;
    price: number;
    compareAtPrice?: number;
    stock: number;
    colors?: ProductColorDto[];
    tagName?: string;
    tagSlug?: string;
    isFeatured?: boolean;
    collectionId: string;
    musicCategory: MusicCategory;
}
export declare class CreateProductDataDto extends CreateProductDto {
}
declare const UpdateProductDto_base: import("@nestjs/common").Type<Partial<CreateProductDto>>;
export declare class UpdateProductDto extends UpdateProductDto_base {
    isActive?: boolean;
    product_id: string;
}
export declare class AddProductImagesDto {
    urls?: string[] | null | undefined;
}
export declare class RemoveProductImageDto {
    url: string;
}
export declare class QueryProductDto {
    search?: string;
    category?: ProductCategory;
    type?: ProductType;
    gender?: Gender;
    brand?: string;
    tagSlug?: string;
    minPrice?: number;
    maxPrice?: number;
    isFeatured?: boolean;
    inStock?: boolean;
    sortBy?: 'price' | 'createdAt' | 'name' | 'stock';
    sortOrder?: 'ASC' | 'DESC';
    page?: number;
    limit?: number;
}
export declare class CreateProductUploadDto {
    productId: string;
    videolink: string;
}
export {};
