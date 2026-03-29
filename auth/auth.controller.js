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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const swagger_1 = require("@nestjs/swagger");
const callback_dto_1 = require("./core/google/callback.dto");
const users_service_1 = require("../users/users.service");
const bcrypt_util_1 = require("../users/utils/bcrypt.util");
const apiResponse_1 = require("../shared/utilities/apiResponse");
const onboard_1 = require("../users/shared/enum/onboard");
let AuthController = class AuthController {
    authService;
    usersService;
    constructor(authService, usersService) {
        this.authService = authService;
        this.usersService = usersService;
    }
    response = {
        message: "",
        data: null,
        successful: false,
    };
    async google_initiate(res) {
        try {
            const response = this.authService.google_uri();
            if (response !== null) {
                this.response.data = response;
                this.response.message = "Google Url initialized successfully";
                this.response.successful = true;
                return res.status(common_1.HttpStatus.OK).send(this.response);
            }
            else {
                this.response.message = "Failed to initialize google Url";
                this.response.successful = false;
                return res.status(common_1.HttpStatus.NOT_FOUND).send(this.response);
            }
        }
        catch (error) {
            this.response.message = error || "Error initializing transaction";
            this.response.successful = false;
            res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
        }
    }
    async googleCallback(body, res) {
        try {
            if (!body.code) {
                this.response.message = "enter code from the redirect uri";
                this.response.successful = false;
                return res.status(common_1.HttpStatus.BAD_REQUEST).json(this.response);
            }
            const decoded = decodeURIComponent(body.code);
            const accessToken = await this.authService.google_access_token(decoded);
            if (!accessToken) {
                this.response.data = null;
                this.response.message = "Access token was not obtained from google";
                this.response.successful = false;
                return res.status(common_1.HttpStatus.UNAUTHORIZED).send(this.response);
            }
            const user_details = await this.authService.google_user_details(accessToken);
            const user = await this.usersService.findOneByEmail(user_details.email);
            if (user) {
                if (user.onboard === onboard_1.ONBOARDLEVEL.CREATED) {
                    const data = {
                        accessToken: null,
                        refreshToken: null,
                        role: user.role,
                        disabled: user.disabled,
                        is2FAEnabled: user.is2FAEnabled,
                        email: user.email,
                        onboard: user.onboard
                    };
                    const apiResponse = (0, apiResponse_1.createResponse)(true, "Please complete your profile", data);
                    return res.status(common_1.HttpStatus.OK).send(apiResponse);
                }
                const tokens = await this.usersService.login(user.id, user.email, user.role);
                await this.usersService.saveRefreshToken(user.id, tokens.refreshToken);
                this.response.message = "Login successful";
                this.response.successful = true;
                this.response.data = {
                    ...tokens,
                    disabled: user.disabled,
                    is2FAEnabled: user.is2FAEnabled,
                    email: user.email,
                };
                return res.status(common_1.HttpStatus.OK).send(this.response);
            }
            else {
                const defaultPass = process.env.DefaultPass ?? "";
                const hasPassword = await (0, bcrypt_util_1.hashPassword)(defaultPass);
                const newUser = await this.usersService.createOauthUser({
                    email: user_details.email.toLowerCase(),
                    firstName: user_details.given_name,
                    lastName: user_details.family_name,
                    isEmailVerified: true,
                    password: hasPassword,
                    profile_image: user_details.picture,
                });
                const createdUser = Array.isArray(newUser) ? newUser[0] : newUser;
                this.response.message = "Google Sign up successful";
                this.response.successful = true;
                this.response.data = {
                    firstname: createdUser.firstName,
                    lastname: createdUser.lastName,
                    email: createdUser.email,
                };
                return res.status(common_1.HttpStatus.OK).send(this.response);
            }
        }
        catch (error) {
            console.error(error);
            this.response.message = error || "Error initializing transaction";
            this.response.successful = false;
            res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Get)("google/initiate"),
    (0, swagger_1.ApiOperation)({ summary: "Google Oauth Url" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Get the google redirect Url" }),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "google_initiate", null);
__decorate([
    (0, common_1.Post)("google/callback"),
    (0, swagger_1.ApiBody)({ type: callback_dto_1.Googledto, description: "Google callback" }),
    (0, swagger_1.ApiOperation)({
        summary: "Google callback for access token and user details",
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Get Google user details" }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [callback_dto_1.Googledto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleCallback", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        users_service_1.UsersService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map