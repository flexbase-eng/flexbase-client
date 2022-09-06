import { FlexbaseResponse } from "../FlexbaseResponse";
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

// DEPOSIT BALANCE
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

// DEPOSIT LIMITS
interface AchLimits {
    dailyCredit: number;
    dailyDebit: number;
    dailyDebitSoft: number;
    monthlyCredit: number;
    monthlyDebit: number;
    monthlyDebitSoft: number;
}

interface AchBalance {
    credits: number;
    debits: number;
}

interface CardLimits {
    dailyCardTransaction: number;
    dailyDeposit: number;
    dailyPurchase: number;
    dailyWithdrawal: number;
}

interface CardTotalsDaily {
    cardTransactions: number;
    deposits: number;
    purchases: number;
    withdrawals: number;
}

interface CheckDepositLimits {
    daily: number;
    dailySoft: number;
    monthly: number;
    monthlySoft: number;
}

interface AchAttributes {
    limits: AchLimits;
    totalsDaily: AchBalance;
    totalsMonthly: AchBalance;
}

interface CardAttributes {
    limits: CardLimits;
    totalsDaily: CardTotalsDaily;
}

interface CheckDepositAttributes {
    limits: CheckDepositLimits;
    totalsDaily: number;
    totalsMonthly: number;
}

export interface DepositLimitsAttributes {
    ach: AchAttributes;
    card: CardAttributes;
    checkDeposit: CheckDepositAttributes;
}

export interface DepositLimits extends FlexbaseResponse {
    type?: string;
    attributes?: DepositLimitsAttributes;
}
