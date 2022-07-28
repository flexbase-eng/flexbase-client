import { PayWithFlexbase, PayWithFlexbaseResponse } from '../models/Credit/PayWithFlexbase';
import { CompanyCredit } from '../models/Credit/CompanyCredit';
import { FlexbaseResponse } from '../models/FlexbaseResponse';
import { FlexbaseClientBase } from './FlexbaseClient.Base';

interface CompanyCreditResponse extends FlexbaseResponse {
    availableLimit: number;
    totalInvoices: number;
    totalPayments: number;
    currentBalance: number;
    creditLimit: number;
    minimumDue: number;
    billDate: string;
    graceDate: string;
}

interface PayDebtResponse extends FlexbaseResponse {
    cardPayment: {
        amount: string;
        asOf: string;
        byUser: string;
        companyId: string;
        datePosted: string;
        failureReason: string | null,
        id: string;
        status: string;
    } | null
}



interface PayWithFlexbaseResponseWrapper extends PayWithFlexbaseResponse, FlexbaseResponse {}

export class FlexbaseClientCredit extends FlexbaseClientBase {
    async getCompanyCredit(companyId?: string): Promise<CompanyCredit | null> {
        try {
            let url = '/servicing/minimumDue';

            if (companyId) {
                url = url + `?id=${companyId}`;
            }

            const response = await this.client.url(url).get().json<CompanyCreditResponse>();

            if (!response.success) {
                this.logger.error(`Unable to get credit for company ${companyId}`);
                return null;
            }

            return {
                available: response.availableLimit,
                total: response.creditLimit,
            };
        } catch (error) {
            this.logger.error(`Unable to get credit for company ${companyId}`, error);
            return null;
        }
    }

    async payDebt(companyId?: string, amount?: string): Promise<PayDebtResponse> {
        try {

            const response = await this.client.url('/servicing/payments/stripe').post({ companyId, amount }).json<PayDebtResponse>();

            if (!response.success) {
                this.logger.error(`Unable to make the pay debt`);
            }

            return response;
        } catch (error) {
            this.logger.error(`Unable to make the pay debt`, error);
            return { success: false, error: 'Unable to make the pay debt', cardPayment: null };
        }
    }

    async requestPayWithFlexbase(payload: PayWithFlexbase): Promise<PayWithFlexbaseResponse> {
        if (!payload.apiKey || payload.amount <= 0) {
            throw new Error('apiKey is required and amount must be greater than 0');
        }

        try {
            const response = await this.client.url('/credit/buyNow').post(payload).json<PayWithFlexbaseResponseWrapper>();

            if (!response.success) {
                this.logger.error('Unable to pay with flexbase', payload);
                return { approved: false };
            }

            return response;
        } catch (error) {
            this.logger.error('Unable to pay with flexbase', payload, error);
            return { approved: false };
        }
    }
}
