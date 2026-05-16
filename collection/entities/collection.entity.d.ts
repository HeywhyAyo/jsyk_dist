import { Artist } from 'src/artist_song/entities/artist.entity';
import { Product } from 'src/products/entities/products.entity';
export declare enum CollectionStatus {
    ACTIVE = "ACTIVE",
    NEW = "NEW",
    INACTIVE = "INACTIVE"
}
export declare class Collection {
    id: string;
    artist: Artist;
    artistId: string;
    name: string;
    description: string;
    coverImageUrl: string;
    status: CollectionStatus;
    createdAt: Date;
    updatedAt: Date;
    products: Product[];
}
