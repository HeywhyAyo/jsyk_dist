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
exports.WalletService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const wallet_entity_1 = require("./entities/wallet.entity");
const typeorm_2 = require("typeorm");
const apiResponse_1 = require("../shared/utilities/apiResponse");
const transactions_service_1 = require("../transactions/transactions.service");
const users_service_1 = require("../users/users.service");
const generate_txrefs_1 = require("../shared/utilities/generate-txrefs");
const rethrow_exception_1 = require("../shared/utilities/rethrow-exception");
const standard_charge_1 = require("../shared/constant/standard.charge");
let WalletService = class WalletService {
    walletRepo;
    txService;
    usersService;
    secretKey = process.env.PAYSTACK_SECRET_KEY;
    baseUrl = process.env.PAYSTACK_BASE_URL;
    SQUAD_SECRET = process.env.SQUAD_SECRET_KEY;
    SQUAD_BASEURL = process.env.SQUAD_BASE_URL;
    SQUAD_CALLBACK_URL = process.env.SQUAD_CALLBACK_URL;
    SQUAD_MERCHANT_ID = process.env.SQUAD_MERCHANT_ID;
    constructor(walletRepo, txService, usersService) {
        this.walletRepo = walletRepo;
        this.txService = txService;
        this.usersService = usersService;
    }
    async createWallet(userId, currency = 'NGN', user) {
        const wallet = this.walletRepo.create({ userId, currency, balance: 0, user });
        return await this.walletRepo.save(wallet);
    }
    async getWalletById(id) {
        return await this.walletRepo.findOne({ where: { id } });
    }
    async getWalletByUserId(userId) {
        return await this.walletRepo.findOne({ where: { userId } });
    }
    async chargeUserWallet(user, amountToCharge) {
        const wallet = await this.getWalletByUserId(user.id);
        if (!wallet) {
            const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)('Wallet not found for this user');
            throw new common_1.HttpException(apiResponse, common_1.HttpStatus.NOT_FOUND);
        }
        if (Number(wallet.balance) < amountToCharge) {
            const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)('Patient do not have enough balance in their wallet to take care of the treatment, please fund wallet');
            throw new common_1.HttpException(apiResponse, common_1.HttpStatus.NOT_ACCEPTABLE);
        }
        wallet.balance -= amountToCharge;
        const charged = await this.walletRepo.save(wallet);
        const newTxData = {
            description: `Transaction successful. An amount of NGN${amountToCharge} has been deducted from your wallet for services rendered at MedInfo Facility`,
            type: "debit",
            amount: amountToCharge
        };
        const newTx = await this.txService.createTransaction(newTxData, user);
        return charged;
    }
    async updateWalletByUserId(userid, criteria) {
        return await this.walletRepo.update({ userId: userid }, criteria);
    }
    async updateBalanceByUserId(userid, criteria) {
        return await this.walletRepo.update({ userId: userid }, criteria);
    }
    async add_to_User_Balance_By_UserId(user, amount, purpose) {
        const wallet = await this.getWalletByUserId(user.id);
        if (!wallet) {
            const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)('Wallet not found');
            throw new common_1.HttpException(apiResponse, common_1.HttpStatus.NOT_FOUND);
        }
        wallet.balance = Number(wallet.balance) + amount;
        const result = await this.walletRepo.save(wallet);
        const newTxData = {
            description: `${purpose}: NGN${amount} has been added to your wallet successfully.`,
            type: "credit",
            amount: amount
        };
        const newTx = await this.txService.createTransaction(newTxData, user);
        if (!newTx) {
            const newTxResponse = (0, apiResponse_1.createUnSuccessfulResponse)("Transaction not created");
            throw new common_1.HttpException(newTxResponse, common_1.HttpStatus.BAD_REQUEST);
        }
        ;
        return result;
    }
    async subtract_from_User_Balance_By_UserId(user, amount, purpose) {
        const wallet = await this.getWalletByUserId(user.id);
        if (!wallet) {
            const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)('Wallet not found');
            throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
        }
        if (Number(wallet.balance) < amount) {
            const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)('Cannot deduct from wallet balance, Insufficient wallet balance');
            throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
        }
        wallet.balance = Number(wallet.balance) - amount;
        const result = await this.walletRepo.save(wallet);
        const newTxData = {
            description: `${purpose}: NGN${amount} has been deducted from your wallet successfully.`,
            type: "debit",
            amount: amount
        };
        const newTx = await this.txService.createTransaction(newTxData, user);
        if (!newTx) {
            const newTxResponse = (0, apiResponse_1.createUnSuccessfulResponse)("Transaction not created");
            throw new common_1.HttpException(newTxResponse, common_1.HttpStatus.BAD_REQUEST);
        }
        ;
        return result;
    }
    async updateBalanceById(id, amount) {
        const wallet = await this.getWalletByUserId(id);
        if (!wallet) {
            const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)('Wallet not found for this user');
            throw new common_1.HttpException(apiResponse, common_1.HttpStatus.NOT_FOUND);
        }
        wallet.balance += amount;
        return await this.walletRepo.save(wallet);
    }
    async deleteWallet(id) {
        return await this.walletRepo.delete(id);
    }
    async get_System_Balance() {
        const result = await this.walletRepo
            .createQueryBuilder('wallet')
            .select('SUM(wallet.balance)', 'total')
            .getRawOne();
        return Number(result?.total ?? 0);
    }
    async paystack_initiate_Payment(userId, body) {
        try {
            const user = await this.usersService.findUserById(userId);
            if (!user) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)('User does not exist');
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const maximumAmountsMaxToFund = process.env.maximumAmountsMaxToFund;
            if (Number(body.amount) > Number(maximumAmountsMaxToFund)) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(`The maximum amount you can fund at a time ${maximumAmountsMaxToFund}`);
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const metadata = {
                userId
            };
            const createPaystackDto = {
                amount: body.amount * 100,
                email: user.email,
                metadata,
            };
            const response = await this.paystack_initialize_transaction(createPaystackDto);
            if (response) {
                return (0, apiResponse_1.createResponse)(true, "Transaction initialized successfully", response);
            }
            else {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("Failed to initialize transaction");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async paystack_initialize_transaction(data) {
        try {
            const response = await fetch(`${this.baseUrl}/transaction/initialize`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${this.secretKey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...data,
                }),
            });
            const result = await response.json();
            if (!response.ok) {
                throw new common_1.HttpException(result?.message || "Failed to initiate transaction", common_1.HttpStatus.BAD_REQUEST);
            }
            return result;
        }
        catch (error) {
            throw new common_1.HttpException("Error initializing transaction", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async paystack_withdraw(userId, amount) {
        try {
            if (isNaN(amount) || typeof amount !== 'number' || amount <= 0) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)('Invalid amount. Must be a positive number');
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const user = await this.usersService.findUserById(userId);
            if (!user || !user.account_number || !user.bank_code) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)('User bank details not set, go and update your bank details in the profile settings');
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const withdrawalPercentage = standard_charge_1.FEEs.withdrawalPercentage;
            const maximumAmountsMaxToWithraw = standard_charge_1.FEEs.maximumAmountsMaxToWithraw;
            if (!maximumAmountsMaxToWithraw || !withdrawalPercentage) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)('The service fee is currently being updated. Please try again in a few moments.');
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const wallet = await this.getWalletByUserId(userId);
            const minimum_withdrawal = 1000;
            if (!wallet || Number(wallet.balance) < minimum_withdrawal) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(`Sorry, you must have a minimum of ${minimum_withdrawal} before proceeding to withdraw`);
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            if (Number(amount) > Number(maximumAmountsMaxToWithraw)) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(`The maximum amount you can withdraw at a time is ${maximumAmountsMaxToWithraw}`);
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            if (wallet.isLocked === true) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("Access to your wallet is temporarily restricted as a result of an active, ongoing process. It will be unlocked automatically once this treatment has been successfully completed.");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            if (wallet.last_funding_date === null) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)('We could not locate a previous funding date, which indicates that your wallet has not been funded yet. Please ensure your wallet is funded before initiating a withdrawal.');
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const amount_percentage = Number(amount) * Number(withdrawalPercentage);
            const total_amount_to_charge = Number(amount) + amount_percentage;
            const remaining_Balance = Number(wallet.balance) - total_amount_to_charge;
            if (remaining_Balance < 1000) {
                const maxWithdrawable = this.getMaxWithdrawable(Number(wallet.balance), Number(withdrawalPercentage));
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(`You don't have enough balance to withdraw ₦${amount}. ` +
                    `After charges, your wallet would drop below the required minimum of ₦1000. ` +
                    `You can withdraw up to a maximum of ₦${maxWithdrawable.toFixed(2)} based on your current balance.`);
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const recipientData = await this.create_transfer_Request(user.account_name ?? user.lastName, user.account_number, user.bank_code);
            if (!recipientData.status) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)('Failed to create transfer recipient');
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const recipientCode = recipientData.data.recipient_code;
            const transferData = await this.initiate_transfer_transaction(recipientCode, amount);
            if (!transferData.status) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)('Withdrawal failed, please try again later');
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const result = await this.subtract_from_User_Balance_By_UserId(user, Number(total_amount_to_charge), "Successful withdraw");
            return (0, apiResponse_1.createResponse)(true, "Withdrawal successful", true);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    getMaxWithdrawable(balance, feeRate) {
        return (balance - 1000) / (1 + feeRate);
    }
    async create_transfer_Request(account_name, account_number, bank_code) {
        const recipientRes = await fetch(`${this.baseUrl}/transferrecipient`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.secretKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: 'nuban',
                name: account_name,
                account_number: account_number,
                bank_code: bank_code,
                currency: 'NGN',
            }),
        });
        const recipientData = await recipientRes.json();
        return recipientData;
    }
    async initiate_transfer_transaction(recipientCode, amount) {
        const transferRes = await fetch(`${this.baseUrl}/transfer`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.secretKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                source: 'balance',
                amount: amount * 100,
                recipient: recipientCode,
                reason: 'JSYK Wallet withdrawal',
            }),
        });
        const transferData = await transferRes.json();
        return transferData;
    }
    async paystack_getBanks() {
        try {
            const res = await fetch(`${this.baseUrl}/bank`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${this.secretKey}`,
                },
            });
            const data = await res.json();
            if (!data.status) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)('Failed to fetch banks from Paystack');
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const Banks = data.data.map((bank) => ({
                name: bank.name,
                code: bank.code,
            }));
            return (0, apiResponse_1.createResponse)(true, "Banks retrieved", Banks);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async paystack_account_name_look_up(accountNumber, bank_code) {
        try {
            const res = await fetch(`${this.baseUrl}/bank/resolve?account_number=${accountNumber}&bank_code=${bank_code}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${this.secretKey}`,
                },
            });
            const data = await res.json();
            if (!data.status) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)('Failed to resolve account number check again');
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            return (0, apiResponse_1.createResponse)(true, data.message, data.data.account_name);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async paystack_get_balance() {
        try {
            const res = await fetch(`${this.baseUrl}/balance`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${this.secretKey}`,
                },
            });
            const data = await res.json();
            if (!data.status) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)('Failed to fetch banks from Paystack');
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const balanceInKB = data.data[0].balance;
            const balanceInNaira = Number(balanceInKB) / 100;
            return balanceInNaira;
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async get_total_system_Balance() {
        try {
            const systemBalanceInNaira = await this.get_System_Balance();
            return systemBalanceInNaira;
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async add_to_User_Balance_By_UserId_webhook(user, amount, purpose) {
        const wallet = await this.getWalletByUserId(user.id);
        if (!wallet) {
            const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)('Wallet not found');
            throw new common_1.HttpException(apiResponse, common_1.HttpStatus.OK);
        }
        wallet.balance = Number(wallet.balance) + amount;
        const result = await this.walletRepo.save(wallet);
        const newTxData = {
            description: `${purpose}: NGN${amount} has been added to your wallet successfully.`,
            type: "credit",
            amount: amount
        };
        const newTx = await this.txService.createTransaction(newTxData, user);
        if (!newTx) {
            const newTxResponse = (0, apiResponse_1.createUnSuccessfulResponse)("Transaction not created");
            throw new common_1.HttpException(newTxResponse, common_1.HttpStatus.OK);
        }
        ;
        return result;
    }
    async squad_initiate_payment(userId, body) {
        try {
            const user = await this.usersService.findUserById(userId);
            if (!user) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)('User does not exist');
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.NOT_FOUND);
            }
            const metadata = {
                userId: user.id
            };
            const ref = (0, generate_txrefs_1.generateJSYKTransactionRef)();
            const createSquadDto = {
                amount: body.amount * 100,
                email: user.email,
                currency: "NGN",
                callback_url: this.SQUAD_CALLBACK_URL,
                initiate_type: "inline",
                transaction_ref: ref,
                metadata: metadata
            };
            const squadResponse = await this.Squad_initialize_transaction(createSquadDto);
            if (squadResponse) {
                return (0, apiResponse_1.createResponse)(true, "Transaction initialized successfully", squadResponse);
            }
            else {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("Failed to initialize transaction");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("Internal server error");
            throw new common_1.HttpException(apiResponse, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async Squad_initialize_transaction(data) {
        try {
            const response = await fetch(`${this.SQUAD_BASEURL}/transaction/initiate`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${this.SQUAD_SECRET}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...data,
                }),
            });
            const result = await response.json();
            if (!response.ok) {
                throw new common_1.HttpException(result?.message || "Failed to initiate transaction", common_1.HttpStatus.BAD_REQUEST);
            }
            return result;
        }
        catch (error) {
            throw new common_1.HttpException("Error initializing transaction", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async squad_get_Banks() {
        try {
            const res = await fetch(`${this.SQUAD_BASEURL}/transaction/mandate/banklists`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${this.SQUAD_SECRET}`,
                    "Content-Type": "application/json",
                },
            });
            const banks = await res.json();
            if (!banks.status) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)('Failed to fetch banks from Paystack');
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            return (0, apiResponse_1.createResponse)(true, "Banks retrieved", banks);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException((0, apiResponse_1.createUnSuccessfulResponse)("Something went wrong, please try again later"), common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async squad_withdrawal_engine(dto) {
        const url = `${this.SQUAD_BASEURL}/payout/transfer`;
        const merchant_id = this.SQUAD_MERCHANT_ID + '_';
        const txRef = `${merchant_id}${Date.now()}`;
        const payload = {
            remark: dto.remark,
            bank_code: dto.bank_code,
            currency_id: "NGN",
            amount: (dto.amount * 100).toString(),
            account_number: dto.account_number,
            transaction_reference: txRef,
            account_name: dto.account_name
        };
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${this.SQUAD_SECRET}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            return data;
        }
        catch (error) {
            console.log("Failed Transfer: ", error);
            if (error instanceof common_1.HttpException)
                throw error;
            const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("Internal server error");
            throw new common_1.HttpException(apiResponse, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async squad_withdraw(userId, amount) {
        try {
            if (isNaN(amount) || typeof amount !== 'number' || amount <= 0) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)('Invalid amount. Must be a positive number');
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const user = await this.usersService.findUserById(userId);
            if (!user || !user.account_number || !user.bank_code) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)('User bank details not set, go and update your bank details in the profile settings');
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const wallet = await this.getWalletByUserId(userId);
            const minimum_withdrawal = 1000;
            if (!wallet || Number(wallet.balance) < minimum_withdrawal) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(`Sorry, you must have a minimum of ${minimum_withdrawal} before proceeding to withdraw`);
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!wallet || Number(wallet.balance) < amount) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)('Insufficient wallet balance');
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            if (wallet.isLocked === true) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("Access to your wallet is temporarily restricted as a result of an active, ongoing process. It will be unlocked automatically once this treatment has been successfully completed.");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            if (wallet.last_funding_date === null) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)('We could not locate a previous funding date, which indicates that your wallet has not been funded yet. Please ensure your wallet is funded before initiating a withdrawal.');
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            if (amount > Number(wallet.balance) - 100) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)('Withdrawal must leave at least 100 in your wallet');
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const withdrawalData = {
                amount: amount,
                account_name: user.account_name,
                account_number: user.account_number,
                bank_code: user.bank_code,
                remark: "MEDINFOCARD user withdrawal"
            };
            const withdrawalResponse = await this.squad_withdrawal_engine(withdrawalData);
            console.log("Success Transfer Data details: ", withdrawalResponse);
            if (!withdrawalResponse.success) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(withdrawalResponse?.message || "Transfer initiation failed");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const result = await this.subtract_from_User_Balance_By_UserId(user, amount, "Successful withdraw");
            return (0, apiResponse_1.createResponse)(true, "Withdrawal successful", true);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    check_if_funding_date(lastfunddate) {
        const now = new Date();
        const diffMs = now.getTime() - lastfunddate.getTime();
        const diffHours = diffMs / (1000 * 60 * 60);
        if (diffHours > 24) {
            return true;
        }
        else {
            return false;
        }
    }
    async resetAllBalancesToZero() {
        await this.walletRepo
            .createQueryBuilder()
            .update(wallet_entity_1.Wallet)
            .set({ balance: 0 })
            .execute();
    }
    async transfer_from_wallet(sender_userid, dto) {
        try {
            const { email, amount } = dto;
            let recipient_user = null;
            if (isNaN(amount) || typeof amount !== 'number' || amount <= 0) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)('Invalid amount. Must be a positive number');
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            if (email) {
                recipient_user = await this.usersService.findOneByEmail(email);
            }
            ;
            if (!recipient_user) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("Receiver account not found");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const sender_wallet = await this.getWalletByUserId(sender_userid);
            if (!sender_wallet) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(`Sender wallet cannot be found`);
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            if (sender_wallet.isLocked === true) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("Access to your wallet is temporarily restricted as a result of an active, ongoing process. It will be unlocked automatically once this treatment has been successfully completed.");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            if (sender_wallet.last_funding_date === null) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)('We could not locate a previous funding date, which indicates that your wallet has not been funded yet. Please ensure your wallet is funded before initiating a withdrawal.');
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            if (Number(sender_wallet.balance) < Number(amount)) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)('Unable to transfer. Insufficient wallet balance');
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const maximumAmountsMaxToTransfer = standard_charge_1.FEEs.maximumAmountsMaxToTransfer;
            if (Number(amount) > Number(maximumAmountsMaxToTransfer)) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(`The maximum amount you can transfer at a time is ${maximumAmountsMaxToTransfer}`);
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.NOT_FOUND);
            }
            const sender_user = await this.usersService.findUserById(sender_userid);
            if (!sender_user) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("Sender account not found");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            if (sender_user.id === recipient_user.id) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)('Self-sending is not permitted. You cannot send funds to your own account.');
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            await this.transfer_from_one_wallet_to_the_other(sender_user, recipient_user, Number(amount));
            return (0, apiResponse_1.createResponse)(true, "Successful transfer", amount);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async withdrawable_amount_by_super_admin() {
        const paystackBalance = await this.paystack_get_balance();
        const systemBalance = await this.get_total_system_Balance();
        const withdrawableAmount = Number(paystackBalance) - Number(systemBalance);
        if (withdrawableAmount < 0) {
            const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)('Unable to perform Withdrawal, withdrawable amount is returning a negative value, this simply means users balance is more than what paystack balance');
            throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
        }
        return withdrawableAmount;
    }
    async transfer_from_one_wallet_to_the_other(sender_user, recipient_user, amount) {
        const debit_result = await this.subtract_from_User_Balance_By_UserId(sender_user, Number(amount), `Successful transfer to ${recipient_user.firstName}, ${recipient_user.lastName}`);
        if (!debit_result) {
            const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("Debit: Unable to make transfer");
            throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
        }
        const credit_result = await this.add_to_User_Balance_By_UserId(recipient_user, Number(amount), `You received NGN${amount} from ${sender_user.firstName}, ${sender_user.lastName}`);
        if (!credit_result) {
            const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("Credit: Unable to make transfer");
            throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async look_up_for_user_wallet(userid) {
        try {
            const user = await this.usersService.findUserById(userid);
            if (user === null) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("User not found");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const walletResponse = await this.getWalletByUserId(user.id);
            if (!walletResponse) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("User wallet not found");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const apiResponse = (0, apiResponse_1.createResponse)(true, "Wallet found", walletResponse);
            return apiResponse;
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async initialize_payment_(body, userId) {
        try {
            if (!body.amount || isNaN(body.amount)) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("Invalid request body");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            ;
            const apiResponse = await this.paystack_initiate_Payment(userId, body);
            return (0, apiResponse_1.createResponse)(true, "Success intialize payment", apiResponse);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
};
exports.WalletService = WalletService;
exports.WalletService = WalletService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(wallet_entity_1.Wallet)),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => users_service_1.UsersService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        transactions_service_1.TransactionsService,
        users_service_1.UsersService])
], WalletService);
//# sourceMappingURL=wallet.service.js.map