import { Address } from "./Constants";

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
}

export interface CounterpartyForm {
    unitProcessorToken?: string;
    routingNumber?: string;
    accountNumber?: string;
    accountType?: string;
    address?: Address;
    type?: string;
    name: string;
}

export interface CounterpartyAttributes {
    routingNumber?: string;
    accountNumber?: string;
    accountType?: string;
    type?: string;
    name: string;
}


export interface CounterpartyApiResponse {
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
    accountName: string;
    routingNumber: string;
    accountNumber: string;
    accountType: string;
    response: {
        data: {
            attributes: CounterpartyAttributes;
        }
    };
}

export interface Counterparty {
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
    accountName: string;
    accountNumber: string;
    routingNumber?: string;
    accountType?: string;
    name: string;
}


export interface CounterpartyRequest {
    type: string;
    counterparty: CounterpartyForm;
}
