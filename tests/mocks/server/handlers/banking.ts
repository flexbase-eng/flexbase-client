import { compose, rest as mockServer } from 'msw'
import { PaymentRequest } from '../../../../src/models/Banking/Payment';
import { mockUrl, badCompanyId, errorCompanyId, goodCompanyId } from '../constants';

export const banking_handlers = [
    // APLICATION
    mockServer.get(mockUrl + "/banking/:companyId/application", (request, response, context) => {

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
                    error: 'Unable to get the application status',
                })
            );
            return response(res);
        }

        const res = compose(
            context.status(200),
            context.json({
                success: true,
                status: 'Approved',
            }),

        );
        return response(res);
    }),

    mockServer.post(mockUrl + "/banking/:companyId/application", (request, response, context) => {

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
                    error: 'Unable to create the application for the company',
                })
            );
            return response(res);
        }

        const res = compose(
            context.status(200),
            context.json({
                id: '1',
                message: 'The Unit Co. Banking Application was approved.',
                success: true,
                status: 'Approved',
            }),

        );
        return response(res);
    }),

    // STATEMENTS
    mockServer.get(mockUrl + "/banking/:companyId/statements", (request, response, context) => {

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
                    error: 'Unable to get the list of statements',
                })
            );
            return response(res);
        }

        const res = compose(
            context.status(200),
            context.json({
                statement: [
                    {
                        id: '0123',
                        type: "statement",
                    }
                ],
                success: true,
            }),

        );
        return response(res);
    }),

    mockServer.get(mockUrl + "/banking/:companyId/statements/:statementId", (request, response, context) => {

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
                    error: 'Unable to get the statement details for statementId 0123',
                })
            );
            return response(res);
        }

        const res = compose(
            context.status(200),
            context.json({
                statement: 'html/pdf document',
                success: true,
            }),

        );
        return response(res);
    }),

    // PAYMENTS
    mockServer.post(mockUrl + "/banking/:companyId/moneymovement", (request, response, context) => {

        const { companyId } = request.params;
        const body = request.body as PaymentRequest

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
                    error: 'Unable to create a Unit Co. Payment',
                })
            );
            return response(res);
        }

        const res = compose(
            context.status(200),
            context.json({
                id: '01234',
                companyId: goodCompanyId,
                payAmount: body.amount,
                payDescription: body.description,
                success: true,
            }),

        );
        return response(res);
    }),

    // COUNTERPARTIES
    mockServer.post(mockUrl + "/banking/:companyId/moneymovement/counterparty", (request, response, context) => {

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
                    error: 'Unable to create a Unit Co. Counter Party. Please verify that all the Counterparty banking data required exists',
                })
            );
            return response(res);
        }

        const res = compose(
            context.status(200),
            context.json({
                success: true,
                ctrParty: {
                    id: '01234',
                    type: "achCounterparty",
                    companyId: goodCompanyId,
                },
            }),

        );
        return response(res);
    }),

    mockServer.post(mockUrl + "/banking/:companyId/moneymovement/counterparty/list", (request, response, context) => {

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
                    error: 'Error calling Unit Co. Banking Counterparties',
                })
            );
            return response(res);
        }

        const res = compose(
            context.status(200),
            context.json({
                success: true,
                data: [
                    {
                        id: '01234',
                        type: "achCounterparty",
                        attributes: {
                            name: "April Oniel",
                            routingNumber: "812345679",
                            accountNumber: "1000000001",
                            tags: {
                                companyId: goodCompanyId,
                            }
                        },
                    }
                ],
            }),

        );
        return response(res);
    }),
    
    // DEPOSITS
    mockServer.get(mockUrl + "/banking/:companyId/deposits", (request, response, context) => {

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
                    error: 'While trying to get a banking deposit account, an unhandled exception was thrown',
                })
            );
            return response(res);
        }

        const res = compose(
            context.status(200),
            context.json({
                id: '01234',
                type: 'depositAccount',
                attributes: {
                    balance: 30000,
                    depositProduct: 'checking',
                    accountNumber: '000123456789',
                },
                success: true,
            }),

        );
        return response(res);
    }),
]
