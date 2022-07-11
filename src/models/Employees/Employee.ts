import { Address } from '../Address/Address';

export interface Employee {
    id?: string;
    firstName?: string;
    lastName?: string;
    birthDate?: string;
    jobTitle?: string;
    email?: string;
    address?: Address;
    phone?: string;
}
