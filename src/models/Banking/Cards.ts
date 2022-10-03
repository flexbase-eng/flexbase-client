import { Relationship, Address, FullName, Phone } from "./Constants";

export interface Card {
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
    shippingAddress: Address;
    address: Address;
    fullName: FullName;
    phone: Phone;
    email: string;
    dateOfBirth:string;
    relationships: {
      customer: Relationship;
      account: Relationship;
    };
    tenantId: string
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

export interface CardRequest {
  type: string;
  shippingAddress?: Address;
  limits?: {
    dailyWithdrawal?: number;
    dailyPurchase?: number;
    monthlyWithdrawal?: number;
    monthlyPurchase?: number;
  }
}