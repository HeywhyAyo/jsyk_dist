import { ArtistSongService } from './artist_song.service';
export declare class ArtistSongController {
    private readonly artistSongService;
    constructor(artistSongService: ArtistSongService);
    findAll(page?: string, limit?: string, search?: string): Promise<import("../shared/interfaces/aResponse").aResponse<import("../shared/interfaces/pagination").PaginatedResult<import("./entities/artist.entity").Artist>> | undefined>;
    find_All_with_Songs(page?: string, limit?: string, search?: string): Promise<import("../shared/interfaces/aResponse").aResponse<import("../shared/interfaces/pagination").PaginatedResult<import("./entities/artist.entity").Artist>> | undefined>;
    findOne(id: string): Promise<import("../shared/interfaces/aResponse").aResponse<import("./entities/artist.entity").Artist> | undefined>;
    findBySlug(slug: string): Promise<import("../shared/interfaces/aResponse").aResponse<import("./entities/artist.entity").Artist> | undefined>;
}
