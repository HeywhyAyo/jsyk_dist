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
exports.BrevoService = void 0;
const common_1 = require("@nestjs/common");
const appError_1 = require("../../shared/interfaces/appError");
let BrevoService = class BrevoService {
    Domain;
    ApiKey;
    SenderEmail;
    SenderName;
    contactEmail;
    constructor() {
        const requiredFields = [
            "BrevoDomain",
            "BrevoApiKey",
            "BrevoSenderEmail",
            "BrevoSenderName",
            "CONTACT_EMAIL",
        ];
        for (const field of requiredFields) {
            if (!process.env[field]) {
                throw new Error(`Brevo email service needs ${field}`);
            }
        }
        this.Domain = process.env.BrevoDomain;
        this.ApiKey = process.env.BrevoApiKey;
        this.SenderEmail = process.env.BrevoSenderEmail;
        this.SenderName = process.env.BrevoSenderName;
        this.contactEmail = process.env.CONTACT_EMAIL;
    }
    createRequestHeaders() {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("api-key", this.ApiKey ?? "");
        return myHeaders;
    }
    createSender() {
        return {
            email: this.SenderEmail,
            name: this.SenderName,
        };
    }
    createReceiver(name, email) {
        return [{ name, email }];
    }
    createBrevoRequestBody(sender, Subject, toWho, htmlToSend) {
        return {
            sender,
            subject: Subject,
            to: toWho,
            htmlContent: htmlToSend,
        };
    }
    createRequestOptions(headers, requestBody) {
        return {
            method: "POST",
            headers,
            body: JSON.stringify(requestBody),
        };
    }
    async sendEmail({ html, to, subject }) {
        const sender = this.createSender();
        const receiver = this.createReceiver(to.split("@")[0], to);
        const body = this.createBrevoRequestBody(sender, subject, receiver, html);
        const headers = this.createRequestHeaders();
        const requestOptions = this.createRequestOptions(headers, body);
        const response = await fetch(this.Domain ?? "", requestOptions);
        if (!response.ok) {
            console.log(response);
            throw new appError_1.AppError("Failed to send email");
        }
    }
};
exports.BrevoService = BrevoService;
exports.BrevoService = BrevoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], BrevoService);
//# sourceMappingURL=brevo.service.js.map