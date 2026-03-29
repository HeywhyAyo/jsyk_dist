import { AuthService } from "./auth.service";
import { Response } from "express";
import { Googledto } from "./core/google/callback.dto";
import { UsersService } from "../users/users.service";
export declare class AuthController {
    private readonly authService;
    private readonly usersService;
    constructor(authService: AuthService, usersService: UsersService);
    private readonly response;
    google_initiate(res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    googleCallback(body: Googledto, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
