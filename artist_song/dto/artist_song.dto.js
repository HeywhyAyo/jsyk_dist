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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachSongsDto = exports.UpdateSongDto = exports.CreateSongDto = exports.UpdateArtistDto = exports.CreateArtistDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const artist_category_1 = require("../interface/artist_category");
class CreateArtistDto {
    name;
    bio;
    imageUrl;
    isVerified;
    isActive;
    facebook;
    instagram;
    twitter;
    category;
}
exports.CreateArtistDto = CreateArtistDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Burna Boy', description: 'Artist display name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(150),
    __metadata("design:type", String)
], CreateArtistDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Grammy award winning Afrobeats artist from Port Harcourt, Nigeria.',
        description: 'Short artist biography',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateArtistDto.prototype, "bio", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'https://cdn.jsyk.com/artists/burna-boy.jpg',
        description: 'Artist profile image URL',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreateArtistDto.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true, description: 'Mark artist as verified' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateArtistDto.prototype, "isVerified", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true, description: 'Set artist as active or inactive' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateArtistDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://www.facebook.com/burnaboy', description: 'Artist Facebook profile URL' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreateArtistDto.prototype, "facebook", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://www.instagram.com/burnaboy', description: 'Artist Instagram profile URL' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreateArtistDto.prototype, "instagram", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://twitter.com/burnaboy', description: 'Artist Twitter profile URL' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreateArtistDto.prototype, "twitter", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: artist_category_1.ArtistCategory.MUSICIAN, description: 'Artist category' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateArtistDto.prototype, "category", void 0);
class UpdateArtistDto {
    name;
    artistId;
    bio;
    imageUrl;
    isActive;
    isVerified;
    facebook;
    instagram;
    twitter;
}
exports.UpdateArtistDto = UpdateArtistDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Burna Boy' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(150),
    __metadata("design:type", String)
], UpdateArtistDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'fe4e4ew5-4e5f-6789-abcd-ef0123456789' }),
    __metadata("design:type", String)
], UpdateArtistDto.prototype, "artistId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Grammy award winning Afrobeats artist.' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateArtistDto.prototype, "bio", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://cdn.jsyk.com/artists/burna-boy.jpg' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], UpdateArtistDto.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateArtistDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true, description: 'Mark artist as verified' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateArtistDto.prototype, "isVerified", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://www.facebook.com/burnaboy', description: 'Artist Facebook profile URL' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], UpdateArtistDto.prototype, "facebook", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://www.instagram.com/burnaboy', description: 'Artist Instagram profile URL' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], UpdateArtistDto.prototype, "instagram", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://twitter.com/burnaboy', description: 'Artist Twitter profile URL' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], UpdateArtistDto.prototype, "twitter", void 0);
class CreateSongDto {
    artistId;
    title;
    coverUrl;
    releaseYear;
    spotifyUrl;
    appleMusicUrl;
    youtubeMusicUrl;
    tidalUrl;
    duration;
    startFrom;
}
exports.CreateSongDto = CreateSongDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'fe4e4ew5-4e5f-6789-abcd-ef0123456789', description: 'UUID of the artist' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateSongDto.prototype, "artistId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Last Last', description: 'Song title' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CreateSongDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'https://cdn.jsyk.com/songs/last-last-cover.jpg',
        description: 'Song cover art URL — falls back to artist image if not set',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreateSongDto.prototype, "coverUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 2022, description: 'Year the song was released' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1900),
    (0, class_validator_1.Max)(new Date().getFullYear()),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateSongDto.prototype, "releaseYear", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT',
        description: 'Full Spotify track URL',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreateSongDto.prototype, "spotifyUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'https://music.apple.com/us/album/last-last/1621914515?i=1621914516',
        description: 'Full Apple Music track URL',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreateSongDto.prototype, "appleMusicUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'https://music.youtube.com/watch?v=abc123',
        description: 'Full YouTube Music track URL',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreateSongDto.prototype, "youtubeMusicUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'https://tidal.com/browse/track/234567890',
        description: 'Full Tidal track URL',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreateSongDto.prototype, "tidalUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 180, description: 'Song duration in seconds' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateSongDto.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 180, description: 'Song starts from in seconds' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateSongDto.prototype, "startFrom", void 0);
class UpdateSongDto {
    title;
    songId;
    coverUrl;
    releaseYear;
    spotifyUrl;
    appleMusicUrl;
    youtubeMusicUrl;
    tidalUrl;
    isActive;
    duration;
    startFrom;
}
exports.UpdateSongDto = UpdateSongDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Last Last (Remix)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], UpdateSongDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'fe4e4ew5-4e5f-6789-abcd-ef0123456789' }),
    __metadata("design:type", String)
], UpdateSongDto.prototype, "songId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://cdn.jsyk.com/songs/last-last-cover.jpg' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], UpdateSongDto.prototype, "coverUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 2022 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1900),
    (0, class_validator_1.Max)(new Date().getFullYear()),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UpdateSongDto.prototype, "releaseYear", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], UpdateSongDto.prototype, "spotifyUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://music.apple.com/us/album/last-last/1621914515' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], UpdateSongDto.prototype, "appleMusicUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://music.youtube.com/watch?v=abc123' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], UpdateSongDto.prototype, "youtubeMusicUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://tidal.com/browse/track/234567890' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], UpdateSongDto.prototype, "tidalUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateSongDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 180, description: 'Song duration in seconds' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateSongDto.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 180, description: 'Song starts from in seconds' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateSongDto.prototype, "startFrom", void 0);
class AttachSongsDto {
    songIds;
    requiresQrcode;
}
exports.AttachSongsDto = AttachSongsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of song UUIDs to attach to the product',
        example: [
            'a1b2c3d4-1234-5678-abcd-ef0123456789',
            'b2c3d4e5-2345-6789-bcde-f01234567890',
        ],
        type: [String],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsUUID)('all', { each: true }),
    __metadata("design:type", Array)
], AttachSongsDto.prototype, "songIds", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], AttachSongsDto.prototype, "requiresQrcode", void 0);
//# sourceMappingURL=artist_song.dto.js.map