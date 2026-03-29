import { TransactionsService } from './transactions.service';
import { CustomRequest } from 'src/shared/interfaces/CustomRequest';
export declare class TransactionsController {
    private readonly transactionsService;
    constructor(transactionsService: TransactionsService);
    getUserTx(req: CustomRequest, page?: number, limit?: number): Promise<import("../shared/interfaces/aResponse").aResponse<import("../shared/interfaces/pagination").PaginatedResult<import("./entities/transaction.entity").Transaction>> | undefined>;
}
