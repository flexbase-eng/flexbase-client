import { FlexbaseResponse } from "../FlexbaseResponse";
import { Relationship } from "./Constants";

export interface DepositAttributes {
    accountNumber: string;
    available: number;
    balance: number;
    createdAt: string;
    currency: string;
    depositProduct: string;
    hold: number;
    name: string;
    routingNumber: string;
    status: string;
    tags: {
        [key: string]: string;
    }
    updatedAt: string;
}

export interface Deposit extends FlexbaseResponse {
    attributes?: DepositAttributes;
    id?: string
    relationships?: {
        customer: Relationship;
        org: Relationship;
    }
    type?: string;
}

export interface DepositHistoryAttributes {
    date: string;
    hold: number;
    balance: number;
    available: number;
    overdraftLimit: number;
}

export interface DepositHistory {
    id: number;
    type: string;
    attributes: DepositHistoryAttributes;
    relationships: {
        account: Relationship;
        customer: Relationship;
    }
}
