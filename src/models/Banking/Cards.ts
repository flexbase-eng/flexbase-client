import { Relationship, Address, Phone } from './Constants';

interface Limits {
    dailyWithdrawal?: number;
    dailyPurchase?: number;
    monthlyWithdrawal?: number;
    monthlyPurchase?: number;
} 

export interface Card {
    asOf: string;
    byUser: string;
    cardName: string;
    cardNumber: string;
    cardSubtype: string;
    cardType: string;
    companyId: string;
    creditLimit: number;
    currency: string;
    expensesTypes: Limits;
    expirationDate: string;
    holder: string;
    id: string;
    notifyUse: boolean;
    paymentDay: number;
    shipTo: Address;
    status: string;
    stpCardId: string;
    ucCardId: string;
    userId: string;
    version: number;
    shippingAddress: Address;
    relationships: {
      customer: Relationship;
      account: Relationship;
    };
    tenantId: string;
}

export interface CardByUser {
    asOf: string;
    byUser: string;
    companyId: string;
    createdAt: string;
    dailyPurchase: string;
    dailyWithdrawal: string;
    expirationDate: string;
    id: string;
    lastFour: string;
    monthlyPurchase: string;
    monthlyWithdrawal: string;
    status: string;
    type: string;
    ucCardId: string;
    ucCustomerId: string;
    ucDepositId: string;
    version: number;
}

export interface CreateCardRequest {
    type: string;
    shippingAddress?: Address;
    limits?: Limits;
}

export interface UpdateCardRequest {
    id: string;
    type: string;
    limits?: Limits;
    shippingAddress?: Address;
    address?: Address;
    email?: string;
    phone?: Phone;
}
