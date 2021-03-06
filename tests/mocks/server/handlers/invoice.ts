import { compose, rest as mockServer } from 'msw'
import { badCompanyId, errorCompanyId, mockUrl, badInvoiceId, errorInvoiceId } from '../constants';

export const invoice_handlers = [
    mockServer.get<{ address: string }>(mockUrl + "/invoice/company/:companyId", (request, response, context) => {

        const { companyId } = request.params;

        if (!companyId || companyId === errorCompanyId) {
            const res = compose(
                context.status(400),
            );
            return response(res);
        }
        else if (companyId === badCompanyId) {
            const res = compose(
                context.status(200),
                context.json({
                    success: false,
                    error: "Error message"
                })
            );
            return response(res);
        }

        const res = compose(
            context.status(200),
            context.json({
                success: true,
                invoices: [{
                    id: companyId,
                    cardId: "2"
                }]
            }),

        );

        return response(res);
    }),

    mockServer.get<{ address: string }>(mockUrl + "/invoice/user/:userId", (request, response, context) => {

        const { userId } = request.params;

        if (!userId || userId === errorCompanyId) {
            const res = compose(
                context.status(400),
            );
            return response(res);
        }
        else if (userId === badCompanyId) {
            const res = compose(
                context.status(200),
                context.json({
                    success: false,
                    error: "Error message"
                })
            );
            return response(res);
        }

        const res = compose(
            context.status(200),
            context.json({
                success: true,
                invoices: [{
                    id: userId,
                    cardId: "2"
                }]
            }),

        );

        return response(res);
    }),

    mockServer.put(mockUrl + "/invoice/:invoiceId/summary", (request, response, context) => {

        const { invoiceId } = request.params;

        if (!invoiceId || invoiceId === errorInvoiceId) {
            const res = compose(
                context.status(400),
            );
            return response(res);
        }

        else if (invoiceId === badInvoiceId) {
            const res = compose(
                context.status(200),
                context.json({
                    success: false,
                    error: "Error message"
                })
            );
            return response(res);
        }

        const res = compose(
            context.status(200),
            context.json({
                success: true,
                invoice: {
                    id: invoiceId,
                    contractId: "1",
                    description: "new invoice",
                }
            }),

        );

        return response(res);
    }),

    mockServer.post(mockUrl + "/invoice/:invoiceId/invoicePic", (request, response, context) => {

        const { invoiceId } = request.params;

        if (!invoiceId || invoiceId === errorInvoiceId) {
            const res = compose(
                context.status(400),
            );
            return response(res);
        }

        else if (invoiceId === badInvoiceId) {
            const res = compose(
                context.status(200),
                context.json({
                    success: false,
                    error: "Error message"
                })
            );
            return response(res);
        }

        const res = compose(
            context.status(200),
            context.json({
                success: true,
                invoice: {
                    id: invoiceId,
                    contractId: "1",
                    description: "new invoice",
                }
            }),

        );

        return response(res);
    }),
]
