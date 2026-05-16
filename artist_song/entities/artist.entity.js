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
exports.Artist = void 0;
const typeorm_1 = require("typeorm");
const songs_entity_1 = require("./songs.entity");
const artist_category_1 = require("../interface/artist_category");
const collection_entity_1 = require("../../collection/entities/collection.entity");
let Artist = class Artist {
    id;
    name;
    slug;
    bio;
    imageUrl;
    isVerified;
    isActive;
    facebook;
    instagram;
    twitter;
    category;
    createdAt;
    updatedAt;
    songs;
    collection;
};
exports.Artist = Artist;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Artist.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 150 }),
    __metadata("design:type", String)
], Artist.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, length: 170 }),
    __metadata("design:type", String)
], Artist.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Artist.prototype, "bio", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Artist.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Artist.prototype, "isVerified", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Artist.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Artist.prototype, "facebook", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Artist.prototype, "instagram", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Artist.prototype, "twitter", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: artist_category_1.ArtistCategory,
        default: artist_category_1.ArtistCategory.MUSICIAN,
    }),
    __metadata("design:type", String)
], Artist.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Artist.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Artist.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => songs_entity_1.Song, (song) => song.artist, { cascade: true }),
    __metadata("design:type", Array)
], Artist.prototype, "songs", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => collection_entity_1.Collection, (collection) => collection.artist),
    __metadata("design:type", collection_entity_1.Collection)
], Artist.prototype, "collection", void 0);
exports.Artist = Artist = __decorate([
    (0, typeorm_1.Entity)('artists')
], Artist);
//# sourceMappingURL=artist.entity.js.map