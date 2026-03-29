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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../users/entities/user.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const generateToken_1 = require("../shared/utilities/generateToken");
let AuthService = class AuthService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    google_uri() {
        const redirectURL = `${process.env.RedirectUriLogin}/auth/verify-google`;
        const client_id = process.env.GoogleClientId;
        const redirect_uri = redirectURL;
        const response_type = "code";
        const scope = "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";
        const state = (0, generateToken_1.generateToken)();
        const access_type = "online";
        const uri = `https://accounts.google.com/o/oauth2/auth?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}&scope=${scope}&state=${state}&access_type=${access_type}`;
        return uri;
    }
    async google_access_token(code) {
        const redirectURL = `${process.env.RedirectUriLogin}/auth/verify-google`;
        const client_id = process.env.GoogleClientId;
        const client_secret = process.env.GoogleSecret;
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const raw = JSON.stringify({
            client_id: client_id,
            code: code,
            client_secret: client_secret,
            redirect_uri: redirectURL,
            grant_type: "authorization_code",
        });
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
        };
        const TokenURL = process.env.GoogleTokenURL || "https://oauth2.googleapis.com/token";
        const response = await fetch(TokenURL, requestOptions);
        const actualResponse = await response.json();
        return actualResponse.access_token;
    }
    async google_user_details(AccessToken) {
        const requestOptions = {
            method: "GET",
            redirect: "follow",
        };
        const response = await fetch(`${process.env.GoogleUserDetailsURL}?access_token=${AccessToken}`, requestOptions);
        return response.json();
    }
    github_Uri() {
        const redirectURL = process.env.GithubRedirectURi;
        const client_id = process.env.GithubClientId;
        const scope = "read:user,user:email";
        const uri = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirectURL}&allow_signup=true&scope=${scope}`;
        return uri;
    }
    async github_access_token(code) {
        const redirectURi = process.env.GithubRedirectURi;
        const client_id = process.env.GithubClientId;
        const client_secret = process.env.GithubSecret;
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
        };
        const response = await fetch(`${process.env.GITHUBACCESSURL}?client_id=${client_id}&client_secret=${client_secret}&code=${code}&redirect_uri=${redirectURi}`, requestOptions);
        const parsed = await response.text();
        const params = new URLSearchParams(parsed);
        const accessToken = params.get("access_token");
        return accessToken;
    }
    async github_user_details(AccessToken) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${AccessToken}`);
        const requestOptions = {
            method: "GET",
            redirect: "follow",
            headers: myHeaders,
        };
        const response = await fetch(`${process.env.GITHUBUSERDETAILURL}`, requestOptions);
        return response.json();
    }
    async github_user_email(AccessToken) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${AccessToken}`);
        const requestOptions = {
            method: "GET",
            redirect: "follow",
            headers: myHeaders,
        };
        const response = await fetch(`${process.env.GITHUBEMAILURL}`, requestOptions);
        const responseText = await response.text();
        const emailArray = JSON.parse(responseText);
        const firstEmail = emailArray[0]?.email;
        return firstEmail;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], AuthService);
//# sourceMappingURL=auth.service.js.map