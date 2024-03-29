import { Relationship, Address, FullName, Phone } from './Constants.js';

export interface Limits {
  dailyWithdrawal?: number;
  dailyPurchase?: number;
  monthlyWithdrawal?: number;
  monthlyPurchase?: number;
}

interface MonthToDateSpends {
  mtdSpend: number;
  startOfMonth: string;
  success: boolean;
}

export interface Card {
  address: Address;
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
  liCardToken: string;
  monthToDateSpends: MonthToDateSpends;
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
}

export interface CardByUser {
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
  liCardToken: string;
  notifyUse: boolean;
  paymentDay: string;
  shipTo: Address;
  status: string;
  stpCardId: string;
  ucCardId: string;
  userId: string;
  version: number;
}

export interface IssueCard {
  type: string;
  id: string;
  attributes: {
    createdAt: string;
    shippingAddress: Address;
    last4Digits: string;
    expirationDate: string;
    address: Address;
    fullName: FullName;
    phone: Phone;
    status: string;
  };
  relationships: {
    customer: Relationship;
    account: Relationship;
  };
  ucCardId: string;
}

export interface CreateCardRequest {
  type: string;
  limits?: Limits;
  cardName?: string;
  shipping?: Address;
}

export interface UpdateCardRequest {
  id: string;
  cardName?: string;
  limits?: Limits;
  shippingAddress?: Address;
  address?: Address;
  email?: string;
  phone?: Phone;
}

export interface PinStatus {
  data: {
    type: string;
    attributes: {
      status: string;
    };
  };
}

export interface ReportDebitCardRequest {
  cardId: string;
  status: 'lost' | 'stolen';
}
