import { Address } from '../Address/Address';

export interface ProjectData {
    id?: string;
    name?: string;
    description?: string;
    clientId?: string | null;
    location?: Address;
}

export interface ProjectsResponse {
    companyId: string;
    contracts: Array<string>;
    description: string;
    id: string;
    location: Address;
    name: string;
    client?: {
        id?: string;
        companyName?: string;
    }
}

export interface CreateOrUpdateProjectResponse {
    description: string;
    id: string;
    location: Address;
    name: string;
    clientId: string | null;
    companyId: string;
}
