import { CreateUserData, CreateUserDto, CreateVisitorAccountDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { UserRole } from "./shared/enum/roleEnum";
import { PaginatedResult } from "src/shared/interfaces/pagination";
import { verifyUserDto, verifyUserDTOzod } from "./dto/verify-user.dto";
import { loginUserDto } from "./dto/login-user.dto";
import { ONBOARDLEVEL } from "./shared/enum/onboard";
import { CompleteProfileDto } from "./dto/complete.profile";
import { NodemailerService } from "src/email/nodemailer.service";
import { ResendConfirmationDto } from "./dto/resend-confirmation.dto";
import { MasterEmail } from "src/shared/interfaces/email";
import { RefreshUserDto } from "./dto/refresh-token-user.dto";
import { getOTPDTO } from "./dto/get-otp.dto";
import { ChangePasswordDTO, ResetPasswordDTO } from "./dto/reset-password.dto";
import { EnableTwoFaDto, getOtpWithEmailDTO } from "./dto/enable-user.dto";
import { loginUser2FaDTO } from "./dto/login-TwoFa.dto";
export declare class UsersService {
    private userRepository;
    private jwtService;
    private nodemailerService;
    private readonly emailService;
    constructor(userRepository: Repository<User>, jwtService: JwtService, nodemailerService: NodemailerService, emailService: MasterEmail);
    create(createUserDto: CreateUserData, token: string, expiresIn: Date): Promise<User>;
    createVisitorAccount(createUserDto: CreateVisitorAccountDto, password: string, token: string, expiresIn: Date): Promise<User>;
    sign_in_User_service(dto: loginUserDto): Promise<import("../shared/interfaces/aResponse").aResponse<{
        disabled: true;
        accessToken: null;
        refreshToken: null;
        email: string;
        is2FAEnabled: boolean;
        role: UserRole;
    }> | import("../shared/interfaces/aResponse").aResponse<{
        accessToken: null;
        refreshToken: null;
        role: UserRole;
        disabled: false;
        is2FAEnabled: true;
        email: string;
    }> | import("../shared/interfaces/aResponse").aResponse<{
        accessToken: null;
        refreshToken: null;
        role: UserRole;
        disabled: false;
        is2FAEnabled: false;
        email: string;
        onboard: ONBOARDLEVEL.CREATED;
    }> | import("../shared/interfaces/aResponse").aResponse<{
        disabled: false;
        is2FAEnabled: false;
        email: string;
        role: UserRole;
        accessToken: string;
        refreshToken: string;
    }> | undefined>;
    create_user_account_service(createUserDto: CreateUserDto): Promise<import("../shared/interfaces/aResponse").aResponse<{
        id: string;
        email: string;
    }> | undefined>;
    resend_user_confirmation_service(resendConfirmationDto: ResendConfirmationDto): Promise<import("../shared/interfaces/aResponse").aResponse<boolean> | undefined>;
    verify_email_service(verifyUserDto: verifyUserDto): Promise<import("../shared/interfaces/aResponse").aResponse<null> | undefined>;
    refresh_user_token_service(refreshUserDto: RefreshUserDto): Promise<void>;
    user_infomation_service(userid: string): Promise<import("../shared/interfaces/aResponse").aResponse<{
        id: string;
        firstName: string;
        lastName: string;
        disabled: false;
        last_updated: Date;
        email: string;
        occupation: string;
        phone_number: string;
        additional_note: string;
        address: string;
        dob: string;
        completion_percentage: string;
        role: UserRole;
        is2faEnabled: boolean;
    }> | undefined>;
    forget_password_service(dto: getOTPDTO): Promise<import("../shared/interfaces/aResponse").aResponse<boolean> | undefined>;
    reset_user_password_service(resetUserDTO: ResetPasswordDTO): Promise<import("../shared/interfaces/aResponse").aResponse<boolean> | undefined>;
    retrieve_user_2fa_service(userid: string): Promise<import("../shared/interfaces/aResponse").aResponse<{
        qrcode: any;
        secretKey: any;
    }> | undefined>;
    enable_user_two_factor_service(dto: EnableTwoFaDto, userid: string): Promise<import("../shared/interfaces/aResponse").aResponse<boolean> | undefined>;
    send_two_factor_via_email_service(userId: string): Promise<import("../shared/interfaces/aResponse").aResponse<boolean> | undefined>;
    enable_user_two_factor_via_email_service(userid: string, dto: EnableTwoFaDto): Promise<import("../shared/interfaces/aResponse").aResponse<boolean> | undefined>;
    disable_user_two_factor_service(userid: string): Promise<import("../shared/interfaces/aResponse").aResponse<boolean> | undefined>;
    send_sign_in_otp_via_email_service(dto: getOtpWithEmailDTO): Promise<import("../shared/interfaces/aResponse").aResponse<boolean> | undefined>;
    verify_user_sign_in_with_service(dto: loginUser2FaDTO): Promise<import("../shared/interfaces/aResponse").aResponse<{
        accessToken: string;
        refreshToken: string;
        is2FAEnabled: boolean;
        disabled: boolean;
        email: string;
        role: UserRole;
    }> | undefined>;
    verify_user_sign_in_with_via_email_service(dto: loginUser2FaDTO): Promise<import("../shared/interfaces/aResponse").aResponse<{
        accessToken: string;
        refreshToken: string;
        is2FAEnabled: boolean;
        disabled: boolean;
        email: string;
        role: UserRole;
    }> | undefined>;
    complet_user_onboard_service(completeDto: any): Promise<import("../shared/interfaces/aResponse").aResponse<{
        accessToken: string;
        refreshToken: string;
    }> | undefined>;
    update_user_profile_service(completeDto: any, userId: string): Promise<import("../shared/interfaces/aResponse").aResponse<string> | undefined>;
    change_user_password_service(dto: ChangePasswordDTO, userId: string): Promise<import("../shared/interfaces/aResponse").aResponse<boolean> | undefined>;
    private passwordChecker;
    createSuperAdmin(createUserDto: any): Promise<User[]>;
    createAdmin(createUserDto: CreateUserDto, token: string, expiresIn: Date): Promise<User>;
    updateRole(id: string, role: UserRole): Promise<import("typeorm").UpdateResult>;
    findAll(page?: number, limit?: number, search?: string): Promise<PaginatedResult<User>>;
    findAllManagers(page?: number, limit?: number, search?: string): Promise<PaginatedResult<User>>;
    findAllWhareHouseManager(page?: number, limit?: number, search?: string): Promise<PaginatedResult<User>>;
    findAllProcurements(page?: number, limit?: number, search?: string): Promise<PaginatedResult<User>>;
    findAllAnalyst(page?: number, limit?: number, search?: string): Promise<PaginatedResult<User>>;
    findAllStaffs(page?: number, limit?: number, search?: string): Promise<PaginatedResult<User>>;
    findAllAdmins(page?: number, limit?: number, search?: string): Promise<PaginatedResult<User>>;
    findUserById(id: string): Promise<User | null>;
    fetchUserHandler(id: string): Promise<import("../shared/interfaces/aResponse").aResponse<{
        id: string;
        email: string;
        address: string;
        firstName: string;
        lastName: string;
        date_of_birth: string;
        phone_number: string;
        additional_note: string;
        occupation: string;
        disabled: boolean;
        role: UserRole;
        createdAt: Date;
    }> | undefined>;
    setEmailToken(email: string, token: string, expiry: Date): Promise<import("typeorm").UpdateResult>;
    verifyEmail(email: string): Promise<import("typeorm").UpdateResult>;
    findOneByEmail(email: string): Promise<User | null>;
    login(id: string, email: string, role: UserRole): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    generateToken(id: string, email: string, role: UserRole): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    saveRefreshToken(id: string, token: string): Promise<import("typeorm").UpdateResult>;
    getExpiryDate(): Date;
    verifyRefreshToken(token: string): Promise<any | null>;
    createAccessToken(id: string, email: string, role: UserRole): Promise<string>;
    updateUserById(id: string, updateUserDto: any): Promise<import("typeorm").UpdateResult>;
    updateUserByEmail(id: string, criteria: any): Promise<import("typeorm").UpdateResult>;
    disableUserById(id: string, adminID: string): Promise<import("typeorm").UpdateResult>;
    enableUserById(id: string, adminID: string): Promise<import("typeorm").UpdateResult>;
    upgradeRoleByUserId(userId: string, newRole: UserRole): Promise<null | undefined>;
    registerUser(createUserDto: CreateUserData, hasReferal: boolean, referral?: User): Promise<import("../shared/interfaces/aResponse").aResponse<{
        id: string;
        email: string;
    }> | undefined>;
    register_A_Visitor_User(createUserDto: CreateVisitorAccountDto): Promise<{
        id: string;
        email: string;
    } | undefined>;
    verifyUser(verifyUserDto: verifyUserDTOzod): Promise<import("../shared/interfaces/aResponse").aResponse<null> | undefined>;
    loginUser(loginDto: loginUserDto): Promise<import("../shared/interfaces/aResponse").aResponse<{
        disabled: true;
        accessToken: null;
        refreshToken: null;
        email: string;
        is2FAEnabled: boolean;
        role: UserRole;
    }> | import("../shared/interfaces/aResponse").aResponse<{
        accessToken: null;
        refreshToken: null;
        role: UserRole;
        disabled: false;
        is2FAEnabled: true;
        email: string;
    }> | import("../shared/interfaces/aResponse").aResponse<{
        accessToken: null;
        refreshToken: null;
        role: UserRole;
        disabled: false;
        is2FAEnabled: false;
        email: string;
        onboard: ONBOARDLEVEL.CREATED;
    }> | import("../shared/interfaces/aResponse").aResponse<{
        disabled: false;
        is2FAEnabled: false;
        email: string;
        role: UserRole;
        accessToken: string;
        refreshToken: string;
    }> | undefined>;
    set_email_to_lowercase(email: string): string;
    createOauthUser(creatAuthUser: any): Promise<User[]>;
    private generateCardCode;
    private generateReferralCode;
    getReferredUsers(userId: string, page?: number, limit?: number): Promise<PaginatedResult<Partial<User>>>;
    updateProfileByUserId(req: CompleteProfileDto, userid: string): Promise<string>;
    private calculateFilledPercentage;
    private emailConfirmationSender;
    private resetPasswordSender;
    private enable_disable_TwoFactorSender;
    private twofactorCodeSender;
    private sender;
    private verifyToken;
}
