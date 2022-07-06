import { InvoiceOptions } from '../models/Invoice/InvoiceOptions';
import { Invoice } from '../models/Invoice/Invoice';
import { FlexbaseClientBase } from './FlexbaseClient.Base';

interface InvoicesResponse {
    success: boolean;
    error?: string;
    invoices: Invoice[];
}

interface InvoiceResponse {
    error: string;
    success: boolean;
    invoice: Invoice;
  }

interface InvoiceForm {
    contractId: string;
    description: string;
  }

export class FlexbaseClientInvoice extends FlexbaseClientBase {
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

            const response = await this.client.url(`/invoice/company/${companyId}`).query(params).get().json<InvoicesResponse>();

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

            const response = await this.client.url(`/invoice/user/${userId}`).query(params).get().json<InvoicesResponse>();

            if (!response.success) {
                return null;
            }

            return response.invoices;
        } catch (error) {
            this.logger.error('Unable to get company transactions', error);
            return null;
        }
    }

    async uploadInvoiceFile(file: File, invoiceId: string): Promise<Invoice[] | null> {
        try {
          const response = await this.client.url(`/invoice/${invoiceId}/invoicePic`).formData({ file }).post().json();
         
            if (!response.success) {
              return null;
            }

           return response.invoice;
        } catch (error) {
            this.logger.error('Unable to upload invoice file', error);
            return null;
        }
      }
    
      async updateInvoice(invoiceId: string, invoiceForm: InvoiceForm): Promise<Invoice | null> {
        try {
          const response = await this.client.url(`/invoice/${invoiceId}/summary`).put(invoiceForm).json<InvoiceResponse>();
            
            if (!response.success) {
                return null;
            }
  
           return response.invoice;
        } catch (error) {
          console.error('Unable to update the invoice', error);
          return null;
        }
      }
}
