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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const swagger_1 = require("@nestjs/swagger");
const login_user_dto_1 = require("./dto/login-user.dto");
const resend_confirmation_dto_1 = require("./dto/resend-confirmation.dto");
const verify_user_dto_1 = require("./dto/verify-user.dto");
const refresh_token_user_dto_1 = require("./dto/refresh-token-user.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const get_otp_dto_1 = require("./dto/get-otp.dto");
const reset_password_dto_1 = require("./dto/reset-password.dto");
const enable_user_dto_1 = require("./dto/enable-user.dto");
const complete_profile_1 = require("./dto/complete.profile");
const login_TwoFa_dto_1 = require("./dto/login-TwoFa.dto");
const nodemailer_service_1 = require("../email/nodemailer.service");
const create_address_dto_1 = require("./dto/create-address.dto");
const update_address_dto_1 = require("./dto/update.address.dto");
const delete_address_dto_1 = require("./dto/delete.address.dto");
const create_user_dto_1 = require("./dto/create-user.dto");
let UsersController = class UsersController {
    usersService;
    nodemailerService;
    constructor(usersService, nodemailerService) {
        this.usersService = usersService;
        this.nodemailerService = nodemailerService;
    }
    async login(loginUserDto) {
        return await this.usersService.sign_in_User_service(loginUserDto);
    }
    async create(createUserDto) {
        return await this.usersService.create_user_account_service(createUserDto);
    }
    async resend(resendConfirmationDto) {
        return await this.usersService.resend_user_confirmation_service(resendConfirmationDto);
    }
    async verify(verifyUserDto) {
        return await this.usersService.verify_email_service(verifyUserDto);
    }
    async refreshUserToken(refreshUserDto) {
        return await this.usersService.refresh_user_token_service(refreshUserDto);
    }
    async findOnewithJWT(req) {
        const identity = req.user.id;
        return await this.usersService.user_infomation_service(identity);
    }
    async getResetOTP(getOTP) {
        return await this.usersService.forget_password_service(getOTP);
    }
    async resetPassword(resetUserDTO) {
        return await this.usersService.reset_user_password_service(resetUserDTO);
    }
    async requestOTP(req) {
        const userid = req.user.id;
        return await this.usersService.retrieve_user_2fa_service(userid);
    }
    async enableTwoFA(enableUserTwoFA, req) {
        const userid = req.user.id;
        return await this.usersService.enable_user_two_factor_service(enableUserTwoFA, userid);
    }
    async sendOtPtoEmail(req) {
        const userId = req.user.id;
        return await this.usersService.send_two_factor_via_email_service(userId);
    }
    async enableTwoFAviaEmail(enableUserTwoFA, req) {
        const userid = req.user.id;
        return await this.usersService.enable_user_two_factor_via_email_service(userid, enableUserTwoFA);
    }
    async disableTwoFA(req) {
        const userid = req.user.id;
        return await this.usersService.disable_user_two_factor_service(userid);
    }
    async getOTPwithEmail(res, getByEmailDTO) {
        return await this.usersService.send_sign_in_otp_via_email_service(getByEmailDTO);
    }
    async loginWithTwoFa(loginUserDto) {
        return await this.usersService.verify_user_sign_in_with_service(loginUserDto);
    }
    async loginWithTwoFawithEmail(loginUserDto) {
        return await this.usersService.verify_user_sign_in_with_via_email_service(loginUserDto);
    }
    async CompleteProfile(completeDto) {
        return await this.usersService.complet_user_onboard_service(completeDto);
    }
    async UpdateProfile(completeDto, req) {
        return await this.usersService.update_user_profile_service(completeDto, req.user.id);
    }
    async changePassword(changepassWordDTO, req) {
        return this.usersService.update_user_profile_service(changepassWordDTO, req.user.id);
    }
    async getUserAddresses(req) {
        return this.usersService.getUserAddresses(req.user.id);
    }
    async createAddresses(CreateAddressDto, req) {
        return this.usersService.create_address_service(CreateAddressDto, req.user.id);
    }
    async UpdateAddressDto(UpdateAddressDto, req) {
        return this.usersService.update_user_Address(req.user.id, UpdateAddressDto.addressid, UpdateAddressDto);
    }
    async DeleteAddressDto(DeleteAddressDto, req) {
        return this.usersService.delete_user_Address(req.user.id, DeleteAddressDto);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Login user or sign user in" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Login successful",
        example: {
            message: "Login successful",
            successful: true,
            data: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjlmZTlhZjY0LTk4MmQtNDM2YS1iYzQxLWZmZTQ0ZDgxZTkwMyIsImVtYWlsIjoibWF5YTIyQG1haWxpbmF0b3IuY29tIiwiaWF0IjoxNzQ3MTU5NDg3LCJleHAiOjE3NDcxNjMwODd9.5Z6qYU6F5T0z2qcYpIrwC_OWaW2IMY5L6ZV7g_w15aU",
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "Incomplete request body or request body fails validation",
        example: {
            data: null,
            message: "Bad request",
            successful: false,
        },
    }),
    (0, swagger_1.ApiBody)({
        type: login_user_dto_1.loginUserDto,
        description: "User login credentials",
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)("login"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_1.loginUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Create new user" }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "User created",
        example: {
            data: null,
            message: "User created",
            successful: true,
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: "User with email exists",
        example: {
            data: null,
            message: "A user with this email already exists",
            successful: false,
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: "Server error",
        example: {
            data: null,
            message: "Missing frontend URL",
            successful: false,
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "Incomplete request body or request body fails validation",
        example: {
            data: null,
            message: "Bad request",
            successful: false,
        },
    }),
    (0, swagger_1.ApiBody)({
        type: create_user_dto_1.CreateUserDto,
        description: "User login credentials",
    }),
    (0, common_1.Post)("signup"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiBody)({
        type: resend_confirmation_dto_1.ResendConfirmationDto,
        description: "Resent confirmation email",
    }),
    (0, common_1.Post)("resend-confirmation"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [resend_confirmation_dto_1.ResendConfirmationDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "resend", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Verify user email" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Email verified" }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "Incomplete request body or request body fails validation or Token expired",
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Email does not exist" }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)("verify"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verify_user_dto_1.verifyUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "verify", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Generate new access token" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "access token generated",
        example: {
            data: null,
            message: "New access token generated",
            successful: true,
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "Incomplete request body or request body fails validation",
        example: {
            data: null,
            message: "Bad request",
            successful: false,
        },
    }),
    (0, common_1.Post)("refresh"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refresh_token_user_dto_1.RefreshUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "refreshUserToken", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)("bearerAuth"),
    (0, swagger_1.ApiOperation)({ summary: "Get logged-in user details" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "User found" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Account disabled" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "User not found" }),
    (0, swagger_1.ApiResponse)({ status: 500, description: "Internal Server Error" }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)("details"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOnewithJWT", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "send the forget password otp to the user in other to reset their password" }),
    (0, common_1.Post)("forget-password"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_otp_dto_1.getOTPDTO]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getResetOTP", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Change user password" }),
    (0, common_1.Post)("reset-password"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_dto_1.ResetPasswordDTO]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "resetPassword", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)("bearerAuth"),
    (0, swagger_1.ApiOperation)({ summary: "Request for 2fa qr code and secret key" }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)("get-2fa"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "requestOTP", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)("bearerAuth"),
    (0, swagger_1.ApiOperation)({ summary: "Enable user account 2FA - Two factor" }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)("enable-2fa"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [enable_user_dto_1.EnableTwoFaDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "enableTwoFA", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)("bearerAuth"),
    (0, swagger_1.ApiOperation)({ summary: "Authorized send otp to email for verification" }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)("send-2fa-auth/email"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "sendOtPtoEmail", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)("bearerAuth"),
    (0, swagger_1.ApiOperation)({ summary: "Enable user 2FA" }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)("enable-2fa-via-email"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [enable_user_dto_1.EnableTwoFaDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "enableTwoFAviaEmail", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)("bearerAuth"),
    (0, swagger_1.ApiOperation)({ summary: "Disable 2FA" }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)("disable-2fa"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "disableTwoFA", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Get OTP code using email on sign in level " }),
    (0, common_1.Post)("get-2fa/email"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Response,
        enable_user_dto_1.getOtpWithEmailDTO]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getOTPwithEmail", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Complete login by verifying the otp from authenticator" }),
    (0, common_1.Post)("verify/2fa"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_TwoFa_dto_1.loginUser2FaDTO]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "loginWithTwoFa", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Complete login by verifying the sent otp to user email" }),
    (0, common_1.Post)("verify/2fa/email"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_TwoFa_dto_1.loginUser2FaDTO]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "loginWithTwoFawithEmail", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Complete user profile - onboarding" }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "User created and complete profile",
        example: {
            data: null,
            message: "User profile created",
            successful: true,
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: "Server error",
        example: {
            data: null,
            message: "Missing frontend URL",
            successful: false,
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "Incomplete request body or request body fails validation",
        example: {
            data: null,
            message: "Bad request",
            successful: false,
        },
    }),
    (0, swagger_1.ApiBody)({
        type: complete_profile_1.CompleteProfileDto,
        description: "Complete Profile",
    }),
    (0, common_1.Post)("complete-profile"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "CompleteProfile", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)("bearerAuth"),
    (0, swagger_1.ApiOperation)({ summary: "Update user profile" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "User profile updated success",
        example: {
            data: null,
            message: "User profile updated",
            successful: true,
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: "Server error",
        example: {
            data: null,
            message: "Missing frontend URL",
            successful: false,
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "Incomplete request body or request body fails validation",
        example: {
            data: null,
            message: "Bad request",
            successful: false,
        },
    }),
    (0, swagger_1.ApiBody)({
        type: complete_profile_1.CompleteProfileDto,
        description: "Update Profile",
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)("update-profile"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "UpdateProfile", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)("bearerAuth"),
    (0, swagger_1.ApiOperation)({ summary: "Change user password" }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)("change-password"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_dto_1.ChangePasswordDTO, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "changePassword", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)("bearerAuth"),
    (0, swagger_1.ApiOperation)({ summary: "retreive user addresses" }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)("user-addresses"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserAddresses", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)("bearerAuth"),
    (0, swagger_1.ApiOperation)({ summary: "Create user address" }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)("create-user-address"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_address_dto_1.CreateAddressDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createAddresses", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)("bearerAuth"),
    (0, swagger_1.ApiOperation)({ summary: "update this user address" }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)("update-user-address"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_address_dto_1.UpdateAddressDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "UpdateAddressDto", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)("bearerAuth"),
    (0, swagger_1.ApiOperation)({ summary: "delete this user address" }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)("delete-user-address"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_address_dto_1.DeleteAddressDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "DeleteAddressDto", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)("users"),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        nodemailer_service_1.NodemailerService])
], UsersController);
//# sourceMappingURL=users.controller.js.map