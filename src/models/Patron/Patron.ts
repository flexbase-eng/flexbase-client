import { Address } from '../Address/Address';

export interface Patron {
    id: string;
    name: string;
    tenantId: string;
    imageUrl?: string;
    address?: Address;
    companyId?: string;
}
