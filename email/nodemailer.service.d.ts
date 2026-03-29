import { MasterEmail, SenderParameters } from "src/shared/interfaces/email";
export declare class NodemailerService implements MasterEmail {
    private transporter;
    private user;
    private contactEmail;
    constructor();
    sendEmail({ html, to, subject }: SenderParameters): Promise<any>;
}
