import { Song } from './songs.entity';
import { ArtistCategory } from '../interface/artist_category';
import { Collection } from 'src/collection/entities/collection.entity';
export declare class Artist {
    id: string;
    name: string;
    slug: string;
    bio: string;
    imageUrl: string;
    isVerified: boolean;
    isActive: boolean;
    facebook: string;
    instagram: string;
    twitter: string;
    category: ArtistCategory;
    createdAt: Date;
    updatedAt: Date;
    songs: Song[];
    collection: Collection;
}
