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

export interface Attributes {
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

export interface Costumer {
    data: {
        type: string;
        id: string;
    }
}

export interface Counterparty {
    type: string;
    id: string;
    attributes: Attributes;
    relationships: {
        customer: Costumer;
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
