import { aResponse } from "../interfaces/aResponse";
export declare function createResponse<T>(successful: boolean, message: string, data: T): aResponse<T>;
export declare function createUnSuccessfulResponse(message: string): aResponse<null>;
