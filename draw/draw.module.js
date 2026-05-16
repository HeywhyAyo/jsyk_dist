"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrawModule = void 0;
const common_1 = require("@nestjs/common");
const draw_service_1 = require("./draw.service");
const draw_controller_1 = require("./draw.controller");
const typeorm_1 = require("@nestjs/typeorm");
const draw_entity_1 = require("./entities/draw.entity");
const draw_participant_entity_1 = require("./entities/draw.participant.entity");
const orders_entity_1 = require("../orders/entities/orders.entity");
const auth_module_1 = require("../auth/auth.module");
let DrawModule = class DrawModule {
};
exports.DrawModule = DrawModule;
exports.DrawModule = DrawModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([draw_entity_1.Draw, draw_participant_entity_1.DrawParticipant, orders_entity_1.Order]),
            auth_module_1.AuthModule],
        controllers: [draw_controller_1.DrawController],
        providers: [draw_service_1.DrawService],
        exports: [draw_service_1.DrawService],
    })
], DrawModule);
//# sourceMappingURL=draw.module.js.map