import { EmailTemplates } from "../enum/emailEnum";
import { aResponse } from "../interfaces/aResponse";
export declare function sendEmail(emailType: EmailTemplates, recipient: string, name: string, templateVariables: Record<string, any>): Promise<aResponse<null>>;
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
