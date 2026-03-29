import { User } from './user.entity';
import { AddressLabel } from '../enum/address';
export declare class Address {
    id: string;
    user: User;
    userId: string;
    label: AddressLabel;
    fullName: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    isDefault: boolean;
    createdAt: Date;
    updatedAt: Date;
}
