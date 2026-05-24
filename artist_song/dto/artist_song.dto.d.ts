import { ArtistCategory } from '../interface/artist_category';
export declare class CreateArtistDto {
    name: string;
    bio?: string;
    imageUrl?: string;
    isVerified?: boolean;
    isActive?: boolean;
    facebook?: string;
    instagram?: string;
    twitter?: string;
    category?: ArtistCategory;
}
export declare class UpdateArtistDto {
    name?: string;
    artistId: string;
    bio?: string;
    imageUrl?: string;
    isActive?: boolean;
    isVerified?: boolean;
    facebook?: string;
    instagram?: string;
    twitter?: string;
}
export declare class CreateSongDto {
    artistId: string;
    title: string;
    coverUrl?: string;
    releaseYear?: number;
    spotifyUrl?: string;
    appleMusicUrl?: string;
    youtubeMusicUrl?: string;
    tidalUrl?: string;
}
export declare class UpdateSongDto {
    title?: string;
    songId: string;
    coverUrl?: string;
    releaseYear?: number;
    spotifyUrl?: string;
    appleMusicUrl?: string;
    youtubeMusicUrl?: string;
    tidalUrl?: string;
    isActive?: boolean;
}
export declare class AttachSongsDto {
    songIds: string[];
    requiresQrcode?: boolean;
}
