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
    name: string;
    routingNumber: string;
    accountNumber: string;
    accountType: string;
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

export interface CounterpartyRequest {
    type: string;
    counterparty: CounterpartyForm;
}
