import { FlexbaseResponse } from "../FlexbaseResponse";

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
      postalCode: string;
      project?: string,
      state: string;
      total: string;
  }

export interface StatementCredit extends FlexbaseResponse {
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