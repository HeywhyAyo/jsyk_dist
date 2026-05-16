"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsModule = void 0;
const common_1 = require("@nestjs/common");
const transactions_service_1 = require("./transactions.service");
const transactions_controller_1 = require("./transactions.controller");
const auth_module_1 = require("../auth/auth.module");
const user_entity_1 = require("../users/entities/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const users_service_1 = require("../users/users.service");
const transaction_entity_1 = require("./entities/transaction.entity");
const email_module_1 = require("../email/email.module");
const address_entity_1 = require("../users/entities/address.entity");
const wallet_module_1 = require("../wallet/wallet.module");
let TransactionsModule = class TransactionsModule {
};
exports.TransactionsModule = TransactionsModule;
exports.TransactionsModule = TransactionsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, address_entity_1.Address]),
            typeorm_1.TypeOrmModule.forFeature([transaction_entity_1.Transaction]),
            auth_module_1.AuthModule,
            email_module_1.EmailModule,
            (0, common_1.forwardRef)(() => wallet_module_1.WalletModule)
        ],
        controllers: [transactions_controller_1.TransactionsController],
        providers: [transactions_service_1.TransactionsService, users_service_1.UsersService,],
        exports: [transactions_service_1.TransactionsService]
    })
], TransactionsModule);
//# sourceMappingURL=transactions.module.js.map