import { User } from "../../entities/user.entity";
import { Repository } from "typeorm";
export declare function superAdminExists(userRepository: Repository<User>): Promise<void>;
