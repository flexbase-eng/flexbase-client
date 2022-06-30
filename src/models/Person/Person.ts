import { Address } from '../Address/Address';
import { Phone } from '../Phone/Phone';

export interface Person {
    id: string;
    firstName: string;
    lastName: string;
    taxId: string;
    birthDate: string;
    jobTitle: string;
    email: string;
    authorizedSignatory: boolean;
    address: Address;
    phone: Phone;
}
