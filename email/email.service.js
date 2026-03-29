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
exports.AddedToFacility = exports.NextOfKinEmail = exports.RenewedSubscriptionEmail = exports.NewSubscriptionEmail = exports.ReviewRejectedEmail = exports.ReviewAcceptedEmail = exports.ContactFormEmail = exports.TwoFactorLoginEmail = exports.TwoFactorActivationEmail = exports.NewInvestmentEmail = exports.DeletedInvestmentEmail = exports.ResetPasswordEmail = exports.ConfirmationEmail = exports.NewReview = exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");
require("dotenv").config();
const appError_1 = require("../shared/interfaces/appError");
let EmailService = class EmailService {
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
        return path.join(__dirname, "../emailTemplate", this.templateFileName);
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
        const response = await fetch(this.Domain ?? "", requestOptions);
        if (!response.ok) {
            console.log(response);
            throw new appError_1.AppError("Failed to send email");
        }
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [String, String, Object, String, String])
], EmailService);
class NewReview extends EmailService {
    constructor(recipient, name, templateVariables) {
        const emailSubject = "Review Application Submitted";
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
class DeletedInvestmentEmail extends EmailService {
    constructor(recipient, name, templateVariables) {
        const emailSubject = "Investment Removed From Your Portfolio";
        const templateFileName = "DeletedInvestment.html";
        super(recipient, name, templateVariables, emailSubject, templateFileName);
    }
}
exports.DeletedInvestmentEmail = DeletedInvestmentEmail;
class NewInvestmentEmail extends EmailService {
    constructor(recipient, name, templateVariables) {
        const emailSubject = "You’ve Made a New Investment!";
        const templateFileName = "Investment.html";
        super(recipient, name, templateVariables, emailSubject, templateFileName);
    }
}
exports.NewInvestmentEmail = NewInvestmentEmail;
class TwoFactorActivationEmail extends EmailService {
    constructor(recipient, name, templateVariables) {
        const emailSubject = "Two-Factor Authentication Enabled";
        const templateFileName = "TwoFactor.html";
        super(recipient, name, templateVariables, emailSubject, templateFileName);
    }
}
exports.TwoFactorActivationEmail = TwoFactorActivationEmail;
class TwoFactorLoginEmail extends EmailService {
    constructor(recipient, name, templateVariables) {
        const emailSubject = "Your Two-Factor Login Code";
        const templateFileName = "TwoFactorLogin.html";
        super(recipient, name, templateVariables, emailSubject, templateFileName);
    }
}
exports.TwoFactorLoginEmail = TwoFactorLoginEmail;
class ContactFormEmail extends EmailService {
    constructor(recipient, name, templateVariables) {
        const emailSubject = "New Contact Form Submission";
        const templateFileName = "ContactForm.html";
        super(recipient, name, templateVariables, emailSubject, templateFileName);
    }
}
exports.ContactFormEmail = ContactFormEmail;
class ReviewAcceptedEmail extends EmailService {
    constructor(recipient, name, templateVariables) {
        const emailSubject = "Your Application Has Been Approved – Welcome Aboard!";
        const templateFileName = "ReviewAccepted.html";
        super(recipient, name, templateVariables, emailSubject, templateFileName);
    }
}
exports.ReviewAcceptedEmail = ReviewAcceptedEmail;
class ReviewRejectedEmail extends EmailService {
    constructor(recipient, name, templateVariables) {
        const emailSubject = "Your Application Was Not Approved";
        const templateFileName = "ReviewRejected.html";
        super(recipient, name, templateVariables, emailSubject, templateFileName);
    }
}
exports.ReviewRejectedEmail = ReviewRejectedEmail;
class NewSubscriptionEmail extends EmailService {
    constructor(recipient, name, templateVariables) {
        const emailSubject = "You're In! Your Subscription to is Live";
        const templateFileName = "NewSubscription.html";
        super(recipient, name, templateVariables, emailSubject, templateFileName);
    }
}
exports.NewSubscriptionEmail = NewSubscriptionEmail;
class RenewedSubscriptionEmail extends EmailService {
    constructor(recipient, name, templateVariables) {
        const emailSubject = "Your Subscription Has Been Renewed!";
        const templateFileName = "RenewedSubscription.html";
        super(recipient, name, templateVariables, emailSubject, templateFileName);
    }
}
exports.RenewedSubscriptionEmail = RenewedSubscriptionEmail;
class NextOfKinEmail extends EmailService {
    constructor(recipient, name, templateVariables) {
        const emailSubject = "Received Authorization";
        const templateFileName = "NextofKinEmail.html";
        super(recipient, name, templateVariables, emailSubject, templateFileName);
    }
}
exports.NextOfKinEmail = NextOfKinEmail;
class AddedToFacility extends EmailService {
    constructor(recipient, name, templateVariables) {
        const emailSubject = "MedinfoCard Facility Staff";
        const templateFileName = "AddedToFacility.html";
        super(recipient, name, templateVariables, emailSubject, templateFileName);
    }
}
exports.AddedToFacility = AddedToFacility;
//# sourceMappingURL=email.service.js.map