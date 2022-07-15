import { Address } from "../Address/Address";

export interface Project {
    id?: string;
    name?: string;
    description?: string;
    location?: Address
}

export interface ProjectsResponse {
    companyId: string;
    contracts: Array<string>;
    description: string;
    id: string;
    location: Address;
    name: string;
}

export interface CreateProjectResponse {
  description: string;
  id: string;
  location: Address;
  name: string;
}
