export declare class SquadPaymentDto {
    amount: number;
}
export declare class SqaudMetadataDto {
    userId: string;
}
export declare class SquadPaymentData {
    email: string;
    amount: number;
    currency?: string;
    callback_url?: string;
    initiate_type: "inline";
    transaction_ref: string;
    metadata: SqaudMetadataDto;
}
