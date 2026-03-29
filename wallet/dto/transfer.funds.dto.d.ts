import { ValidatorConstraintInterface } from 'class-validator';
export declare class AtLeastOneConstraint implements ValidatorConstraintInterface {
    validate(_: any, args: any): boolean;
    defaultMessage(): string;
}
export declare class TransferFundsDto {
    email?: string;
    amount: number;
}
