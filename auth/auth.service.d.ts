import { User } from "../users/entities/user.entity";
import { Repository } from "typeorm";
export declare class AuthService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    google_uri(): string;
    google_access_token(code: string): Promise<any>;
    google_user_details(AccessToken: string): Promise<any>;
    github_Uri(): string;
    github_access_token(code: string): Promise<string | null>;
    github_user_details(AccessToken: string): Promise<any>;
    github_user_email(AccessToken: string): Promise<any>;
}
