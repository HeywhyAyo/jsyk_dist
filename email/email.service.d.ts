export declare class EmailService {
    private Domain;
    private ApiKey;
    private SenderEmail;
    private SenderName;
    private contactEmail;
    private recipient;
    private name;
    private templateVariables;
    private subject;
    private templateFileName;
    constructor(recipient: string, name: string, templateVariables: Record<string, any>, subject: string, templateFileName: string);
    private getRawEmailTemplate;
    private insertContentIntoEmail;
    private createRequestHeaders;
    private createSender;
    private createReceiver;
    private createBrevoRequestBody;
    private createRequestOptions;
    sendEmailToUser(): Promise<void>;
}
export declare class NewReview extends EmailService {
    constructor(recipient: string, name: string, templateVariables: Record<string, any>);
}
export declare class ConfirmationEmail extends EmailService {
    constructor(recipient: string, name: string, templateVariables: Record<string, any>);
}
export declare class ResetPasswordEmail extends EmailService {
    constructor(recipient: string, name: string, templateVariables: Record<string, any>);
}
export declare class DeletedInvestmentEmail extends EmailService {
    constructor(recipient: string, name: string, templateVariables: Record<string, any>);
}
export declare class NewInvestmentEmail extends EmailService {
    constructor(recipient: string, name: string, templateVariables: Record<string, any>);
}
export declare class TwoFactorActivationEmail extends EmailService {
    constructor(recipient: string, name: string, templateVariables: Record<string, any>);
}
export declare class TwoFactorLoginEmail extends EmailService {
    constructor(recipient: string, name: string, templateVariables: Record<string, any>);
}
export declare class ContactFormEmail extends EmailService {
    constructor(recipient: string, name: string, templateVariables: Record<string, any>);
}
export declare class ReviewAcceptedEmail extends EmailService {
    constructor(recipient: string, name: string, templateVariables: Record<string, any>);
}
export declare class ReviewRejectedEmail extends EmailService {
    constructor(recipient: string, name: string, templateVariables: Record<string, any>);
}
export declare class NewSubscriptionEmail extends EmailService {
    constructor(recipient: string, name: string, templateVariables: Record<string, any>);
}
export declare class RenewedSubscriptionEmail extends EmailService {
    constructor(recipient: string, name: string, templateVariables: Record<string, any>);
}
export declare class NextOfKinEmail extends EmailService {
    constructor(recipient: string, name: string, templateVariables: Record<string, any>);
}
export declare class AddedToFacility extends EmailService {
    constructor(recipient: string, name: string, templateVariables: Record<string, any>);
}
