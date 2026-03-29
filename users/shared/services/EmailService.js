"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordEmail = exports.ConfirmationEmail = exports.NewReview = exports.EmailService = void 0;
exports.sendEmail = sendEmail;
const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");
require("dotenv").config();
const common_1 = require("@nestjs/common");
const emailEnum_1 = require("../enum/emailEnum");
async function sendEmail(emailType, recipient, name, templateVariables) {
    const responseData = {
        data: null,
        message: "",
        successful: false,
    };
    try {
        const Domain = process.env.BrevoDomain;
        const ApiKey = process.env.BrevoApiKey;
        const SenderEmail = process.env.BrevoSenderEmail;
        const SenderName = process.env.BrevoSenderName;
        const contactEmail = process.env.CONTACT_EMAIL;
        if (Domain === undefined ||
            ApiKey === undefined ||
            SenderEmail === undefined ||
            SenderName === undefined ||
            contactEmail === undefined) {
            responseData.message = "Missing Credentials";
            responseData.successful = false;
            return responseData;
        }
        let templateFileName = "";
        let Subject = "";
        switch (emailType) {
            case emailEnum_1.EmailTemplates.CONFIRM_EMAIL:
                templateFileName = "ConfirmEmail.html";
                Subject = "Welcome! Please Confirm Your Email Address";
                break;
            case emailEnum_1.EmailTemplates.RESET_EMAIL:
                templateFileName = "ResetEmail.html";
                Subject = "Reset Your Password Request";
                break;
            case emailEnum_1.EmailTemplates.DELETED_INVESTMENT:
                templateFileName = "DeletedInvestment.html";
                Subject = "Investment Removed From Your Portfolio";
                break;
            case emailEnum_1.EmailTemplates.NEW_INVESTMENT:
                templateFileName = "Investment.html";
                Subject = "You’ve Made a New Investment!";
                break;
            case emailEnum_1.EmailTemplates.TWO_FACTOR_ACTIVATION_EMAIL:
                templateFileName = "TwoFactor.html";
                Subject = "Two-Factor Authentication Enabled";
                break;
            case emailEnum_1.EmailTemplates.TWO_FACTOR_LOGIN:
                templateFileName = "TwoFactorLogin.html";
                Subject = "Your Two-Factor Login Code";
                break;
            case emailEnum_1.EmailTemplates.CONTACT_FORM_EMAIL:
                templateFileName = "ContactForm.html";
                Subject = "New Contact Form Submission";
                break;
            case emailEnum_1.EmailTemplates.NEW_REVIEW:
                templateFileName = "NewReview.html";
                Subject = "Investor Application Submitted";
                break;
            case emailEnum_1.EmailTemplates.REVIEW_ACCEPTED:
                templateFileName = "ReviewAccepted.html";
                Subject = "Your Application Has Been Approved – Welcome Aboard!";
                break;
            case emailEnum_1.EmailTemplates.REVIEW_REJECTED:
                templateFileName = "ReviewRejected.html";
                Subject = "Your Application Was Not Approved";
                break;
            default:
                responseData.message = "Invalid email type";
                responseData.successful = false;
                responseData.data = null;
                return responseData;
        }
        const templatePath = path.join(__dirname, "../../emailTemplate", templateFileName);
        const templateContent = fs.readFileSync(templatePath, "utf8");
        const compiledEmailTemplate = Handlebars.compile(templateContent);
        const htmlToSend = compiledEmailTemplate({
            ...templateVariables,
            contactEmail,
        });
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("api-key", ApiKey ?? "");
        const sender = {
            email: SenderEmail,
            name: SenderName,
        };
        const towho = [{ name: name, email: recipient }];
        const sendinBlueEmailModel = {
            sender,
            subject: Subject,
            to: towho,
            htmlContent: htmlToSend,
        };
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(sendinBlueEmailModel),
        };
        const response = await fetch(Domain ?? "", requestOptions);
        if (!response.ok) {
            responseData.message = "Failed to send email";
            responseData.successful = false;
            return responseData;
        }
        responseData.message = "Verification email sent";
        responseData.successful = true;
        return responseData;
    }
    catch (error) {
        console.error(error);
        responseData.message = "Something went wrong";
        responseData.successful = false;
        return responseData;
    }
}
class EmailService {
    Domain;
    ApiKey;
    SenderEmail;
    SenderName;
    contactEmail;
    recipient;
    name;
    templateVariables;
    subject;
    templateFileName;
    constructor(recipient, name, templateVariables, subject, templateFileName) {
        if (!process.env.BrevoDomain ||
            !process.env.BrevoApiKey ||
            !process.env.BrevoSenderEmail ||
            !process.env.BrevoSenderName ||
            !process.env.CONTACT_EMAIL) {
            throw new Error("Email credentials missing");
        }
        this.Domain = process.env.BrevoDomain;
        this.ApiKey = process.env.BrevoApiKey;
        this.SenderEmail = process.env.BrevoSenderEmail;
        this.SenderName = process.env.BrevoSenderName;
        this.contactEmail = process.env.CONTACT_EMAIL;
        this.recipient = recipient;
        this.name = name;
        this.templateVariables = templateVariables;
        this.subject = subject;
        this.templateFileName = templateFileName;
    }
    getRawEmailTemplate() {
        return path.join(__dirname, "../../emailTemplate", this.templateFileName);
    }
    insertContentIntoEmail(emailTemplate, templateVariables) {
        const compiledEmailTemplate = Handlebars.compile(fs.readFileSync(emailTemplate, "utf8"));
        return compiledEmailTemplate({
            ...templateVariables,
            contactEmail: this.contactEmail,
        });
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
    async sendEmailToUser() {
        const sender = this.createSender();
        const receiver = this.createReceiver(this.name, this.recipient);
        const rawTemplate = this.getRawEmailTemplate();
        const emailWithUsersDetails = this.insertContentIntoEmail(rawTemplate, this.templateVariables);
        const body = this.createBrevoRequestBody(sender, this.subject, receiver, emailWithUsersDetails);
        const headers = this.createRequestHeaders();
        const requestOptions = this.createRequestOptions(headers, body);
        try {
            const response = await fetch(this.Domain ?? "", requestOptions);
            if (!response.ok) {
                throw new common_1.InternalServerErrorException({
                    successful: false,
                    message: "Email could not be sent",
                    data: response,
                });
            }
        }
        catch (error) {
            throw error;
        }
    }
}
exports.EmailService = EmailService;
class NewReview extends EmailService {
    constructor(recipient, name, templateVariables) {
        const emailSubject = "Investor Application Submitted";
        const templateFileName = "NewReview.html";
        super(recipient, name, templateVariables, emailSubject, templateFileName);
    }
}
exports.NewReview = NewReview;
class ConfirmationEmail extends EmailService {
    constructor(recipient, name, templateVariables) {
        const emailSubject = "Welcome! Please Confirm Your Email Address";
        const templateFileName = "ConfirmEmail.html";
        super(recipient, name, templateVariables, emailSubject, templateFileName);
    }
}
exports.ConfirmationEmail = ConfirmationEmail;
class ResetPasswordEmail extends EmailService {
    constructor(recipient, name, templateVariables) {
        const emailSubject = "Reset Your Password Request";
        const templateFileName = "ResetEmail.html";
        super(recipient, name, templateVariables, emailSubject, templateFileName);
    }
}
exports.ResetPasswordEmail = ResetPasswordEmail;
module.exports = { sendEmail };
//# sourceMappingURL=EmailService.js.map