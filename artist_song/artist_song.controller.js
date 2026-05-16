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
exports.ArtistSongController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const artist_song_service_1 = require("./artist_song.service");
let ArtistSongController = class ArtistSongController {
    artistSongService;
    constructor(artistSongService) {
        this.artistSongService = artistSongService;
    }
    async findAll(page = "1", limit = "10", search) {
        return await this.artistSongService.find_all_artist(Number(page), Number(limit), search);
    }
    async find_All_with_Songs(page = "1", limit = "10", search) {
        return await this.artistSongService.find_all_artist_with_songs(Number(page), Number(limit), search);
    }
    async findOne(id) {
        return await this.artistSongService.find_One_artist(id);
    }
    async findBySlug(slug) {
        return await this.artistSongService.findBySlug(slug);
    }
};
exports.ArtistSongController = ArtistSongController;
__decorate([
    (0, common_1.Get)('get-all-artists'),
    (0, swagger_1.ApiQuery)({
        name: "page",
        required: false,
        description: "Page number for pagination (default: 1)",
        example: 1,
        type: Number,
    }),
    (0, swagger_1.ApiQuery)({
        name: "limit",
        required: false,
        description: "Number of items per page (default: 10)",
        example: 10,
        type: Number,
    }),
    (0, swagger_1.ApiQuery)({
        name: "search",
        required: false,
        description: "Search by email",
        type: String,
    }),
    (0, swagger_1.ApiOperation)({ summary: 'List all active artists' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns all active artists.' }),
    __param(0, (0, common_1.Query)("page")),
    __param(1, (0, common_1.Query)("limit")),
    __param(2, (0, common_1.Query)("search")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], ArtistSongController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('get-all-artists_with-songs'),
    (0, swagger_1.ApiQuery)({
        name: "page",
        required: false,
        description: "Page number for pagination (default: 1)",
        example: 1,
        type: Number,
    }),
    (0, swagger_1.ApiQuery)({
        name: "limit",
        required: false,
        description: "Number of items per page (default: 10)",
        example: 10,
        type: Number,
    }),
    (0, swagger_1.ApiQuery)({
        name: "search",
        required: false,
        description: "Search by email",
        type: String,
    }),
    (0, swagger_1.ApiOperation)({ summary: 'List all active artists with their songs' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns all active artists with their songs.' }),
    __param(0, (0, common_1.Query)("page")),
    __param(1, (0, common_1.Query)("limit")),
    __param(2, (0, common_1.Query)("search")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], ArtistSongController.prototype, "find_All_with_Songs", null);
__decorate([
    (0, common_1.Get)('get-artist/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get artist by ID with their songs' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Artist found with songs.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Artist not found.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ArtistSongController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('slug/:slug'),
    (0, swagger_1.ApiOperation)({ summary: 'Get artist by slug' }),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ArtistSongController.prototype, "findBySlug", null);
exports.ArtistSongController = ArtistSongController = __decorate([
    (0, swagger_1.ApiTags)('Artists'),
    (0, common_1.Controller)('artists'),
    __metadata("design:paramtypes", [artist_song_service_1.ArtistSongService])
], ArtistSongController);
//# sourceMappingURL=artist_song.controller.js.map