import { AdminService } from './admin.service';
import { ProductsService } from 'src/products/products.service';
import { AddProductImagesDto, CreateProductDto, CreateProductUploadDto, UpdateProductDto } from 'src/products/dto/createProduct.dto';
import { CustomRequest } from 'src/shared/interfaces/CustomRequest';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UsersService } from 'src/users/users.service';
import { ArtistSongService, SongService } from 'src/artist_song/artist_song.service';
import { AttachSongsDto, CreateArtistDto, CreateSongDto, UpdateArtistDto, UpdateSongDto } from 'src/artist_song/dto/artist_song.dto';
import { ReviewService } from 'src/products/product.review.service';
import { UpdateCollectionDto } from 'src/collection/dto/collection.ts.dto';
import { CollectionService } from 'src/collection/collection.service';
import { OrdersService } from 'src/orders/orders.service';
import { OrderStatus } from 'src/orders/enum/order.status';
import { QueryOrderDto } from 'src/orders/dto/orders.dto';
import { DrawService } from 'src/draw/draw.service';
import { CreateDrawDto, UpdateDrawDto } from 'src/draw/dto/draw.dto';
import { DrawStatus } from 'src/draw/entities/draw.entity';
export declare class AdminController {
    private readonly adminService;
    private productService;
    private userService;
    private readonly artistService;
    private readonly songService;
    private readonly reviewService;
    private readonly collectionService;
    private readonly orderService;
    private drawService;
    constructor(adminService: AdminService, productService: ProductsService, userService: UsersService, artistService: ArtistSongService, songService: SongService, reviewService: ReviewService, collectionService: CollectionService, orderService: OrdersService, drawService: DrawService);
    createProduct(dto: CreateProductDto, req: CustomRequest, file: Express.Multer.File[]): Promise<import("../shared/interfaces/aResponse").aResponse<string> | undefined>;
    createProduct_uploadFiles(dto: CreateProductUploadDto, files: {
        image?: Express.Multer.File[];
    }): Promise<import("../shared/interfaces/aResponse").aResponse<string> | undefined>;
    updateProduct(productId: string, dto: UpdateProductDto): Promise<import("../shared/interfaces/aResponse").aResponse<import("../products/entities/products.entity").Product> | undefined>;
    MakeAdmin(createAdminDto: CreateAdminDto): Promise<void>;
    findAllUsers(page?: number, limit?: number, search?: string): Promise<import("../shared/interfaces/aResponse").aResponse<import("../shared/interfaces/pagination").PaginatedResult<import("../users/entities/user.entity").User>> | undefined>;
    getUserDetails(id: string, req: CustomRequest): Promise<import("../shared/interfaces/aResponse").aResponse<import("../users/entities/user.entity").User> | undefined>;
    createNewArtist(dto: CreateArtistDto): Promise<import("../shared/interfaces/aResponse").aResponse<import("../artist_song/entities/artist.entity").Artist> | undefined>;
    updateArtist(dto: UpdateArtistDto): Promise<import("../shared/interfaces/aResponse").aResponse<import("../artist_song/entities/artist.entity").Artist> | undefined>;
    createSong(dto: CreateSongDto): Promise<import("../shared/interfaces/aResponse").aResponse<import("../artist_song/entities/songs.entity").Song> | undefined>;
    updateSongById(dto: UpdateSongDto): Promise<import("../shared/interfaces/aResponse").aResponse<import("../artist_song/entities/songs.entity").Song> | undefined>;
    findByArtist(artistId: string): Promise<import("../shared/interfaces/aResponse").aResponse<import("../artist_song/entities/songs.entity").Song[]> | undefined>;
    attachToProduct(productId: string, dto: AttachSongsDto): Promise<import("../shared/interfaces/aResponse").aResponse<import("../products/entities/products.entity").Product> | undefined>;
    detachFromProduct(productId: string, dto: AttachSongsDto): Promise<import("../shared/interfaces/aResponse").aResponse<import("../products/entities/products.entity").Product> | undefined>;
    removeArtist(artistId: string): Promise<import("../shared/interfaces/aResponse").aResponse<boolean> | undefined>;
    addImages(id: string, dto: AddProductImagesDto, file?: Express.Multer.File[]): Promise<import("../shared/interfaces/aResponse").aResponse<import("../products/entities/products.entity").Product> | undefined>;
    toggleActive(id: string): Promise<import("../shared/interfaces/aResponse").aResponse<{
        isActive: boolean;
    }> | undefined>;
    toggleFeatured(id: string): Promise<import("../shared/interfaces/aResponse").aResponse<{
        isFeatured: boolean;
    }> | undefined>;
    remove(id: string): Promise<import("../shared/interfaces/aResponse").aResponse<boolean> | undefined>;
    getPending(page: number, limit: number): Promise<import("../shared/interfaces/aResponse").aResponse<{
        data: import("../products/entities/product.review.entity").Review[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }> | undefined>;
    adminFindByProduct(productId: string, page: number, limit: number): Promise<import("../shared/interfaces/aResponse").aResponse<{
        data: import("../products/entities/product.review.entity").Review[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }> | undefined>;
    updateCollection(id: string, dto: UpdateCollectionDto): Promise<import("../collection/entities/collection.entity").Collection>;
    approve(id: string): Promise<import("../shared/interfaces/aResponse").aResponse<Promise<import("../products/entities/product.review.entity").Review>> | undefined>;
    adminRemove(id: string): Promise<import("../shared/interfaces/aResponse").aResponse<boolean> | undefined>;
    getStats(): Promise<import("../shared/interfaces/aResponse").aResponse<{
        totalOrders: number;
        confirmedOrders: number;
        shippedOrders: number;
        deliveredOrders: number;
    }> | undefined>;
    findAllOrders(query: QueryOrderDto): Promise<import("../shared/interfaces/aResponse").aResponse<{
        data: import("../orders/entities/orders.entity").Order[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }> | undefined>;
    updateStatus(id: string, status: OrderStatus): Promise<import("../shared/interfaces/aResponse").aResponse<import("../orders/entities/orders.entity").Order> | undefined>;
    findOneOrder(id: string): Promise<import("../shared/interfaces/aResponse").aResponse<import("../orders/entities/orders.entity").Order> | undefined>;
    createDraw(dto: CreateDrawDto): Promise<import("../shared/interfaces/aResponse").aResponse<import("src/draw/entities/draw.entity").Draw> | undefined>;
    findOne(id: string): Promise<import("../shared/interfaces/aResponse").aResponse<import("src/draw/entities/draw.entity").Draw> | undefined>;
    update(id: string, dto: UpdateDrawDto): Promise<import("../shared/interfaces/aResponse").aResponse<import("src/draw/entities/draw.entity").Draw> | undefined>;
    close(id: string): Promise<import("../shared/interfaces/aResponse").aResponse<import("src/draw/entities/draw.entity").Draw> | undefined>;
    conduct(id: string): Promise<import("../shared/interfaces/aResponse").aResponse<{
        draw: import("src/draw/entities/draw.entity").Draw;
        winners: import("../draw/entities/draw.participant.entity").DrawParticipant[];
        summary: {
            totalSold: number;
            totalParticipants: number;
            totalWinners: number;
            buyerWinners: number;
            nonBuyerWinners: number;
        };
    }> | undefined>;
    findAllDraws(status: DrawStatus, page: number, limit: number): Promise<import("../shared/interfaces/aResponse").aResponse<{
        data: any[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }> | undefined>;
}
