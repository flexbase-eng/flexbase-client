import { DateTime } from "luxon";
import { Invoice } from "../models/Invoice";
import { FlexbaseClientBase } from "./FlexbaseClient.Base";

interface InvoiceResponse {
    success: boolean,
    error?: string,
    invoices: Invoice[]
}

export class FlexbaseCardsInvoice extends FlexbaseClientBase {
    async getInvoicesByCompany(companyId: string, before?: DateTime, after?: DateTime,
        includeCardholder?: boolean, includeMerchantName?: boolean,
        includeReversed?: boolean, includeExpired?: boolean): Promise<Invoice[] | null> {

        try {
            const params: any = {};

            if (before) {
                params.before = before.toISO();
            }

            if (after) {
                params.after = after.toISO();
            }

            if (includeCardholder === true) {
                params.inclCardholder = true;
            }

            if (includeMerchantName === true) {
                params.inclStore = true;
            }

            if (includeReversed === true) {
                params.inclReversed = true;
            }

            if (includeExpired === true) {
                params.inclExpired = true;
            }

            const response = await this.client
                .url(`/invoice/company/${companyId}`)
                .query(params)
                .get()
                .json<InvoiceResponse>();

            if (!response.success) {
                return null;
            }

            return response.invoices;
        } catch (error) {
            // console.error('Unable to get company transactions', error);
            return null;
        }
    }

    async getInvoicesByUser(userId: string, before?: DateTime, after?: DateTime,
        includeCardholder?: boolean, includeMerchantName?: boolean,
        includeReversed?: boolean, includeExpired?: boolean): Promise<Invoice[] | null> {
        try {
            const params: any = {};

            if (before) {
                params.before = before.toISO();
            }

            if (after) {
                params.after = after.toISO();
            }

            if (includeCardholder === true) {
                params.inclCardholder = true;
            }

            if (includeMerchantName === true) {
                params.inclStore = true;
            }

            if (includeReversed === true) {
                params.inclReversed = true;
            }

            if (includeExpired === true) {
                params.inclExpired = true;
            }

            const response = await this.client
                .url(`/invoice/user/${userId}`)
                .query(params)
                .get()
                .json<InvoiceResponse>();

            if (!response.success) {
                return null;
            }

            return response.invoices;
        } catch (error) {
            // console.error('Unable to get company transactions', error);
            return null;
        }
    }
}