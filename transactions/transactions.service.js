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
exports.TransactionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const typeorm_2 = require("typeorm");
const transaction_entity_1 = require("./entities/transaction.entity");
const apiResponse_1 = require("../shared/utilities/apiResponse");
const users_service_1 = require("../users/users.service");
const rethrow_exception_1 = require("../shared/utilities/rethrow-exception");
let TransactionsService = class TransactionsService {
    userRepository;
    transactionRepository;
    usersService;
    constructor(userRepository, transactionRepository, usersService) {
        this.userRepository = userRepository;
        this.transactionRepository = transactionRepository;
        this.usersService = usersService;
    }
    async createTransaction(createTxDto, user) {
        const newTx = this.transactionRepository.create({
            ...createTxDto,
            status: 'completed',
            userId: user.id,
            user
        });
        return await this.transactionRepository.save(newTx);
    }
    async findAllUserTransactionByUserId(userId, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [items, total] = await this.transactionRepository.findAndCount({
            where: {
                userId: userId,
            },
            skip,
            take: limit,
            order: { createdAt: "DESC" },
        });
        return {
            data: items,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async findAllTransactionsInTheSystem(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [items, total] = await this.transactionRepository.findAndCount({
            skip,
            take: limit,
            order: { createdAt: "DESC" },
        });
        return {
            data: items,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async look_up_for_user_tx(userId, page, limit) {
        try {
            if (!userId) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("User not identified");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const user = await this.usersService.findUserById(userId);
            if (!user) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(`User does not exist`);
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const userTx = await this.findAllUserTransactionByUserId(userId, page, limit);
            return (0, apiResponse_1.createResponse)(true, "Transaction history retrieved", userTx);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
};
exports.TransactionsService = TransactionsService;
exports.TransactionsService = TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(transaction_entity_1.Transaction)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        users_service_1.UsersService])
], TransactionsService);
//# sourceMappingURL=transactions.service.js.map