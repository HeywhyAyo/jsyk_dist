import { WalletService } from './wallet.service';
import { CustomRequest } from 'src/shared/interfaces/CustomRequest';
import { UsersService } from 'src/users/users.service';
export declare class WalletController {
    private readonly walletService;
    private readonly userService;
    constructor(walletService: WalletService, userService: UsersService);
    getUserWallet(req: CustomRequest): Promise<import("../shared/interfaces/aResponse").aResponse<import("./entities/wallet.entity").Wallet> | undefined>;
}
