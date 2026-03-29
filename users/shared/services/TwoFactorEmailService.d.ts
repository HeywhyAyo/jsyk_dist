import { aResponse } from "../interfaces/aResponse";
export declare function sendTwoFactorStatusNotification(recipient: string, name: string, status: string): Promise<aResponse<null>>;
