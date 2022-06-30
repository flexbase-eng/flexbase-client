import { DateTime } from 'luxon';

export interface InvoiceOptions {
    before?: DateTime;
    after?: DateTime;
    includeCardholder?: boolean;
    includeMerchantName?: boolean;
    includeReversed?: boolean;
    includeExpired?: boolean;
}
