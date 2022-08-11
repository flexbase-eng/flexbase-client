export interface Counterparty {
    accessToken?: string;
    asOf?: string;
    byUser?: string;
    companyId?: string;
    createdAt?: string;
    id?: string;
    type?: string;
    ucCounterpartyId?: string;
    ucCustomerId?: string;
    version?: number;
    tenantId?: string;
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
