import { InvoiceOptions } from 'src/models/InvoiceOptions';
import { Invoice } from '../models/Invoice';
import { FlexbaseClientBase } from './FlexbaseClient.Base';

interface InvoiceResponse {
    success: boolean;
    error?: string;
    invoices: Invoice[];
}

export class FlexbaseCardsInvoice extends FlexbaseClientBase {
    private buildParams(options?: InvoiceOptions) {
        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        const params: any = {};

        if (options?.before) {
            params.before = options.before.toISO();
        }

        if (options?.after) {
            params.after = options.after.toISO();
        }

        if (options?.includeCardholder === true) {
            params.inclCardholder = true;
        }

        if (options?.includeMerchantName === true) {
            params.inclStore = true;
        }

        if (options?.includeReversed === true) {
            params.inclReversed = true;
        }

        if (options?.includeExpired === true) {
            params.inclExpired = true;
        }

        return params;
    }

    async getInvoicesByCompany(companyId: string, options?: InvoiceOptions): Promise<Invoice[] | null> {
        try {
            const params = this.buildParams(options);

            const response = await this.client.url(`/invoice/company/${companyId}`).query(params).get().json<InvoiceResponse>();

            if (!response.success) {
                return null;
            }

            return response.invoices;
        } catch (error) {
            this.logger.error('Unable to get company transactions', error);
            return null;
        }
    }

    async getInvoicesByUser(userId: string, options?: InvoiceOptions): Promise<Invoice[] | null> {
        try {
            const params = this.buildParams(options);

            const response = await this.client.url(`/invoice/user/${userId}`).query(params).get().json<InvoiceResponse>();

            if (!response.success) {
                return null;
            }

            return response.invoices;
        } catch (error) {
            this.logger.error('Unable to get company transactions', error);
            return null;
        }
    }
}
