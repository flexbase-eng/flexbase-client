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
    roles?: string[];
    authorizedSignatory?: boolean;
    preferences?: {
        notifications: {
            BILLING: {
                default: string[];
            };
            CARDS: {
                default: string[];
            };
            COMPANY: {
                default: string[];
            };
            PAYMENTS: {
                default: string[];
            };
            PURCHASES: {
                default: string[];
            };
        };
    };
}
