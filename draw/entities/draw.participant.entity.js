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
exports.DrawParticipant = void 0;
const typeorm_1 = require("typeorm");
const draw_entity_1 = require("./draw.entity");
const user_entity_1 = require("../../users/entities/user.entity");
let DrawParticipant = class DrawParticipant {
    id;
    draw;
    drawId;
    user;
    userId;
    isPurchaser;
    isWinner;
    scannedAt;
};
exports.DrawParticipant = DrawParticipant;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], DrawParticipant.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => draw_entity_1.Draw, (draw) => draw.participants, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'drawId' }),
    __metadata("design:type", draw_entity_1.Draw)
], DrawParticipant.prototype, "draw", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DrawParticipant.prototype, "drawId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], DrawParticipant.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DrawParticipant.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], DrawParticipant.prototype, "isPurchaser", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], DrawParticipant.prototype, "isWinner", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], DrawParticipant.prototype, "scannedAt", void 0);
exports.DrawParticipant = DrawParticipant = __decorate([
    (0, typeorm_1.Entity)('draw_participants'),
    (0, typeorm_1.Unique)(['drawId', 'userId'])
], DrawParticipant);
//# sourceMappingURL=draw.participant.entity.js.map