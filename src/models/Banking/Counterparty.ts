import { RelationshipData } from "./Constants";

export interface CtrParty {
    accessToken: string;
    asOf: string;
    byUser: string;
    companyId: string;
    createdAt: string;
    id: string;
    type: string;
    ucCounterpartyId: string;
    ucCustomerId: string;
    version: number;
    tenantId: string;
}

export interface CounterpartyAttributes {
    name: string;
    routingNumber: string;
    accountNumber: string;
    accountType: string;
    type: string;
    permissions: string;
    createdAt: string;
    tags: {
        [key: string]: string;
    }
}

export interface Counterparty {
    type: string;
    id: string;
    attributes: CounterpartyAttributes;
    relationships: {
        customer: RelationshipData;
    }
}

export interface CounterpartyForm {
    routingNumber: string;
    accountNumber: string;
    accountType: string;
    type?: string;
    name: string;
}

export interface CounterpartyRequest {
    type: string;
    counterparty: CounterpartyForm;
}

export interface ListRequest {
    limit: number;
    offset: number;
    customerId: string;
    tags: {
        [key: string]: string;
    }}
