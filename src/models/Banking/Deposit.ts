import { FlexbaseResponse } from "../FlexbaseResponse";
import { RelationshipData } from "./Constants";

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
        customer: RelationshipData;
        org: RelationshipData;
    }
    type?: string;
}