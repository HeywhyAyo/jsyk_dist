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
exports.Draw = exports.DrawStatus = void 0;
const typeorm_1 = require("typeorm");
const products_entity_1 = require("../../products/entities/products.entity");
const draw_participant_entity_1 = require("./draw.participant.entity");
var DrawStatus;
(function (DrawStatus) {
    DrawStatus["OPEN"] = "OPEN";
    DrawStatus["CLOSED"] = "CLOSED";
    DrawStatus["COMPLETED"] = "COMPLETED";
})(DrawStatus || (exports.DrawStatus = DrawStatus = {}));
let Draw = class Draw {
    id;
    product;
    productId;
    title;
    description;
    rewardDescription;
    status;
    totalSoldAtDraw;
    totalWinners;
    buyerWinnerCount;
    nonBuyerWinnerCount;
    conductedAt;
    opensAt;
    closesAt;
    createdAt;
    updatedAt;
    participants;
};
exports.Draw = Draw;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Draw.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => products_entity_1.Product, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'productId' }),
    __metadata("design:type", products_entity_1.Product)
], Draw.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Draw.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Draw.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Draw.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Draw.prototype, "rewardDescription", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: DrawStatus,
        default: DrawStatus.OPEN,
    }),
    __metadata("design:type", String)
], Draw.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Draw.prototype, "totalSoldAtDraw", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Draw.prototype, "totalWinners", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Draw.prototype, "buyerWinnerCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Draw.prototype, "nonBuyerWinnerCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Draw.prototype, "conductedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Draw.prototype, "opensAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Draw.prototype, "closesAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Draw.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Draw.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => draw_participant_entity_1.DrawParticipant, (p) => p.draw, { cascade: true }),
    __metadata("design:type", Array)
], Draw.prototype, "participants", void 0);
exports.Draw = Draw = __decorate([
    (0, typeorm_1.Entity)('draws')
], Draw);
//# sourceMappingURL=draw.entity.js.map