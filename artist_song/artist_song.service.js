"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SongService = exports.ArtistSongService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const slugify_util_1 = require("../shared/utilities/slugify.util");
const artist_entity_1 = require("./entities/artist.entity");
const songs_entity_1 = require("./entities/songs.entity");
const products_entity_1 = require("../products/entities/products.entity");
const apiResponse_1 = require("../shared/utilities/apiResponse");
const rethrow_exception_1 = require("../shared/utilities/rethrow-exception");
const collection_entity_1 = require("../collection/entities/collection.entity");
let ArtistSongService = class ArtistSongService {
    artistRepo;
    collectionRepo;
    constructor(artistRepo, collectionRepo) {
        this.artistRepo = artistRepo;
        this.collectionRepo = collectionRepo;
    }
    async create_artist(dto) {
        try {
            if (!dto.name) {
                throw new common_1.HttpException((0, apiResponse_1.createUnSuccessfulResponse)('Artist name is required.'), common_1.HttpStatus.BAD_REQUEST);
            }
            const createdArtist = await this.create(dto);
            return (0, apiResponse_1.createResponse)(true, 'Artist created successfully.', createdArtist);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async findAll(page = 1, limit = 10, search) {
        const skip = (page - 1) * limit;
        const whereCondition = {
            isActive: true,
            ...(search
                ? { name: (0, typeorm_2.ILike)(`%${search}%`) }
                : {}),
        };
        const [items, total] = await this.artistRepo.findAndCount({
            where: whereCondition,
            skip,
            take: limit,
            order: { name: 'ASC' },
        });
        return {
            data: items,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async find_All_with_Songs(page = 1, limit = 10, search) {
        const skip = (page - 1) * limit;
        const whereCondition = {
            isActive: true,
            ...(search
                ? { name: (0, typeorm_2.ILike)(`%${search}%`) }
                : {}),
        };
        const [items, total] = await this.artistRepo.findAndCount({
            where: whereCondition,
            skip,
            take: limit,
            order: { name: 'ASC' },
            relations: { songs: true },
        });
        return {
            data: items,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async find_all_artist(page = 1, limit = 10, search) {
        try {
            const artists = await this.findAll(page, limit, search);
            return (0, apiResponse_1.createResponse)(true, 'Artists retrieved successfully.', artists);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async find_all_artist_with_songs(page = 1, limit = 10, search) {
        try {
            const artists = await this.find_All_with_Songs(page, limit, search);
            return (0, apiResponse_1.createResponse)(true, 'Artists retrieved successfully with songs.', artists);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async findOne(id) {
        const artist = await this.artistRepo.findOne({
            where: { id, isActive: true },
            relations: { songs: true },
        });
        if (!artist)
            throw new common_1.HttpException((0, apiResponse_1.createUnSuccessfulResponse)(`Artist #${id} not found.`), common_1.HttpStatus.BAD_REQUEST);
        return artist;
    }
    async find_One_artist(id) {
        try {
            const artist = await this.findOne(id);
            return (0, apiResponse_1.createResponse)(true, 'Artist retrieved successfully.', artist);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async findBySlug(slug) {
        try {
            const artist = await this.artistRepo.findOne({
                where: { slug, isActive: true },
                relations: { songs: true },
            });
            if (!artist)
                throw new common_1.HttpException((0, apiResponse_1.createUnSuccessfulResponse)(`Artist #${slug} not found.`), common_1.HttpStatus.BAD_REQUEST);
            return (0, apiResponse_1.createResponse)(true, 'Artist found.', artist);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async updateArtistInfo(id, dto) {
        try {
            const artist = await this.findOneAdmin(id);
            if (dto.name && dto.name !== artist.name) {
                const newSlug = (0, slugify_util_1.slugify)(dto.name);
                const exists = await this.artistRepo.existsBy({ slug: newSlug });
                if (exists) {
                    const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(`Artist name "${dto.name}" is already in use.`);
                    throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
                }
                artist.slug = newSlug;
            }
            Object.assign(artist, dto);
            const result = await this.artistRepo.save(artist);
            return (0, apiResponse_1.createResponse)(true, 'Artist updated successfully.', result);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async removeArtist(id) {
        try {
            const artist = await this.findOneAdmin(id);
            await this.artistRepo.remove(artist);
            return (0, apiResponse_1.createResponse)(true, `Artist "${artist.name}" has been deleted.`, true);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async findOneAdmin(id) {
        const artist = await this.artistRepo.findOneBy({ id });
        if (!artist)
            throw new common_1.HttpException((0, apiResponse_1.createUnSuccessfulResponse)(`Artist #${id} not found.`), common_1.HttpStatus.BAD_REQUEST);
        return artist;
    }
    async create(dto) {
        const slug = (0, slugify_util_1.slugify)(dto.name);
        const exists = await this.artistRepo.existsBy({ slug });
        if (exists) {
            const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(`Artist "${dto.name}" already exists.`);
            throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
        }
        const artist = this.artistRepo.create({ ...dto, slug });
        const savedArtist = await this.artistRepo.save(artist);
        const collection = this.collectionRepo.create({
            artistId: savedArtist.id,
            name: `${savedArtist.name} Collection`,
            status: collection_entity_1.CollectionStatus.NEW,
        });
        await this.collectionRepo.save(collection);
        return savedArtist;
    }
    async update(id, dto) {
        const artist = await this.findOneAdmin(id);
        if (dto.name && dto.name !== artist.name) {
            const newSlug = (0, slugify_util_1.slugify)(dto.name);
            const exists = await this.artistRepo.existsBy({ slug: newSlug });
            if (exists) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(`Artist "${dto.name}" already exists.`);
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            artist.slug = newSlug;
            await this.collectionRepo.update({ artistId: artist.id }, { name: `${dto.name} Collection` });
        }
        Object.assign(artist, dto);
        return this.artistRepo.save(artist);
    }
    async remove(id) {
        const artist = await this.findOneAdmin(id);
        await this.artistRepo.remove(artist);
        return { message: `Artist "${artist.name}" and their collection have been deleted.` };
    }
};
exports.ArtistSongService = ArtistSongService;
exports.ArtistSongService = ArtistSongService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(artist_entity_1.Artist)),
    __param(1, (0, typeorm_1.InjectRepository)(collection_entity_1.Collection)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ArtistSongService);
let SongService = class SongService {
    songRepo;
    artistRepo;
    productRepo;
    collectionRepo;
    constructor(songRepo, artistRepo, productRepo, collectionRepo) {
        this.songRepo = songRepo;
        this.artistRepo = artistRepo;
        this.productRepo = productRepo;
        this.collectionRepo = collectionRepo;
    }
    async create(dto) {
        try {
            const artist = await this.artistRepo.findOneBy({ id: dto.artistId });
            if (!artist) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(`Artist #${dto.artistId} not found.`);
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const slug = (0, slugify_util_1.slugify)(`${artist.name}-${dto.title}`);
            const exists = await this.songRepo.existsBy({ slug });
            if (exists) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(`A song titled "${dto.title}" by ${artist.name} already exists.`);
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.CONFLICT);
            }
            const song = this.songRepo.create({ ...dto, slug });
            const result = await this.songRepo.save(song);
            return (0, apiResponse_1.createResponse)(true, 'Song created successfully.', result);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async findByArtist(artistId) {
        try {
            const result = await this.songRepo.find({
                where: { artistId, isActive: true },
                relations: { artist: true },
                order: { releaseYear: 'DESC' },
            });
            return (0, apiResponse_1.createResponse)(true, 'Songs retrieved successfully.', result);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async findOne(id) {
        const song = await this.songRepo.findOne({
            where: { id },
            relations: { artist: true },
        });
        if (!song)
            throw new common_1.HttpException((0, apiResponse_1.createUnSuccessfulResponse)(`Song #${id} not found.`), common_1.HttpStatus.NOT_FOUND);
        return song;
    }
    async update(id, dto) {
        try {
            const song = await this.findOne(id);
            Object.assign(song, dto);
            const result = await this.songRepo.save(song);
            return (0, apiResponse_1.createResponse)(true, 'Song updated successfully.', result);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async remove(id) {
        const song = await this.findOne(id);
        await this.songRepo.remove(song);
        return { message: `Song "${song.title}" has been deleted.` };
    }
    async attachToProduct(productId, songIds, requiresQrcode) {
        try {
            const product = await this.productRepo.findOne({
                where: { id: productId },
                relations: { songs: true },
            });
            if (!product)
                throw new common_1.HttpException((0, apiResponse_1.createUnSuccessfulResponse)(`Product #${productId} not found.`), common_1.HttpStatus.BAD_REQUEST);
            const songsToAttach = await this.songRepo.findBy({ id: (0, typeorm_2.In)(songIds) });
            if (songsToAttach.length !== songIds.length) {
                const foundIds = songsToAttach.map((s) => s.id);
                const missing = songIds.filter((id) => !foundIds.includes(id));
                throw new common_1.HttpException((0, apiResponse_1.createUnSuccessfulResponse)(`The following song IDs were not found: ${missing.join(', ')}`), common_1.HttpStatus.BAD_REQUEST);
            }
            const existingIds = new Set(product.songs.map((s) => s.id));
            const newSongs = songsToAttach.filter((s) => !existingIds.has(s.id));
            product.songs = [...product.songs, ...newSongs];
            product.hasQrCode = requiresQrcode || product.hasQrCode;
            const result = await this.productRepo.save(product);
            return (0, apiResponse_1.createResponse)(true, 'Songs attached to product successfully.', result);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async detachFromProduct(productId, songIds) {
        try {
            const product = await this.productRepo.findOne({
                where: { id: productId },
                relations: { songs: true },
            });
            if (!product)
                throw new common_1.HttpException((0, apiResponse_1.createUnSuccessfulResponse)(`Product #${productId} not found.`), common_1.HttpStatus.BAD_REQUEST);
            product.songs = product.songs.filter((s) => !songIds.includes(s.id));
            const result = await this.productRepo.save(product);
            return (0, apiResponse_1.createResponse)(true, 'Songs detached from product successfully.', result);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async getProductSongs(productId) {
        try {
            const product = await this.productRepo.findOne({
                where: { id: productId },
                relations: {
                    songs: {
                        artist: true,
                    },
                },
            });
            if (!product)
                throw new common_1.HttpException((0, apiResponse_1.createUnSuccessfulResponse)(`Product #${productId} not found.`), common_1.HttpStatus.BAD_REQUEST);
            const result = product.songs.filter((s) => s.isActive);
            return (0, apiResponse_1.createResponse)(true, 'Songs retrieved successfully.', result);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
};
exports.SongService = SongService;
exports.SongService = SongService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(songs_entity_1.Song)),
    __param(1, (0, typeorm_1.InjectRepository)(artist_entity_1.Artist)),
    __param(2, (0, typeorm_1.InjectRepository)(products_entity_1.Product)),
    __param(3, (0, typeorm_1.InjectRepository)(collection_entity_1.Collection)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SongService);
//# sourceMappingURL=artist_song.service.js.map