import { compose, rest as mockServer } from 'msw'
import { errorCompanyId, goodCompanyId, mockUrl } from '../constants';

export const company_handlers = [
    mockServer.get(mockUrl + "/servicing/minimumDue/:companyId", (request, response, context) => {

        const { companyId } = request.params;

        if (companyId === errorCompanyId) {
            const res = compose(
                context.status(400),
            );
            return response(res);
        }

        const res = compose(
            context.status(200),
            context.json(
                {
                    success: true,
                    totalInvoices: 1097,
                    totalPayments: 0,
                    currentBalance: 1097,
                    creditLimit: 10000,
                    availableLimit: 8903,
                    minimumDue: 1097,
                    billDate: '2022-07-31',
                    graceDate: '2022-06-01'
                }
            ),

        );
        
        return response(res);
    }),

    mockServer.get(mockUrl + "/servicing/payments", (_, response, context) => {


        const res = compose(
            context.status(200),
            context.json([
                {
                    status: 'succeeded',
                    amount: '100.00',
                    datePosted: '2022-07-31',
                }
            ]),

        );
        
        return response(res);
    }),
];