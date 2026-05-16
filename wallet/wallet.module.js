"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletModule = void 0;
const common_1 = require("@nestjs/common");
const wallet_service_1 = require("./wallet.service");
const wallet_controller_1 = require("./wallet.controller");
const typeorm_1 = require("@nestjs/typeorm");
const wallet_entity_1 = require("./entities/wallet.entity");
const auth_module_1 = require("../auth/auth.module");
const email_module_1 = require("../email/email.module");
const transaction_entity_1 = require("../transactions/entities/transaction.entity");
const address_entity_1 = require("../users/entities/address.entity");
const nodemailer_service_1 = require("../email/nodemailer.service");
const users_module_1 = require("../users/users.module");
const transactions_module_1 = require("../transactions/transactions.module");
let WalletModule = class WalletModule {
};
exports.WalletModule = WalletModule;
exports.WalletModule = WalletModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([wallet_entity_1.Wallet, address_entity_1.Address]), (0, common_1.forwardRef)(() => auth_module_1.AuthModule), email_module_1.EmailModule,
            typeorm_1.TypeOrmModule.forFeature([transaction_entity_1.Transaction]), email_module_1.EmailModule, (0, common_1.forwardRef)(() => users_module_1.UsersModule), transactions_module_1.TransactionsModule
        ],
        controllers: [wallet_controller_1.WalletController],
        providers: [wallet_service_1.WalletService, nodemailer_service_1.NodemailerService],
        exports: [wallet_service_1.WalletService]
    })
], WalletModule);
//# sourceMappingURL=wallet.module.js.map