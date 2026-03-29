export interface MasterEmail {
    sendEmail: (params: SenderParameters) => Promise<any>;
}
export interface SenderParameters {
    to: string;
    subject: string;
    html: string;
}
