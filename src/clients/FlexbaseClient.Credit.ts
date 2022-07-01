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

export class FlexbaseClientCredit extends FlexbaseClientBase {
    async getCompanyCredit(companyId: string): Promise<CompanyCredit | null> {
        if (!companyId) {
            throw new Error('companyId is required');
        }

        try {
            const response = await this.client.url(`/servicing/minimumDue?id=${companyId}`).get().json<CompanyCreditResponse>();

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
}
