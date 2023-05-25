import { FlexbaseClientBase } from './FlexbaseClient.Base';
import { FlexbaseResponse } from '../models/FlexbaseResponse';
import { Company } from '../models/Business/Company';

export interface CompanyBalance {
    success: boolean;
    totalInvoices: number;
    totalPayments: number;
    currentBalance: number;
    creditLimit: number;
    availableLimit: number;
    minimumDue: number;
    maximumAllowedPayment: number;
    billDate: string;
    graceDate: string;
    delinquentAmount?: number;
    delinquentDays?: number;
    interestDue?: number;
}

interface Payment {
    amount: string;
    status: string;
    datePosted: string;
    createdAt: string;
    origin: string;
    id: string;
}

interface ResponseCompanyData extends FlexbaseResponse {
    id: string;
    companyName: string;
    dba: string;
    phone: string;
    address: string;
    addressLine2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    createdAt: string;
}

interface CompanyResponse extends FlexbaseResponse {
    company: Company | null;
}

interface PaymentsResponse extends FlexbaseResponse {
    payments?: Payment[];
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

    async getCompanyPayments(): Promise<PaymentsResponse> {
        try {
            const response = await this.client.url('/servicing/payments').get().json<PaymentsResponse>();

            if (!response.success) {
                this.logger.error('Unable to get company payments', response.error);
            }

            return response;
        } catch (error) {
            this.logger.error(`Unable to get company payments`, error);
            return { success: false, error: 'Unable to get company payments', payments: [] };
        }
    }

    async getCompanyData(): Promise<CompanyResponse> {
        try {
            const response = await this.client.url(`/tenant`).get().json<ResponseCompanyData>();

            if (!response) {
                this.logger.error('Unable to get company data', response);
            }
            return {
                company: {
                    id: response?.id,
                    companyName: response?.companyName,
                    phone: response?.phone,
                    doingBusinessAs: response?.dba,
                    createdAt: response?.createdAt,
                    address: {
                        line1: response?.address,
                        line2: response?.addressLine2,
                        city: response?.city,
                        state: response?.state,
                        postalCode: response?.postalCode,
                        country: response?.country,
                    },
                },
                success: true,
            };
        } catch (error) {
            this.logger.error(`Unable to get company data`, error);
            return { success: false, error: 'Unable to get company data', company: null };
        }
    }
}
