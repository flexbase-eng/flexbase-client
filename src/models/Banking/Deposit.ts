import { Relationship } from "./Constants";

export interface Deposit {
    accountNumber: string;
    asOf: string;
    available: number;
    balance: number;
    byUser: string;
    companyId: string;
    createdAt: string;
    depositProduct: string;
    id: string;
    name: string;
    isDefault: string;
    routingNumber: string;
    status: string;
    tenantId: string;
    type: string;
    ucCustomerId: string;
    ucDepositId: string;
}

export interface DepositBalanceAttributes {
    date: string;
    hold: number;
    balance: number;
    available: number;
    overdraftLimit: number;
}

export interface DepositBalance {
    id: number;
    type: string;
    attributes: DepositBalanceAttributes;
    relationships: {
        account: Relationship;
        customer: Relationship;
    }
}
