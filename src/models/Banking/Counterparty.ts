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
    routingNumber: string;
    accountNumber: string;
    accountType: string;
    response: {
        data: {
            attributes: CounterpartyForm;
        }
    };
}

export interface Address {
    city: string;
    state: string;
    street: string;
    country: string;
    postalCode: string;
}


export interface CounterpartyRequest {
    type: string;
    counterparty: CounterpartyForm;
}
