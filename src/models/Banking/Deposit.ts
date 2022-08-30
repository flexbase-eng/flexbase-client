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

export interface AchLimits {
    dailyCredit: number;
    dailyDebit: number;
    dailyDebitSoft: number;
    monthlyCredit: number;
    monthlyDebit: number;
    monthlyDebitSoft: number;
}

export interface AchBalance {
    credits: number;
    debits: number;
}

export interface CardLimits {
    dailyCardTransaction: number;
    dailyDeposit: number;
    dailyPurchase: number;
    dailyWithdrawal: number;
}

export interface CardTotalsDaily {
    cardTransactions: number;
    deposits: number;
    purchases: number;
    withdrawals: number;
}

export interface CheckDepositLimits {
    daily: number;
    dailySoft: number;
    monthly: number;
    monthlySoft: number;
}

export interface DepositLimits extends FlexbaseResponse {
    type?: string;
    attributes?: {
        ach: {
            limits: AchLimits;
            totalsDaily: AchBalance;
            totalsMonthly: AchBalance;
        };
        card: {
            limits: CardLimits;
            totalsDaily: CardTotalsDaily;
        };
        checkDeposit: {
            limits: CheckDepositLimits;
            totalsDaily: number;
            totalsMonthly: number;
        };
    }
}
