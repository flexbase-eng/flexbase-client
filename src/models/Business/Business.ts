import { Address } from '../Address/Address.js';
import { Phone } from '../Phone/Phone.js';
import { BusinessOwner } from './BusinessOwner.js';

export interface Business {
  id: string;
  businessName: string;
  doingBusinessAs?: string;
  taxId: string;
  legalStructure: string;
  category: string;
  monthlyExpenditure: string;
  formationDate: string;
  website?: string;
  owners: BusinessOwner[];
  address: Address;
  phone: Phone;
}
