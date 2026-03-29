import { WalletService } from './wallet.service';
import { CustomRequest } from 'src/shared/interfaces/CustomRequest';
import { UsersService } from 'src/users/users.service';
import { CreatePaystackDto } from './dto/create-paystack.dto';
import { WithdrawalDto } from './dto/withdrawal.dto';
import { TransferFundsDto } from './dto/transfer.funds.dto';
export declare class WalletController {
    private readonly walletService;
    private readonly userService;
    constructor(walletService: WalletService, userService: UsersService);
    getUserWallet(req: CustomRequest): Promise<import("../shared/interfaces/aResponse").aResponse<import("./entities/wallet.entity").Wallet> | undefined>;
    initiate(body: CreatePaystackDto, req: CustomRequest): Promise<import("../shared/interfaces/aResponse").aResponse<import("../shared/interfaces/aResponse").aResponse<any> | undefined> | undefined>;
    withdrawal(body: WithdrawalDto, req: CustomRequest): Promise<import("../shared/interfaces/aResponse").aResponse<boolean> | undefined>;
    getBanks(req: CustomRequest): Promise<import("../shared/interfaces/aResponse").aResponse<any> | undefined>;
    transferfunds(body: TransferFundsDto, req: CustomRequest): Promise<import("../shared/interfaces/aResponse").aResponse<number> | undefined>;
    get_wab_Balance(bank_code: string, account_no: string): Promise<import("../shared/interfaces/aResponse").aResponse<any> | undefined>;
}
