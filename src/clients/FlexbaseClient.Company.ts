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

export class FlexbaseClientCompany extends FlexbaseClientBase {

   async getCompanyBalance(companyId: string): Promise<CompanyBalance | null> {
        try {
            return this.client.url(`/servicing/minimumDue/${companyId}`).get().json();
        } catch (error) {
            this.logger.error(`Unable to get company balance data`, error);
            return null;
        }
    }
}
