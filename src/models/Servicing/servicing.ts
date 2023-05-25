import { FlexbaseResponse } from '../FlexbaseResponse.js';

export interface PaymentCredit {
  amount: string;
  createdAt: string;
  datePosted: string;
  failureReason?: string;
  origin: string;
  status: string;
}

export interface InvoiceNew {
  cardholder: string;
  city: string;
  date: string;
  last4: string;
  name: string;
  origin: string;
  postalCode: string;
  project?: string;
  state: string;
  total: string;
}

interface CompanyStatement {
  active?: boolean;
  address?: string;
  addressLine2?: string;
  autopay?: boolean;
  city?: string;
  country?: string;
  creditLimit?: string;
  frozen?: boolean;
  name?: string;
  phone?: string;
  postalCode?: string;
  state?: string;
}

export interface CreditStatement extends FlexbaseResponse {
  company?: CompanyStatement;
  invoicesNewPeriodFrom?: string;
  invoicesNewPeriodTo?: string;
  invoicesDuePeriodFrom?: string;
  invoicesDuePeriodTo?: string;
  invoicesNewSum?: string;
  invoicesDueSum?: string;
  minimumDue?: number;
  interestDue?: number;
  currentBalance?: number;
  paymentsPeriodFrom?: string;
  paymentsPeriodTo?: string;
  paymentsSum?: string;
  previousBalance?: number;
  payments?: PaymentCredit[];
  invoicesNew?: InvoiceNew[];
  generatedAt?: string;
  dueDate?: string;
}

interface Transaction {
  amount: string;
  date: string;
  transaction: string;
  type: string;
  who: string;
}

export interface CompanyTransactions extends FlexbaseResponse {
  companyId: string;
  fromDate: string;
  tenantId: string;
  toDate: string;
  transactions: Transaction[];
}
