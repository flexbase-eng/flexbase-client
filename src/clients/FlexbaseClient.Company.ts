import { FlexbaseClientBase } from './FlexbaseClient.Base';

interface CompanyBalance {
    success: boolean;
    totalInvoices: number;
    totalPayments: number;
    currentBalance: number;
    creditLimit: number;
    availableLimit: number;
    minimumDue: number;
    billDate: string;
    graceDate: string;
}

interface Payment {
    amount: string;
    status: string;
    datePosted: string;
    origin: string;
    id: string;
}

interface PaymentsResponse {
    success: boolean;
    payments: Payment[];
}

export class FlexbaseClientCompany extends FlexbaseClientBase {
    async getCompanyBalance(companyId: string): Promise<CompanyBalance | null> {
        try {
            return this.client.url(`/servicing/minimumDue/${companyId}`).get().json();
        } catch (error) {
            this.logger.error(`Unable to get company balance data`, error);
            return null;
        }
    }

    async getCompanyPayments(): Promise<Payment[] | null> {
        try {
            const response = await this.client.url('/servicing/payments').get().json<PaymentsResponse>();

            if (!response.success) {
                return null;
            }

            return response.payments;
        } catch (error) {
            this.logger.error(`Unable to get company payments`, error);
            return null;
        }
    }
}
