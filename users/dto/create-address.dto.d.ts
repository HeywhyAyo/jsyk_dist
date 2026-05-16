import { AddressLabel } from '../enum/address';
export declare class CreateAddressDto {
    label?: AddressLabel;
    fullName: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    isDefault?: boolean;
}
export declare class CreateAddressDataVisitorDto {
    fullName: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    isDefault?: boolean;
}
