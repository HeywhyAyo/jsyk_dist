"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const dotenv = require("dotenv");
const jwt_auth_guard_1 = require("./jwt-auth.guard");
const roles_guard_1 = require("./roles.guard");
const validateUser_guard_1 = require("./validateUser.guard");
const user_entity_1 = require("../users/entities/user.entity");
const users_module_1 = require("../users/users.module");
const users_service_1 = require("../users/users.service");
const email_module_1 = require("../email/email.module");
const nodemailer_service_1 = require("../email/nodemailer.service");
const address_entity_1 = require("../users/entities/address.entity");
const wallet_module_1 = require("../wallet/wallet.module");
dotenv.config();
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                secret: process.env.SECRET_KEY,
                signOptions: { expiresIn: "1h" },
            }),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, address_entity_1.Address]), email_module_1.EmailModule, (0, common_1.forwardRef)(() => wallet_module_1.WalletModule)
        ],
        providers: [auth_service_1.AuthService, jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, validateUser_guard_1.UserExistsGuard, users_service_1.UsersService, nodemailer_service_1.NodemailerService],
        controllers: [auth_controller_1.AuthController],
        exports: [jwt_1.JwtModule, jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, validateUser_guard_1.UserExistsGuard],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map