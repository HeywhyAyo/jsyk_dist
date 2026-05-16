import { Artist } from "./artist.entity";
import { Product } from "src/products/entities/products.entity";
export declare class Song {
    id: string;
    artist: Artist;
    artistId: string;
    title: string;
    slug: string;
    coverUrl: string;
    releaseYear: number;
    spotifyUrl: string;
    appleMusicUrl: string;
    youtubeMusicUrl: string;
    tidalUrl: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    products: Product[];
}
