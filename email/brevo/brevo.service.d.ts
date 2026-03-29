import { MasterEmail, SenderParameters } from "src/shared/interfaces/email";
export declare class BrevoService implements MasterEmail {
    private Domain;
    private ApiKey;
    private SenderEmail;
    private SenderName;
    private contactEmail;
    constructor();
    private createRequestHeaders;
    private createSender;
    private createReceiver;
    private createBrevoRequestBody;
    private createRequestOptions;
    sendEmail({ html, to, subject }: SenderParameters): Promise<void>;
}
