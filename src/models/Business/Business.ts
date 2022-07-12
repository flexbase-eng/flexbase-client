import { Address } from '../Address/Address';
import { Phone } from '../Phone/Phone';
import { BusinessOwner } from './BusinessOwner';

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
