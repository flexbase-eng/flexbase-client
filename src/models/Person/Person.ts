import { Address } from '../Address/Address.js';
import { Phone } from '../Phone/Phone.js';

export interface Person {
  id: string;
  firstName?: string;
  lastName?: string;
  taxId?: string;
  birthDate?: string;
  jobTitle?: string;
  email?: string;
  authorizedSignatory?: boolean;
  address?: Address;
  phone?: Phone;
  cellPhone?: Phone;
  businessId?: string;
  roles?: string[];
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
