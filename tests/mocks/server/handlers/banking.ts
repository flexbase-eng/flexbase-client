import { compose, rest as mockServer } from 'msw';
import { PaymentForm } from '../../../../src/models/Banking/Payment';
import { mockUrl, badCompanyId, errorCompanyId, goodCompanyId } from '../constants';

export const banking_handlers = [
    // APPLICATION
    mockServer.get(mockUrl + '/banking/:companyId/application', (request, response, context) => {

        const { companyId } = request.params;

        if (!companyId || companyId === errorCompanyId) {
            const res = compose(
                context.status(400)
            );
            return response(res);
        } else if (companyId === badCompanyId) {
            const res = compose(
                context.status(200),
                context.json({
                    success: false,
                    error: 'Unable to get the application status'
                })
            );
            return response(res);
        }

        const res = compose(
            context.status(200),
            context.json({
                success: true,
                status: 'Approved'
            })
        );
        return response(res);
    }),

    mockServer.post(mockUrl + '/banking/:companyId/application', (request, response, context) => {

        const { companyId } = request.params;

        if (!companyId || companyId === errorCompanyId) {
            const res = compose(
                context.status(400)
            );
            return response(res);
        } else if (companyId === badCompanyId) {
            const res = compose(
                context.status(200),
                context.json({
                    success: false,
                    error: 'Unable to create the application for the company'
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
                status: 'Approved'
            })
        );
        return response(res);
    }),

    // STATEMENTS
    mockServer.get(mockUrl + '/banking/:companyId/statements', (request, response, context) => {

        const { companyId } = request.params;

        if (!companyId || companyId === errorCompanyId) {
            const res = compose(
                context.status(400)
            );
            return response(res);
        } else if (companyId === badCompanyId) {
            const res = compose(
                context.status(200),
                context.json({
                    success: false,
                    error: 'Unable to get the list of statements'
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
                        type: 'statement'
                    }
                ],
                success: true
            })
        );
        return response(res);
    }),

    mockServer.get(mockUrl + '/banking/:companyId/statements/:statementId', (request, response, context) => {

        const { companyId } = request.params;

        if (!companyId || companyId === errorCompanyId) {
            const res = compose(
                context.status(400)
            );
            return response(res);
        } else if (companyId === badCompanyId) {
            const res = compose(
                context.status(200),
                context.json({
                    success: false,
                    error: 'Unable to get the statement details for statementId 0123'
                })
            );
            return response(res);
        }

        const res = compose(
            context.status(200),
            context.json({
                statement: 'html/pdf document',
                success: true
            })
        );
        return response(res);
    }),

    // PAYMENTS
    mockServer.post(mockUrl + '/banking/:companyId/moneymovement', (request, response, context) => {

        const { companyId } = request.params;
        const body = request.body as PaymentForm;

        if (!companyId || companyId === errorCompanyId) {
            const res = compose(
                context.status(400)
            );
            return response(res);
        } else if (companyId === badCompanyId) {
            const res = compose(
                context.status(200),
                context.json({
                    success: false,
                    error: 'Unable to create a Unit Co. Payment'
                })
            );
            return response(res);
        }

        const res = compose(
            context.status(200),
            context.json({
                success: true,
                payment: {
                    id: '01234',
                    companyId: goodCompanyId,
                    payAmount: body.amount,
                    payDescription: body.description
                }
            })
        );
        return response(res);
    }),

    mockServer.get(mockUrl + "/banking/:companyId/moneymovement/list", (request, response, context) => {

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
                    error: 'Unable to get the list of payments',
                })
            );
            return response(res);
        }

        const res = compose(
            context.status(200),
            context.json({
                payments: [
                    {
                        id: '123',
                        companyId: '1234',
                        payAmount: '$1.25',
                        payDescription: 'payment test',
                        payDirection: 'Credit',
                        payCtrParty: 'Jane Doe',
                        status: 'Pending',
                        type: 'achPayment',
                        ucCustomerId: '463650',
                        ucDepositId: '603517',
                    }
                ],
                success: true,
            }),

        );
        return response(res);
    }),

    // COUNTERPARTIES
    mockServer.post(mockUrl + '/banking/:companyId/moneymovement/counterparty', (request, response, context) => {

        const { companyId } = request.params;

        if (!companyId || companyId === errorCompanyId) {
            const res = compose(
                context.status(400)
            );
            return response(res);
        } else if (companyId === badCompanyId) {
            const res = compose(
                context.status(200),
                context.json({
                    success: false,
                    error: 'Unable to create a Unit Co. Counter Party. Please verify that all the Counterparty banking data required exists'
                })
            );
            return response(res);
        }

        const res = compose(
            context.status(200),
            context.json({
                success: true,
                counterparty: {
                    id: '01234',
                    type: 'achCounterparty',
                    companyId: goodCompanyId
                }
            })
        );
        return response(res);
    }),

    mockServer.get(mockUrl + '/banking/:companyId/moneymovement/counterparty/list', (request, response, context) => {

        const { companyId } = request.params;

       if (companyId === badCompanyId) {
            const res = compose(
                context.status(200),
                context.json(null)
            );
            return response(res);
        }

        const res = compose(
            context.status(200),
            context.json({success: true, counterparties: [
                    {
                        id: '01234',
                        companyId: '1234',
                        accountNumber: '1000000001',
                        response: {
                            data: {
                                attributes: {
                                    accountType: 'achCounterparty',
                                    routingNumber: '812345679',
                                }
                            }
                        },
                        accountName: 'April Oniel',
                        accessToken: '01234',
                        asOf: '01/12/2022',
                        byUser: '12345',
                        createdAt: '01/12/2022',
                        type: 'achCounterparty',
                        ucCounterpartyId: '233414',
                        ucCustomerId: "563348",
                        version: 1,
                        name:"Jane Doe",
                    }
                ]}
            ),
        );

        return response(res);
    }),

    // DEPOSITS
    mockServer.get(mockUrl + '/banking/:companyId/deposits/list', (request, response, context) => {

        const { companyId } = request.params;

        if (!companyId || companyId === errorCompanyId) {
            const res = compose(
                context.status(400)
            );
            return response(res);
        } else if (companyId === badCompanyId) {
            const res = compose(
                context.status(200),
                context.json({
                    success: false,
                    error: 'While trying to get a banking deposit account, an unhandled exception was thrown'
                })
            );
            return response(res);
        }

        const res = compose(
            context.status(200),
            context.json({
                success: true,
                accounts: [
                    {
                        id: '01234',
                        type: 'depositAccount',
                        balance: 30000,
                        depositProduct: 'checking',
                        accountNumber: '000123456789',
                        plaidProcessorToken: 'processor-sandbox-18f7e98d-ee2e-49cc-99a1-7bc36b7e6e9d'
                    }
                ]
            })
        );
        return response(res);
    }),

    mockServer.get(mockUrl + '/banking/:companyId/deposits/history', (request, response, context) => {

        const { companyId } = request.params;

        if (!companyId || companyId === errorCompanyId) {
            const res = compose(
                context.status(400)
            );
            return response(res);
        } else if (companyId === badCompanyId) {
            const res = compose(
                context.status(200),
                context.json({
                    success: false,
                    error: 'While trying to get banking deposit balance history, an unhandled exception was thrown'
                })
            );
            return response(res);
        }

        const res = compose(
            context.status(200),
            context.json({
                success: true,
                statement: [
                    {
                        id: '01234',
                        type: 'accountEndOfDay',
                        attributes: {
                            available: 30000,
                            balance: 30000,
                            date: '2022-08-18',
                            hold: 0,
                            overdraftLimit: 0
                        }
                    }
                ]
            })
        );
        return response(res);
    }),

    mockServer.get(mockUrl + '/banking/:companyId/deposits/limits', (request, response, context) => {

        const { companyId } = request.params;

        if (!companyId || companyId === errorCompanyId) {
            const res = compose(
                context.status(400)
            );
            return response(res);
        } else if (companyId === badCompanyId) {
            const res = compose(
                context.status(200),
                context.json({
                    success: false,
                    error: 'While trying to get banking deposit limits, an unhandled exception was thrown'
                })
            );
            return response(res);
        }

        const res = compose(
            context.status(200),
            context.json({
                success: true,
                type: 'limits',
                attributes: {
                    card: {
                        limits: {
                            dailyWithdrawal: 500000
                        }
                    },
                    ach: {
                        limits: {
                            dailyCredit: 50000
                        }
                    }
                }
            })
        );
        return response(res);
    }),

    // DEBIT CARDS
    mockServer.get(mockUrl + '/banking/:companyId/cards', (request, response, context) => {

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
                    error: 'While trying to get banking Cards by Company, an unhandled exception occurred',
                })
            );
            return response(res);
        }

        const res = compose(
            context.status(200),
            context.json({
                success: true,
                cards: [
                    {
                        expirationDate: '2025-09',
                        id: '01234',
                        lastFour: '6559',
                        monthlyPurchase: '700000',
                        monthlyWithdrawal: '500000',
                        status: 'Active',
                        type: 'businessDebitCard',
                        ucDepositId: '770032',
                    }
                ]
            }),

        );
        return response(res);
    }),

    mockServer.post(mockUrl + '/banking/:companyId/cards', (request, response, context) => {

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
                    error: 'While trying to create a Unit Co. Debit Card, an unhandled exception was thrown',
                })
            );
            return response(res);
        }

        const res = compose(
            context.status(200),
            context.json({
                success: true,
                card: {
                    id: '01234',
                    lastFour: '6559',
                    status: 'Active',
                    dailyPurchase: '7000',
                    ucDepositId: '770032',
                    type: 'businessDebitCard',
                    expirationDate: '2025-09',
                }
            }),

        );
        return response(res);
    }),

    mockServer.put(mockUrl + '/banking/:companyId/cards', (request, response, context) => {

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
                    error: 'While trying to update the Unit Co. Debit Card, an unhandled exception was thrown',
                })
            );
            return response(res);
        }

        const res = compose(
            context.status(200),
            context.json({
                success: true,
                card: {
                    id: '01234',
                    lastFour: '6559',
                    status: 'Active',
                    ucDepositId: '770032',
                    dailyPurchase: '10000',
                    expirationDate: '2025-09',
                    type: 'businessDebitCard',
                }
            }),

        );
        return response(res);
    }),


    // TRANSACTIONS
    mockServer.get(mockUrl + '/banking/:companyId/transactions', (request, response, context) => {

        const { companyId } = request.params;

        if (!companyId || companyId === errorCompanyId) {
            const res = compose(
                context.status(400)
            );
            return response(res);
        } else if (companyId === badCompanyId) {
            const res = compose(
                context.status(200),
                context.json({
                    success: false,
                    error: 'Unable to get the list of transactions'
                })
            );
            return response(res);
        }

        const res = compose(
            context.status(200),
            context.json({
                success: true,
                transactions: [{
                    amount: '1',
                    accountNumber: '1234123412341234',
                    balance: '19999.0',
                    cardId: '430451',
                    companyName: 'Crab Shack',
                    createdAt: '2022-10-07 18:07:22.679+00',
                    customerId: '582341',
                    depositAccount: '824214',
                    depositAccountName: 'Crab Shack',
                    direction: 'Debit',
                    id: 'c1c62e41-47cd-42d6-a49f-b088b4424544',
                    summary: 'Purchase from Apple Inc.  |  Address: Cupertino, CA  |  **7879',
                    transactionId: '1827972',
                    whoDisplayName: null,
                    whoFirstName: 'Huy',
                    whoLastName: 'Pham',
                    whoUsername: 'HPham'
                }]
            })
        );
        return response(res);
    }),

    // UNITCO TOKEN
    mockServer.get(mockUrl + '/unitco/verifToken', (_, response, context) => {

        const res = compose(
            context.status(200),
            context.json({
                success: true,
                type: 'customerTokenVerification',
                attributes: {
                    verificationToken: 'verifyToken',
                }
            }),

        );
        return response(res);
    }),

    mockServer.post(mockUrl + '/unitco/custToken', (_, response, context) => {

        const res = compose(
            context.status(200),
            context.json({
                success: true,
                asOf: '2022-10-15 13:48:50.298+00',
                expiresIn: 86400,
            }),

        );
        return response(res);
    }),
];

export const banking_failure_handlers = [
    // UNITCO TOKEN
    mockServer.get(mockUrl + '/unitco/verifToken', (_, response, context) => {

        const res = compose(
            context.status(200),
            context.json({
                success: false, 
                error: 'While trying to create a new Customer Token Verification, an error occurred!',              
            }),
    
        );
        return response(res);
    }),

    mockServer.post(mockUrl + '/unitco/custToken', (_, response, context) => {

        const res = compose(
            context.status(200),
            context.json({
                success: false, 
                error: 'While trying to create a new Customer Token, an error occurred!',              
            }),
    
        );
        return response(res);
    }),
];

export const banking_error_handlers = [
    // UNITCO TOKEN
    // GET COSTUMER TOKEN
    mockServer.get(mockUrl + '/unitco/verifToken', (_, response, context) => {

        const res = compose(
            context.status(400),
        );
        return response(res);
    }),

    // CREATE COSTUMER TOKEN
    mockServer.post(mockUrl + '/unitco/custToken', (_, response, context) => {

        const res = compose(
            context.status(400),
        );
        return response(res);
    }),
];
