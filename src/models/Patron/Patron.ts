import { Address } from '../Address/Address';

export interface Patron {
    id: string;
    name: string;
    tenantId: string;
    imageUrl?: string;
    address?: Address;
    companyId?: string;
}

export interface PatronData {
    id?: string;
    name?: string;
    address?: string;
    state?: string;
    city?: string;
    postalCode?: string;
}
