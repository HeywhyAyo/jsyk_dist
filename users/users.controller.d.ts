import { UsersService } from "./users.service";
import { loginUserDto } from "./dto/login-user.dto";
import { ResendConfirmationDto } from "./dto/resend-confirmation.dto";
import { verifyUserDto } from "./dto/verify-user.dto";
import { RefreshUserDto } from "./dto/refresh-token-user.dto";
import { CustomRequest } from "../shared/interfaces/CustomRequest";
import { getOTPDTO } from "./dto/get-otp.dto";
import { ChangePasswordDTO, ResetPasswordDTO } from "./dto/reset-password.dto";
import { EnableTwoFaDto, getOtpWithEmailDTO } from "./dto/enable-user.dto";
import { loginUser2FaDTO } from "./dto/login-TwoFa.dto";
import { NodemailerService } from "src/email/nodemailer.service";
import { CreateAddressDto } from "./dto/create-address.dto";
import { UpdateAddressDto } from "./dto/update.address.dto";
import { DeleteAddressDto } from "./dto/delete.address.dto";
import { CreateUserDto } from "./dto/create-user.dto";
export declare class UsersController {
    private readonly usersService;
    private nodemailerService;
    constructor(usersService: UsersService, nodemailerService: NodemailerService);
    login(loginUserDto: loginUserDto): Promise<import("../shared/interfaces/aResponse").aResponse<{
        disabled: true;
        accessToken: null;
        refreshToken: null;
        email: string;
        is2FAEnabled: boolean;
        role: import("./shared/enum/roleEnum").UserRole;
    }> | import("../shared/interfaces/aResponse").aResponse<{
        accessToken: null;
        refreshToken: null;
        role: import("./shared/enum/roleEnum").UserRole;
        disabled: false;
        is2FAEnabled: true;
        email: string;
    }> | import("../shared/interfaces/aResponse").aResponse<{
        accessToken: null;
        refreshToken: null;
        role: import("./shared/enum/roleEnum").UserRole;
        disabled: false;
        is2FAEnabled: false;
        email: string;
        onboard: import("./shared/enum/onboard").ONBOARDLEVEL.CREATED;
    }> | import("../shared/interfaces/aResponse").aResponse<{
        disabled: false;
        is2FAEnabled: false;
        email: string;
        role: import("./shared/enum/roleEnum").UserRole;
        accessToken: string;
        refreshToken: string;
    }> | undefined>;
    create(createUserDto: CreateUserDto): Promise<import("../shared/interfaces/aResponse").aResponse<{
        id: string;
        email: string;
    }> | undefined>;
    resend(resendConfirmationDto: ResendConfirmationDto): Promise<import("../shared/interfaces/aResponse").aResponse<boolean> | undefined>;
    verify(verifyUserDto: verifyUserDto): Promise<import("../shared/interfaces/aResponse").aResponse<null> | undefined>;
    refreshUserToken(refreshUserDto: RefreshUserDto): Promise<void>;
    findOnewithJWT(req: CustomRequest): Promise<import("../shared/interfaces/aResponse").aResponse<{
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
        role: import("./shared/enum/roleEnum").UserRole;
        is2faEnabled: boolean;
    }> | undefined>;
    getResetOTP(getOTP: getOTPDTO): Promise<import("../shared/interfaces/aResponse").aResponse<boolean> | undefined>;
    resetPassword(resetUserDTO: ResetPasswordDTO): Promise<import("../shared/interfaces/aResponse").aResponse<boolean> | undefined>;
    requestOTP(req: CustomRequest): Promise<import("../shared/interfaces/aResponse").aResponse<{
        qrcode: any;
        secretKey: any;
    }> | undefined>;
    enableTwoFA(enableUserTwoFA: EnableTwoFaDto, req: CustomRequest): Promise<import("../shared/interfaces/aResponse").aResponse<boolean> | undefined>;
    sendOtPtoEmail(req: CustomRequest): Promise<import("../shared/interfaces/aResponse").aResponse<boolean> | undefined>;
    enableTwoFAviaEmail(enableUserTwoFA: EnableTwoFaDto, req: CustomRequest): Promise<import("../shared/interfaces/aResponse").aResponse<boolean> | undefined>;
    disableTwoFA(req: CustomRequest): Promise<import("../shared/interfaces/aResponse").aResponse<boolean> | undefined>;
    getOTPwithEmail(res: Response, getByEmailDTO: getOtpWithEmailDTO): Promise<import("../shared/interfaces/aResponse").aResponse<boolean> | undefined>;
    loginWithTwoFa(loginUserDto: loginUser2FaDTO): Promise<import("../shared/interfaces/aResponse").aResponse<{
        accessToken: string;
        refreshToken: string;
        is2FAEnabled: boolean;
        disabled: boolean;
        email: string;
        role: import("./shared/enum/roleEnum").UserRole;
    }> | undefined>;
    loginWithTwoFawithEmail(loginUserDto: loginUser2FaDTO): Promise<import("../shared/interfaces/aResponse").aResponse<{
        accessToken: string;
        refreshToken: string;
        is2FAEnabled: boolean;
        disabled: boolean;
        email: string;
        role: import("./shared/enum/roleEnum").UserRole;
    }> | undefined>;
    CompleteProfile(completeDto: any): Promise<import("../shared/interfaces/aResponse").aResponse<{
        accessToken: string;
        refreshToken: string;
    }> | undefined>;
    UpdateProfile(completeDto: any, req: CustomRequest): Promise<import("../shared/interfaces/aResponse").aResponse<string> | undefined>;
    changePassword(changepassWordDTO: ChangePasswordDTO, req: CustomRequest): Promise<import("../shared/interfaces/aResponse").aResponse<string> | undefined>;
    getUserAddresses(req: CustomRequest): Promise<import("./entities/address.entity").Address[] | null>;
    createAddresses(CreateAddressDto: CreateAddressDto, req: CustomRequest): Promise<import("../shared/interfaces/aResponse").aResponse<import("./entities/address.entity").Address> | undefined>;
    UpdateAddressDto(UpdateAddressDto: UpdateAddressDto, req: CustomRequest): Promise<import("../shared/interfaces/aResponse").aResponse<null> | undefined>;
    DeleteAddressDto(DeleteAddressDto: DeleteAddressDto, req: CustomRequest): Promise<import("../shared/interfaces/aResponse").aResponse<null> | undefined>;
}
