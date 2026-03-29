import { CanActivate, ExecutionContext } from "@nestjs/common";
import { UsersService } from "../users/users.service";
export declare class UserExistsGuard implements CanActivate {
    private userService;
    constructor(userService: UsersService);
    private responseData;
    canActivate(context: ExecutionContext): Promise<boolean>;
}
