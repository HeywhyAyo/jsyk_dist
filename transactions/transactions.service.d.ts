import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionData } from './dto/create.transaction.dto';
import { PaginatedResult } from 'src/shared/interfaces/pagination';
import { UsersService } from 'src/users/users.service';
export declare class TransactionsService {
    private userRepository;
    private readonly transactionRepository;
    private readonly usersService;
    constructor(userRepository: Repository<User>, transactionRepository: Repository<Transaction>, usersService: UsersService);
    createTransaction(createTxDto: CreateTransactionData, user: User): Promise<Transaction>;
    findAllUserTransactionByUserId(userId: string, page?: number, limit?: number): Promise<PaginatedResult<Transaction>>;
    findAllTransactionsInTheSystem(page?: number, limit?: number): Promise<PaginatedResult<Transaction>>;
    look_up_for_user_tx(userId: string, page: number, limit: number): Promise<import("../shared/interfaces/aResponse").aResponse<PaginatedResult<Transaction>> | undefined>;
}
