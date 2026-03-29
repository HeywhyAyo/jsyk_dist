"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const roleEnum_1 = require("./shared/enum/roleEnum");
const apiResponse_1 = require("../shared/utilities/apiResponse");
const bcrypt_util_1 = require("./utils/bcrypt.util");
const generateToken_1 = require("../shared/utilities/generateToken");
const onboard_1 = require("./shared/enum/onboard");
const complete_profile_1 = require("./dto/complete.profile");
const nodemailer_service_1 = require("../email/nodemailer.service");
const responseComment_1 = require("../shared/constant/responseComment");
const insertContent_1 = require("../shared/utilities/insertContent");
const emailSubjects_1 = require("../shared/constant/emailSubjects");
const emailServiceToken_1 = require("../shared/constant/emailServiceToken");
const template_names_1 = require("../shared/constant/template.names");
const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
const emergency_expire_1 = require("../shared/constant/emergency.expire");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const rethrow_exception_1 = require("../shared/utilities/rethrow-exception");
let UsersService = class UsersService {
    userRepository;
    jwtService;
    nodemailerService;
    emailService;
    constructor(userRepository, jwtService, nodemailerService, emailService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.nodemailerService = nodemailerService;
        this.emailService = emailService;
    }
    async create(createUserDto, token, expiresIn) {
        const newUser = this.userRepository.create({
            ...createUserDto,
            emailVerificationToken: token,
            emailVerificationTokenExpiry: expiresIn,
        });
        return await this.userRepository.save(newUser);
    }
    async createVisitorAccount(createUserDto, password, token, expiresIn) {
        const newUser = this.userRepository.create({
            ...createUserDto,
            password,
            emailVerificationToken: token,
            emailVerificationTokenExpiry: expiresIn,
        });
        return await this.userRepository.save(newUser);
    }
    async sign_in_User_service(dto) {
        try {
            if (!dto.email || !dto.password) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("Email or password cannot be empty");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.NOT_FOUND);
            }
            dto.email = this.set_email_to_lowercase(dto.email);
            return await this.loginUser(dto);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async create_user_account_service(createUserDto) {
        const { email, password, confirmpassword } = createUserDto;
        try {
            if (!email || !confirmpassword || !password) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(responseComment_1.COMMENT.CHECK_INPUT);
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            if (email.trim() === "" ||
                password.trim() === "" ||
                confirmpassword.trim() === "") {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("Empty field");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!email.includes("@")) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("Please provide a valid email address");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            if (password !== confirmpassword) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("Passwords do not match. please check password and confirm password fields");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            if (password.length < 8) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("Password must be at least 8 characters long");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!this.passwordChecker(password)) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(responseComment_1.COMMENT.UNQUALIFIED_PASSWORD);
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            createUserDto.email = this.set_email_to_lowercase(createUserDto.email);
            const CreateUserData = {
                email: createUserDto.email,
                password: createUserDto.password,
            };
            return await this.registerUser(CreateUserData, false);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(responseComment_1.COMMENT.INTERNAL_ERROR_COMMENT);
            throw new common_1.HttpException(apiResponse, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async resend_user_confirmation_service(resendConfirmationDto) {
        try {
            if (!resendConfirmationDto.email) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(responseComment_1.COMMENT.CHECK_INPUT);
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            resendConfirmationDto.email = this.set_email_to_lowercase(resendConfirmationDto.email);
            const user = await this.findOneByEmail(resendConfirmationDto.email);
            if (user === null) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("A user with this email does not exist");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            if (user?.disabled === true) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("Account disabled due to irregular activity. Please contact support.");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            if (user?.isEmailVerified === true) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("This email is already verified");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const token = (0, generateToken_1.generateToken)();
            const expiresIn = new Date(Date.now() + 60 * 60 * 1000);
            const updateUser = await this.setEmailToken(resendConfirmationDto.email, token, expiresIn);
            if (!updateUser.affected || updateUser.affected === 0) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("Token field not updated");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            if (!user) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("A user with this email does not exist");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const emailData = {
                email: user.email,
                token,
                firstName: user.firstName ?? "User",
            };
            await this.emailConfirmationSender(emailData);
            return (0, apiResponse_1.createResponse)(true, "Email sent successfully", true);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async verify_email_service(verifyUserDto) {
        try {
            const { email, token } = verifyUserDto;
            if (!email || !token) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(responseComment_1.COMMENT.CHECK_INPUT);
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            verifyUserDto.email = verifyUserDto.email.toLowerCase();
            return await this.verifyUser(verifyUserDto);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async refresh_user_token_service(refreshUserDto) {
        try {
            const { token, email } = refreshUserDto;
            if (!token || !email) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(responseComment_1.COMMENT.CHECK_INPUT);
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            refreshUserDto.email = refreshUserDto.email.toLowerCase();
            const user = await this.findOneByEmail(refreshUserDto.email);
            if (user === null) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("A user with this email does not exist");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            if (user.disabled === true) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("Account disabled due to irregular activity. Please contact support.");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.FORBIDDEN);
            }
            if (user.isEmailVerified === false) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("This account has not been verified");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            if (user.refreshToken !== token) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("Invalid Refresh token");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const hasExpired = await this.verifyRefreshToken(token);
            if (hasExpired === null) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("Refresh token is invalid or expired");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const accessToken = await this.createAccessToken(user.id, user.email, user.role);
            const apiResponse = (0, apiResponse_1.createResponse)(true, "New access token generated", accessToken);
            throw new common_1.HttpException(apiResponse, common_1.HttpStatus.OK);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async user_infomation_service(userid) {
        try {
            const user = await this.findUserById(userid);
            if (user === null) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(responseComment_1.COMMENT.USER_NOT_FOUND);
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            if (user.disabled === true) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("Account disabled due to irregular activity. Please contact support.");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.FORBIDDEN);
            }
            const percentage = this.calculateFilledPercentage(user);
            const percent2dp = `${percentage.toFixed(2)}%`;
            const data = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                disabled: user.disabled,
                last_updated: user.updatedAt,
                email: user.email,
                occupation: user.company_name,
                phone_number: user.phone_number,
                additional_note: user.additional_note,
                address: user.address,
                dob: user.date_of_birth,
                completion_percentage: percent2dp,
                role: user.role,
                is2faEnabled: user.is2FAEnabled,
            };
            return (0, apiResponse_1.createResponse)(true, "User found", data);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async forget_password_service(dto) {
        try {
            if (!dto.email) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(responseComment_1.COMMENT.EMAIL_IS_REQUIRED);
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            dto.email = this.set_email_to_lowercase(dto.email);
            const user = await this.findOneByEmail(dto.email);
            if (!user) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(responseComment_1.COMMENT.USER_NOT_FOUND);
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const token = (0, generateToken_1.generateToken)();
            const expiresIn = new Date(Date.now() + 60 * 60 * 1000);
            const updateUser = await this.updateUserById(user.id, {
                passwordResetToken: token,
                passwordResetTokenExpiry: expiresIn,
            });
            if (!updateUser || updateUser.affected === 0) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("Something went wrong, The user was not updated.");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            const emailData = {
                email: user.email,
                token,
                expiresIn,
                firstName: user.firstName,
            };
            await this.resetPasswordSender(emailData);
            return (0, apiResponse_1.createResponse)(true, "Sent One time code to your email", true);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async reset_user_password_service(resetUserDTO) {
        const { token, newPassword } = resetUserDTO;
        if (!resetUserDTO.email || !token || !newPassword) {
            const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(responseComment_1.COMMENT.CHECK_INPUT);
            throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
        }
        resetUserDTO.email = this.set_email_to_lowercase(resetUserDTO.email);
        try {
            const user = await this.findOneByEmail(resetUserDTO.email);
            if (user === null) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("User not found");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            if (user.passwordResetToken === null ||
                user.passwordResetToken !== token) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("Password reset token is invalid or has already been used.");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            if (user.passwordResetTokenExpiry &&
                user.passwordResetTokenExpiry < new Date()) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(responseComment_1.COMMENT.TOKEN_EXPIRED);
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!this.passwordChecker(newPassword)) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(responseComment_1.COMMENT.UNQUALIFIED_PASSWORD);
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const hashedPassword = await (0, bcrypt_util_1.hashPassword)(newPassword);
            const changeUserPassword = await this.updateUserById(user.id, {
                passwordResetToken: null,
                passwordResetTokenExpiry: null,
                password: hashedPassword,
            });
            if (!changeUserPassword || changeUserPassword.affected === 0) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("Password reset token is invalid or has already been used.");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return (0, apiResponse_1.createResponse)(true, "Password updated", true);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async retrieve_user_2fa_service(userid) {
        try {
            const user = await this.findUserById(userid);
            if (user === null) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(responseComment_1.COMMENT.USER_NOT_FOUND);
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            if (user.is2FAEnabled === true) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("Two Factor is enabled already");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const secret = speakeasy.generateSecret({
                name: `Medinfocard (${user.email})`,
                issuer: "Medinfocard",
            });
            if (!secret.otpauth_url) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(responseComment_1.COMMENT.INTERNAL_ERROR_COMMENT);
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            const updateResult = await this.updateUserById(userid, {
                totpSecret: secret.base32,
            });
            if (!updateResult || updateResult.affected === 0) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("User not updated");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            const qrDataUrl = await qrcode.toDataURL(secret.otpauth_url);
            const data = {
                qrcode: qrDataUrl,
                secretKey: secret.base32,
            };
            return (0, apiResponse_1.createResponse)(true, "Scan this qr code with authenticator or input the secret key into the app", data);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async enable_user_two_factor_service(dto, userid) {
        try {
            const { code } = dto;
            if (!code) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(responseComment_1.COMMENT.CHECK_INPUT);
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const user = await this.findUserById(userid);
            if (!user) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(responseComment_1.COMMENT.USER_NOT_FOUND);
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const userSecret = user.totpSecret;
            const isVerified = this.verifyToken(code, userSecret);
            if (isVerified === false) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("Invalid Code");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            await this.updateUserById(userid, {
                is2FAEnabled: true,
            });
            const emailData = {
                firstName: user.firstName,
                email: user.email,
                status: "enabled",
            };
            await this.enable_disable_TwoFactorSender(emailData);
            return (0, apiResponse_1.createResponse)(true, "You have successfully enabled 2FA", true);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async send_two_factor_via_email_service(userId) {
        try {
            const user = await this.findUserById(userId);
            if (!user) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(responseComment_1.COMMENT.USER_NOT_FOUND);
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const userSecret = user.totpSecret;
            const token = speakeasy.totp({
                secret: userSecret,
                encoding: "base32",
                step: emergency_expire_1.TIMING.EMAIL_TOKEN_EXPIRY_TIME
            });
            const emailData = {
                userName: user.firstName,
                code: token,
                email: user.email
            };
            await this.twofactorCodeSender(emailData);
            return (0, apiResponse_1.createResponse)(true, "Code Sent", true);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async enable_user_two_factor_via_email_service(userid, dto) {
        const { code } = dto;
        if (!code) {
            const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(responseComment_1.COMMENT.CHECK_INPUT);
            throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
        }
        try {
            const user = await this.findUserById(userid);
            if (!user) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(responseComment_1.COMMENT.USER_NOT_FOUND);
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const userSecret = user.totpSecret;
            const isVerified = speakeasy.totp.verify({
                secret: userSecret,
                token: code,
                encoding: "base32",
                window: 1,
                step: emergency_expire_1.TIMING.EMAIL_TOKEN_EXPIRY_TIME
            });
            if (isVerified === false) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("Invalid Code");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            await this.updateUserById(userid, {
                is2FAEnabled: true,
            });
            const emailData = {
                firstName: user.firstName,
                email: user.email,
                status: "Enabled",
            };
            await this.enable_disable_TwoFactorSender(emailData);
            return (0, apiResponse_1.createResponse)(true, "You have successfully enabled 2FA", true);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async disable_user_two_factor_service(userid) {
        try {
            const user = await this.findUserById(userid);
            if (!user) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(responseComment_1.COMMENT.USER_NOT_FOUND);
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            await this.updateUserById(userid, {
                is2FAEnabled: false,
            });
            const emailData = {
                firstName: user.firstName,
                email: user.email,
                status: "Disabled",
            };
            await this.enable_disable_TwoFactorSender(emailData);
            return (0, apiResponse_1.createResponse)(true, "You have successfully disabled 2FA", true);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async send_sign_in_otp_via_email_service(dto) {
        try {
            if (!dto.email) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(responseComment_1.COMMENT.CHECK_INPUT);
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            dto.email = this.set_email_to_lowercase(dto.email);
            const user = await this.findOneByEmail(dto.email);
            if (user === null) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(responseComment_1.COMMENT.USER_NOT_FOUND);
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            if (user.is2FAEnabled === false) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("Please enable you 2FA");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const userSecret = user.totpSecret;
            const token = speakeasy.totp({
                secret: userSecret,
                encoding: "base32",
                step: emergency_expire_1.TIMING.EMAIL_TOKEN_EXPIRY_TIME
            });
            const emailData = {
                userName: user.firstName,
                code: token,
                email: user.email
            };
            await this.twofactorCodeSender(emailData);
            return (0, apiResponse_1.createResponse)(true, "Code Sent", true);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async verify_user_sign_in_with_service(dto) {
        try {
            if (dto.email === null || dto.token === null) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(responseComment_1.COMMENT.CHECK_INPUT);
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            dto.email = dto.email.toLowerCase();
            const user = await this.findOneByEmail(dto.email);
            if (!user) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(responseComment_1.COMMENT.EMAIL_USER_NOT_FOUND);
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const userSecret = user.totpSecret;
            const isVerified = speakeasy.totp.verify({
                secret: userSecret,
                token: dto.token,
                encoding: "base32",
                window: 1,
            });
            if (isVerified === false) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(responseComment_1.COMMENT.INVALID_2FA_CODE);
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const tokens = await this.login(user.id, user.email, user.role);
            await this.saveRefreshToken(user.id, tokens.refreshToken);
            const Resdata = {
                is2FAEnabled: user.is2FAEnabled,
                disabled: user.disabled,
                email: user.email,
                role: user.role,
                ...tokens,
            };
            return (0, apiResponse_1.createResponse)(true, "Login success", Resdata);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async verify_user_sign_in_with_via_email_service(dto) {
        try {
            if (dto.email === null || dto.token === null) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(responseComment_1.COMMENT.CHECK_INPUT);
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            dto.email = dto.email.toLowerCase();
            const user = await this.findOneByEmail(dto.email);
            if (!user) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(responseComment_1.COMMENT.EMAIL_USER_NOT_FOUND);
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const userSecret = user.totpSecret;
            const isVerified = speakeasy.totp.verify({
                secret: userSecret,
                token: dto.token,
                encoding: "base32",
                window: 1,
                step: emergency_expire_1.TIMING.EMAIL_TOKEN_EXPIRY_TIME
            });
            if (isVerified === false) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(responseComment_1.COMMENT.INVALID_2FA_CODE);
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const tokens = await this.login(user.id, user.email, user.role);
            await this.saveRefreshToken(user.id, tokens.refreshToken);
            const Resdata = {
                is2FAEnabled: user.is2FAEnabled,
                disabled: user.disabled,
                email: user.email,
                role: user.role,
                ...tokens,
            };
            return (0, apiResponse_1.createResponse)(true, "Login success", Resdata);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async complet_user_onboard_service(completeDto) {
        try {
            const dto = (0, class_transformer_1.plainToInstance)(complete_profile_1.CompleteProfileDto, completeDto);
            const errors = await (0, class_validator_1.validate)(dto);
            if (errors.length > 0) {
                const messages = errors
                    .map((err) => (err.constraints ? Object.values(err.constraints) : []))
                    .flat();
                const validationRes = {
                    data: null,
                    message: messages.join(", "),
                    successful: false,
                };
                throw new common_1.HttpException(validationRes, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!completeDto) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(responseComment_1.COMMENT.CHECK_INPUT);
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const email = this.set_email_to_lowercase(dto.email);
            if (!email.includes("@")) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("Please provide a valid email address");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const user = await this.findOneByEmail(email);
            if (!user) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(responseComment_1.COMMENT.USER_NOT_FOUND);
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            if (user.onboard > onboard_1.ONBOARDLEVEL.CREATED) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("You have completed your onboarding already, you canot redo the operation");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const UpdateUserData = {
                firstName: dto.firstName,
                lastName: dto.lastName,
                phone_number: dto.phone_number,
                date_of_birth: dto.date_of_birth,
                address: dto.address,
                additional_note: dto.additional_note,
                company_name: dto.company_name,
                onboard: onboard_1.ONBOARDLEVEL.PROFILE,
            };
            await this.updateUserById(user.id, UpdateUserData);
            const updatedUserEntity = await this.findUserById(user.id);
            const tokens = await this.generateToken(user.id, user.email, user.role);
            await this.saveRefreshToken(user.id, tokens.refreshToken);
            return (0, apiResponse_1.createResponse)(true, "profile completed successfully", tokens);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async update_user_profile_service(completeDto, userId) {
        try {
            const dto = (0, class_transformer_1.plainToInstance)(complete_profile_1.CompleteProfileDto, completeDto);
            const errors = await (0, class_validator_1.validate)(dto);
            if (errors.length > 0) {
                const messages = errors
                    .map((err) => (err.constraints ? Object.values(err.constraints) : []))
                    .flat();
                const validationRes = {
                    data: null,
                    message: messages.join(", "),
                    successful: false,
                };
                throw new common_1.HttpException(validationRes, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!completeDto) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("Bad request");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!userId) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("User not identified");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const userUpdatedEmail = await this.updateProfileByUserId(completeDto, userId);
            if (!userUpdatedEmail) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(responseComment_1.COMMENT.USER_NOT_FOUND);
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            return (0, apiResponse_1.createResponse)(true, "profile Updated successfully", userUpdatedEmail);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async change_user_password_service(dto, userId) {
        try {
            const { currentPassword, newPassword } = dto;
            if (!currentPassword || !newPassword) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("Request body is incomplete");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const user = await this.findUserById(userId);
            if (user === null) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(responseComment_1.COMMENT.USER_NOT_FOUND);
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const isPasswordCorrect = await (0, bcrypt_util_1.comparePasswords)(currentPassword, user.password);
            if (isPasswordCorrect === false) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("Current password is incorrect");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const hashedPassword = await (0, bcrypt_util_1.hashPassword)(newPassword);
            const changeUserPassword = await this.updateUserById(user.id, {
                password: hashedPassword,
            });
            if (!changeUserPassword || changeUserPassword.affected === 0) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("Password cannot be changed, due to glitch please contact administrator");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            return (0, apiResponse_1.createResponse)(true, "Password changed successfully", true);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    passwordChecker(password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/;
        return Promise.resolve(regex.test(password));
    }
    async createSuperAdmin(createUserDto) {
        const newUser = this.userRepository.create({
            ...createUserDto,
            role: roleEnum_1.UserRole.SUPERADMIN,
        });
        return await this.userRepository.save(newUser);
    }
    async createAdmin(createUserDto, token, expiresIn) {
        const newUser = this.userRepository.create({
            ...createUserDto,
            role: roleEnum_1.UserRole.ADMIN,
            emailVerificationTokenExpiry: expiresIn,
            emailVerificationToken: token,
        });
        return await this.userRepository.save(newUser);
    }
    async updateRole(id, role) {
        return await this.userRepository.update(id, {
            role,
        });
    }
    async findAll(page = 1, limit = 10, search) {
        const skip = (page - 1) * limit;
        const whereCondition = search
            ? {
                email: (0, typeorm_2.ILike)(`%${search}%`),
            }
            : {};
        const [items, total] = await this.userRepository.findAndCount({
            where: whereCondition,
            skip,
            take: limit,
            order: { createdAt: "DESC" },
        });
        return {
            data: items,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async findAllManagers(page = 1, limit = 10, search) {
        const skip = (page - 1) * limit;
        const whereCondition = search
            ? {
                email: (0, typeorm_2.ILike)(`%${search}%`),
                role: roleEnum_1.UserRole.MANAGER,
            }
            : { role: roleEnum_1.UserRole.MANAGER };
        const [items, total] = await this.userRepository.findAndCount({
            where: whereCondition,
            skip,
            take: limit,
            order: { createdAt: "DESC" },
        });
        return {
            data: items,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async findAllWhareHouseManager(page = 1, limit = 10, search) {
        const skip = (page - 1) * limit;
        const whereCondition = search
            ? {
                email: (0, typeorm_2.ILike)(`%${search}%`),
                role: roleEnum_1.UserRole.WHARE_HOUSE_MANAGER,
            }
            : { role: roleEnum_1.UserRole.WHARE_HOUSE_MANAGER };
        const [items, total] = await this.userRepository.findAndCount({
            where: whereCondition,
            skip,
            take: limit,
            order: { createdAt: "DESC" },
        });
        return {
            data: items,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async findAllProcurements(page = 1, limit = 10, search) {
        const skip = (page - 1) * limit;
        const whereCondition = search
            ? {
                email: (0, typeorm_2.ILike)(`%${search}%`),
                role: roleEnum_1.UserRole.PROCUREMENT,
            }
            : { role: roleEnum_1.UserRole.PROCUREMENT };
        const [items, total] = await this.userRepository.findAndCount({
            where: whereCondition,
            skip,
            take: limit,
            order: { createdAt: "DESC" },
        });
        return {
            data: items,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async findAllAnalyst(page = 1, limit = 10, search) {
        const skip = (page - 1) * limit;
        const whereCondition = search
            ? {
                email: (0, typeorm_2.ILike)(`%${search}%`),
                role: roleEnum_1.UserRole.ANALYST,
            }
            : { role: roleEnum_1.UserRole.ANALYST };
        const [items, total] = await this.userRepository.findAndCount({
            where: whereCondition,
            skip,
            take: limit,
            order: { createdAt: "DESC" },
        });
        return {
            data: items,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async findAllStaffs(page = 1, limit = 10, search) {
        const skip = (page - 1) * limit;
        const whereCondition = search
            ? {
                email: (0, typeorm_2.ILike)(`%${search}%`),
                role: roleEnum_1.UserRole.STAFF,
            }
            : { role: roleEnum_1.UserRole.STAFF };
        const [items, total] = await this.userRepository.findAndCount({
            where: whereCondition,
            skip,
            take: limit,
            order: { createdAt: "DESC" },
        });
        return {
            data: items,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async findAllAdmins(page = 1, limit = 10, search) {
        const skip = (page - 1) * limit;
        const whereCondition = search
            ? {
                email: (0, typeorm_2.ILike)(`%${search}%`),
                role: roleEnum_1.UserRole.ADMIN,
            }
            : { role: roleEnum_1.UserRole.ADMIN };
        const [items, total] = await this.userRepository.findAndCount({
            where: whereCondition,
            skip,
            take: limit,
            order: { createdAt: "DESC" },
        });
        return {
            data: items,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async findUserById(id) {
        try {
            return await this.userRepository.findOne({
                where: {
                    id,
                },
            });
        }
        catch (error) {
            console.error(error);
            return null;
        }
    }
    async fetchUserHandler(id) {
        try {
            const user = await this.findUserById(id);
            if (!user) {
                throw new common_1.HttpException((0, apiResponse_1.createUnSuccessfulResponse)("User does not exist"), common_1.HttpStatus.NOT_FOUND);
            }
            const data = {
                id: user.id,
                email: user.email,
                address: user.address,
                firstName: user.firstName,
                lastName: user.lastName,
                date_of_birth: user.date_of_birth,
                phone_number: user.phone_number,
                additional_note: user.additional_note,
                occupation: user.company_name,
                disabled: user.disabled,
                role: user.role,
                createdAt: user.createdAt,
            };
            return (0, apiResponse_1.createResponse)(true, "User fetched", data);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async setEmailToken(email, token, expiry) {
        return await this.userRepository.update({ email }, {
            emailVerificationToken: token,
            emailVerificationTokenExpiry: expiry,
        });
    }
    async verifyEmail(email) {
        return await this.userRepository.update({ email }, {
            emailVerificationToken: "",
            isEmailVerified: true,
            emailVerificationTokenExpiry: null,
        });
    }
    async findOneByEmail(email) {
        return await this.userRepository.findOne({
            where: {
                email,
            },
        });
    }
    async login(id, email, role) {
        const payload = { id, email, role };
        const accessToken = this.jwtService.sign(payload, {
            secret: process.env.SECRET_KEY ?? "",
            expiresIn: "5h",
        });
        const refreshToken = this.jwtService.sign(payload, {
            secret: process.env.REFRESH_SECRET_KEY ?? "",
            expiresIn: "7d",
        });
        return {
            accessToken,
            refreshToken,
        };
    }
    async generateToken(id, email, role) {
        const payload = { id, email, role };
        const accessToken = this.jwtService.sign(payload, {
            secret: process.env.SECRET_KEY ?? "",
            expiresIn: "5h",
        });
        const refreshToken = this.jwtService.sign(payload, {
            secret: process.env.REFRESH_SECRET_KEY ?? "",
            expiresIn: "7d",
        });
        return {
            accessToken,
            refreshToken,
        };
    }
    async saveRefreshToken(id, token) {
        return this.userRepository.update({ id }, {
            refreshToken: token,
        });
    }
    getExpiryDate() {
        return new Date(Date.now() + 60 * 60 * 1000);
    }
    async verifyRefreshToken(token) {
        try {
            return this.jwtService.verify(token, {
                secret: process.env.REFRESH_SECRET_KEY,
            });
        }
        catch (err) {
            return null;
        }
    }
    async createAccessToken(id, email, role) {
        const payload = { id, email, role };
        return this.jwtService.sign(payload, {
            secret: process.env.SECRET_KEY ?? "",
            expiresIn: "15m",
        });
    }
    async updateUserById(id, updateUserDto) {
        return await this.userRepository.update(id, {
            ...updateUserDto,
        });
    }
    async updateUserByEmail(id, criteria) {
        return await this.userRepository.update(id, criteria);
    }
    async disableUserById(id, adminID) {
        return await this.userRepository.update(id, {
            disabled: true,
            enabledBy: null,
            disabledBy: {
                adminID,
                timestamp: new Date().toISOString(),
            },
        });
    }
    async enableUserById(id, adminID) {
        return await this.userRepository.update(id, {
            disabled: false,
            disabledBy: null,
            enabledBy: {
                adminID,
                timestamp: new Date().toISOString(),
            },
        });
    }
    async upgradeRoleByUserId(userId, newRole) {
        const user = await this.userRepository.findOne({
            where: {
                id: userId,
            },
        });
        if (!user) {
            return null;
        }
        user.role = newRole;
        await this.userRepository.save(user);
    }
    async registerUser(createUserDto, hasReferal, referral) {
        try {
            const user = await this.findOneByEmail(createUserDto.email);
            if (user && user.disabled === true) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("Account disabled due to irregular activity. Please contact support.");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.FORBIDDEN);
            }
            if (user !== null) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("A user with this email already exists");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.CONFLICT);
            }
            const hashedPassword = await (0, bcrypt_util_1.hashPassword)(createUserDto.password);
            createUserDto.password = hashedPassword;
            const token = (0, generateToken_1.generateToken)();
            const tokenExpiresIn = this.getExpiryDate();
            let newUser;
            newUser = await this.create(createUserDto, token, tokenExpiresIn);
            if (!newUser) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("User cannot be created");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            const emailData = {
                email: newUser.email,
                token,
                firstName: newUser.firstName ?? "User"
            };
            await this.emailConfirmationSender(emailData);
            const apiResponse = (0, apiResponse_1.createResponse)(true, "User created", {
                id: newUser.id,
                email: newUser.email,
            });
            return apiResponse;
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async register_A_Visitor_User(createUserDto) {
        try {
            const user = await this.findOneByEmail(createUserDto.email);
            if (user && user.disabled === true) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("Account disabled due to irregular activity. Please contact support.");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.FORBIDDEN);
            }
            if (user !== null) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("A user with this email already exists");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.CONFLICT);
            }
            const hashedPassword = await (0, bcrypt_util_1.hashPassword)(process.env.DEFAULT_VISITOR_PASSWORD || "Visitor@123");
            const token = (0, generateToken_1.generateToken)();
            const tokenExpiresIn = this.getExpiryDate();
            let newUser;
            newUser = await this.createVisitorAccount(createUserDto, hashedPassword, token, tokenExpiresIn);
            if (!newUser) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("User cannot be created");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            const data = {
                id: newUser.id,
                email: newUser.email,
            };
            return data;
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async verifyUser(verifyUserDto) {
        try {
            const { email, token } = verifyUserDto;
            const user = await this.findOneByEmail(email);
            if (!user) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("User not found");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            if (user.disabled === true) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("Account disabled due to irregular activity. Please contact support.");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            if (user.isEmailVerified === true) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("This email is already verified");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            if (user.emailVerificationTokenExpiry &&
                user.emailVerificationTokenExpiry < new Date()) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("Token expired, Request for a new one.");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            if (user.emailVerificationToken !== token) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("Invalid Token");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            await this.verifyEmail(user.email);
            const apiResponse = (0, apiResponse_1.createResponse)(true, "Email verified", null);
            return apiResponse;
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async loginUser(loginDto) {
        try {
            const { email, password } = loginDto;
            const user = await this.findOneByEmail(email);
            if (user === null) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("A user with this email does not exist");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.NOT_FOUND);
            }
            if (user.disabled === true) {
                const data = {
                    disabled: user.disabled,
                    accessToken: null,
                    refreshToken: null,
                    email: user.email,
                    is2FAEnabled: user.is2FAEnabled,
                    role: user.role,
                };
                const apiResponse = (0, apiResponse_1.createResponse)(false, "Account disabled due to irregular activity. Please contact support.", data);
                return apiResponse;
            }
            if (user.isEmailVerified === false) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("This account has not been verified");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const isPassword = await (0, bcrypt_util_1.comparePasswords)(password, user.password);
            if (isPassword === false) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("Incorrect email or password");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.UNAUTHORIZED);
            }
            if (user.is2FAEnabled === true) {
                const data = {
                    accessToken: null,
                    refreshToken: null,
                    role: user.role,
                    disabled: user.disabled,
                    is2FAEnabled: user.is2FAEnabled,
                    email: user.email,
                };
                const apiResponse = (0, apiResponse_1.createResponse)(true, "Provide code from authenticator app", data);
                return apiResponse;
            }
            if (user.onboard === onboard_1.ONBOARDLEVEL.CREATED) {
                const data = {
                    accessToken: null,
                    refreshToken: null,
                    role: user.role,
                    disabled: user.disabled,
                    is2FAEnabled: user.is2FAEnabled,
                    email: user.email,
                    onboard: user.onboard,
                };
                const apiResponse = (0, apiResponse_1.createResponse)(true, "Please complete your profile", data);
                return apiResponse;
            }
            const tokens = await this.login(user.id, user.email, user.role);
            await this.saveRefreshToken(user.id, tokens.refreshToken);
            const data = {
                ...tokens,
                disabled: user.disabled,
                is2FAEnabled: user.is2FAEnabled,
                email: user.email,
                role: user.role,
            };
            const apiResponse = (0, apiResponse_1.createResponse)(true, "Login successful", data);
            return apiResponse;
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    set_email_to_lowercase(email) {
        return email.toLowerCase();
    }
    async createOauthUser(creatAuthUser) {
        const newUser = this.userRepository.create(creatAuthUser);
        return await this.userRepository.save(newUser);
    }
    generateCardCode(length = 8) {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let result = "";
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return `CARD-${result}`;
    }
    generateReferralCode(length = 8) {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let result = "";
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }
    async getReferredUsers(userId, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const query = this.userRepository
            .createQueryBuilder("user")
            .select([
            "user.id",
            "user.firstName",
            "user.lastName",
            "user.email",
            "user.referral_code",
            "user.phone_number",
            "user.gender",
            "user.date_of_birth",
        ])
            .where("user.referrerId = :userId", { userId })
            .orderBy("user.createdAt", "DESC")
            .skip(skip)
            .take(limit);
        const [items, total] = await query.getManyAndCount();
        return {
            data: items,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async updateProfileByUserId(req, userid) {
        const existingProfile = await this.findUserById(userid);
        if (!existingProfile) {
            const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("Profile not found");
            throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
        }
        const updatedProfileData = {
            firstName: req.firstName ?? existingProfile.firstName,
            lastName: req.lastName ?? existingProfile.lastName,
            phone_number: req.phone_number ?? existingProfile.phone_number,
            date_of_birth: req.date_of_birth ?? existingProfile.date_of_birth,
            address: req.address ?? existingProfile.address,
            additional_note: req.additional_note ?? existingProfile.additional_note,
            company_name: req.company_name ?? existingProfile.company_name
        };
        await this.updateUserById(userid, updatedProfileData);
        return existingProfile.email;
    }
    calculateFilledPercentage(entity) {
        const keys = Object.keys(entity);
        const total = keys.length;
        const filled = keys.filter((key) => entity[key] !== null && entity[key] !== undefined).length;
        return (filled / total) * 100;
    }
    async emailConfirmationSender(data) {
        const emailParameters = {
            name: data.firstName,
            callback: data.token,
        };
        await this.sender(data.email, emailSubjects_1.SUBJECTS.CONFIRMATION_EMAIL, template_names_1.TEMPLATE.CONFIRMATION_EMAIL_NAME, emailParameters);
    }
    async resetPasswordSender(data) {
        const emailParameters = {
            userName: data.firstName,
            otpCode: data.token,
            otpExpiryMinutes: data.expiresIn,
        };
        await this.sender(data.email, emailSubjects_1.SUBJECTS.RESET_EMAIL, template_names_1.TEMPLATE.RESET_EMAIL_NAME, emailParameters);
    }
    async enable_disable_TwoFactorSender(data) {
        const emailParameters = {
            firstName: data.firstName,
            status: data.status,
        };
        await this.sender(data.email, emailSubjects_1.SUBJECTS.TWO_FACTOR_ENABLED, template_names_1.TEMPLATE.TWO_FACTOR_ENABLED_NAME, emailParameters);
        const html = (0, insertContent_1.prepareHTML)(template_names_1.TEMPLATE.TWO_FACTOR_ENABLED_NAME, emailParameters);
        const params = {
            html,
            subject: emailSubjects_1.SUBJECTS.TWO_FACTOR_ENABLED,
            to: data.email,
        };
        await this.emailService.sendEmail(params);
    }
    async twofactorCodeSender(data) {
        const emailParameters = {
            userName: data.userName,
            code: data.code,
        };
        await this.sender(data.email, emailSubjects_1.SUBJECTS.TWO_FACTOR_LOGIN, template_names_1.TEMPLATE.TWO_FACTOR_LOGIN_NAME, emailParameters);
    }
    async sender(to, subject, templateName, emailParameters) {
        const html = (0, insertContent_1.prepareHTML)(templateName, emailParameters);
        const params = {
            html,
            subject,
            to
        };
        await this.emailService.sendEmail(params);
    }
    verifyToken(token, secret) {
        const isVerified = speakeasy.totp.verify({
            secret,
            token,
            encoding: "base32",
            window: 1,
        });
        return isVerified;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(3, (0, common_1.Inject)(emailServiceToken_1.EMAIL_TOKEN)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        nodemailer_service_1.NodemailerService, Object])
], UsersService);
//# sourceMappingURL=users.service.js.map