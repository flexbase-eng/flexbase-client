import { Address } from '../Address/Address';
import { Phone } from '../Phone/Phone';

export interface PersonUpdate {
    firstName?: string;
    lastName?: string;
    taxId?: string;
    birthDate?: string;
    jobTitle?: string;
    email?: string;
    address?: Address;
    phone?: Phone;
    authorizedSignatory?: boolean;
}
