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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const dotenv = require("dotenv");
const apiResponse_1 = require("../shared/utilities/apiResponse");
dotenv.config();
let JwtAuthGuard = class JwtAuthGuard {
    jwtService;
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("Missing or invalid Authorization header");
            throw new common_1.HttpException(apiResponse, common_1.HttpStatus.UNAUTHORIZED);
        }
        const token = authHeader.split(" ")[1];
        try {
            if (process.env.SECRET_KEY === undefined) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)("Missing JWT secret key");
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            const payload = this.jwtService.verify(token, {
                secret: process.env.SECRET_KEY,
            });
            request.user = payload;
            return true;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            if (error.name === "TokenExpiredError") {
                throw new common_1.HttpException((0, apiResponse_1.createUnSuccessfulResponse)("Token has expired"), common_1.HttpStatus.UNAUTHORIZED);
            }
            if (error.name === "JsonWebTokenError") {
                throw new common_1.HttpException((0, apiResponse_1.createUnSuccessfulResponse)("Invalid token"), common_1.HttpStatus.UNAUTHORIZED);
            }
            throw new common_1.HttpException((0, apiResponse_1.createUnSuccessfulResponse)("Something went wrong"), common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], JwtAuthGuard);
//# sourceMappingURL=jwt-auth.guard.js.map