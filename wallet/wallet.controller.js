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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletController = void 0;
const common_1 = require("@nestjs/common");
const wallet_service_1 = require("./wallet.service");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const users_service_1 = require("../users/users.service");
const create_paystack_dto_1 = require("./dto/create-paystack.dto");
const withdrawal_dto_1 = require("./dto/withdrawal.dto");
const transfer_funds_dto_1 = require("./dto/transfer.funds.dto");
let WalletController = class WalletController {
    walletService;
    userService;
    constructor(walletService, userService) {
        this.walletService = walletService;
        this.userService = userService;
    }
    async getUserWallet(req) {
        return await this.walletService.look_up_for_user_wallet(req.user.id);
    }
    async initiate(body, req) {
        return await this.walletService.initialize_payment_(body, req.user.id);
    }
    async withdrawal(body, req) {
        return await this.walletService.paystack_withdraw(req.user.id, body.amount);
    }
    async getBanks(req) {
        return this.walletService.paystack_getBanks();
    }
    async transferfunds(body, req) {
        return await this.walletService.transfer_from_wallet(req.user.id, body);
    }
    async get_wab_Balance(bank_code, account_no) {
        return this.walletService.paystack_account_name_look_up(account_no, bank_code);
    }
};
exports.WalletController = WalletController;
__decorate([
    (0, swagger_1.ApiBearerAuth)("bearerAuth"),
    (0, swagger_1.ApiOperation)({ summary: "Get wallet details" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "User found" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "User not found" }),
    (0, swagger_1.ApiResponse)({ status: 500, description: "Internal Server Error" }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('wallet-details'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "getUserWallet", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)("bearerAuth"),
    (0, swagger_1.ApiBody)({ type: create_paystack_dto_1.CreatePaystackDto, description: "Initilize Squad payment" }),
    (0, swagger_1.ApiOperation)({ summary: "Payment checkcout Url" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Get payment checkcout Url" }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)("initiate-payment"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_paystack_dto_1.CreatePaystackDto, Object]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "initiate", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)("bearerAuth"),
    (0, swagger_1.ApiBody)({ type: withdrawal_dto_1.WithdrawalDto, description: "Withdraw from user account" }),
    (0, swagger_1.ApiOperation)({ summary: "Withdraw from user account - User can withdraw from thier own wallet account" }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)("withdraw"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [withdrawal_dto_1.WithdrawalDto, Object]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "withdrawal", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)("bearerAuth"),
    (0, swagger_1.ApiOperation)({ summary: "Get Nigeria banks names, and bank codes - this endpoint is Authorized...c2" }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)("get-banks"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "getBanks", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)("bearerAuth"),
    (0, swagger_1.ApiBody)({ type: transfer_funds_dto_1.TransferFundsDto, description: "transfer body request" }),
    (0, swagger_1.ApiOperation)({ summary: "Transfer from user account - User can transfer from thier own wallet account to another wallet" }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)("transfer"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [transfer_funds_dto_1.TransferFundsDto, Object]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "transferfunds", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)("bearerAuth"),
    (0, swagger_1.ApiOperation)({ summary: "Get Nigeria banks account name for verification" }),
    (0, swagger_1.ApiQuery)({
        name: "account_no",
        required: false,
        description: "Page number for pagination (default: 1)",
        type: String,
    }),
    (0, swagger_1.ApiQuery)({
        name: "bank_code",
        required: false,
        description: "Number of items per page (default: 10)",
        type: String,
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)("get-account-name"),
    __param(0, (0, common_1.Query)("bank_code")),
    __param(1, (0, common_1.Query)("account_no")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "get_wab_Balance", null);
exports.WalletController = WalletController = __decorate([
    (0, common_1.Controller)('wallet'),
    __metadata("design:paramtypes", [wallet_service_1.WalletService,
        users_service_1.UsersService])
], WalletController);
//# sourceMappingURL=wallet.controller.js.map