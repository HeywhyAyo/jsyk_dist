"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrintifyModule = void 0;
const common_1 = require("@nestjs/common");
const printify_service_1 = require("./printify.service");
const printify_controller_1 = require("./printify.controller");
const printify_order_service_1 = require("./printify-order.service");
let PrintifyModule = class PrintifyModule {
};
exports.PrintifyModule = PrintifyModule;
exports.PrintifyModule = PrintifyModule = __decorate([
    (0, common_1.Module)({
        controllers: [printify_controller_1.PrintifyController],
        providers: [printify_service_1.PrintifyService, printify_order_service_1.PrintifyOrderService],
        exports: [printify_service_1.PrintifyService, printify_order_service_1.PrintifyOrderService],
    })
], PrintifyModule);
//# sourceMappingURL=printify.module.js.map