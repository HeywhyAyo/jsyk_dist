"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailModule = void 0;
const common_1 = require("@nestjs/common");
const nodemailer_service_1 = require("./nodemailer.service");
const emailServiceToken_1 = require("../shared/constant/emailServiceToken");
const brevo_service_1 = require("./brevo/brevo.service");
let EmailModule = class EmailModule {
};
exports.EmailModule = EmailModule;
exports.EmailModule = EmailModule = __decorate([
    (0, common_1.Module)({
        providers: [
            {
                provide: emailServiceToken_1.EMAIL_TOKEN,
                useClass: process.env.EMAIL_SERVICE === 'BREVO' ? brevo_service_1.BrevoService : nodemailer_service_1.NodemailerService
            },
        ],
        exports: [emailServiceToken_1.EMAIL_TOKEN],
    })
], EmailModule);
//# sourceMappingURL=email.module.js.map