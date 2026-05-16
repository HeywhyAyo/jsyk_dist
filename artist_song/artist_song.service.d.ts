import { Repository } from 'typeorm';
import { CreateArtistDto, UpdateArtistDto, CreateSongDto, UpdateSongDto } from './dto/artist_song.dto';
import { Artist } from './entities/artist.entity';
import { Song } from './entities/songs.entity';
import { Product } from 'src/products/entities/products.entity';
import { PaginatedResult } from 'src/shared/interfaces/pagination';
import { Collection } from 'src/collection/entities/collection.entity';
export declare class ArtistSongService {
    private readonly artistRepo;
    private readonly collectionRepo;
    constructor(artistRepo: Repository<Artist>, collectionRepo: Repository<Collection>);
    create_artist(dto: CreateArtistDto): Promise<import("../shared/interfaces/aResponse").aResponse<Artist> | undefined>;
    findAll(page?: number, limit?: number, search?: string): Promise<PaginatedResult<Artist>>;
    find_All_with_Songs(page?: number, limit?: number, search?: string): Promise<PaginatedResult<Artist>>;
    find_all_artist(page?: number, limit?: number, search?: string): Promise<import("../shared/interfaces/aResponse").aResponse<PaginatedResult<Artist>> | undefined>;
    find_all_artist_with_songs(page?: number, limit?: number, search?: string): Promise<import("../shared/interfaces/aResponse").aResponse<PaginatedResult<Artist>> | undefined>;
    findOne(id: string): Promise<Artist>;
    find_One_artist(id: string): Promise<import("../shared/interfaces/aResponse").aResponse<Artist> | undefined>;
    findBySlug(slug: string): Promise<import("../shared/interfaces/aResponse").aResponse<Artist> | undefined>;
    updateArtistInfo(id: string, dto: UpdateArtistDto): Promise<import("../shared/interfaces/aResponse").aResponse<Artist> | undefined>;
    removeArtist(id: string): Promise<import("../shared/interfaces/aResponse").aResponse<boolean> | undefined>;
    findOneAdmin(id: string): Promise<Artist>;
    create(dto: CreateArtistDto): Promise<Artist>;
    update(id: string, dto: UpdateArtistDto): Promise<Artist>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
export declare class SongService {
    private readonly songRepo;
    private readonly artistRepo;
    private readonly productRepo;
    private readonly collectionRepo;
    constructor(songRepo: Repository<Song>, artistRepo: Repository<Artist>, productRepo: Repository<Product>, collectionRepo: Repository<Collection>);
    create(dto: CreateSongDto): Promise<import("../shared/interfaces/aResponse").aResponse<Song> | undefined>;
    findByArtist(artistId: string): Promise<import("../shared/interfaces/aResponse").aResponse<Song[]> | undefined>;
    findOne(id: string): Promise<Song>;
    update(id: string, dto: UpdateSongDto): Promise<import("../shared/interfaces/aResponse").aResponse<Song> | undefined>;
    remove(id: string): Promise<{
        message: string;
    }>;
    attachToProduct(productId: string, songIds: string[], requiresQrcode?: boolean): Promise<import("../shared/interfaces/aResponse").aResponse<Product> | undefined>;
    detachFromProduct(productId: string, songIds: string[]): Promise<import("../shared/interfaces/aResponse").aResponse<Product> | undefined>;
    getProductSongs(productId: string): Promise<import("../shared/interfaces/aResponse").aResponse<Song[]> | undefined>;
}
