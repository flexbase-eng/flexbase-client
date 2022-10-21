import { compose, rest as mockServer } from 'msw'
import { errorCompanyId, mockUrl } from '../constants';

export const servicing_handlers = [
    mockServer.get(mockUrl + "/servicing/statement/:companyId?target=", (request, response, context) => {
        const { companyId } = request.params;

        if (companyId === errorCompanyId) {
            const res = compose(
                context.status(400),
            );
            return response(res);
        }

        const res = compose(
            context.status(200),
            context.json({
                invoicesNewPeriodFrom: "2022-08-16",
                invoicesNewPeriodTo: "2022-08-31",
                invoicesNewSum: "2000.00",
                minimumDue: -6759,
                payments: [
                  {
                    "amount": "-3000.00",
                    "createdAt": "2022-09-15 00:48:14.704+00",
                    "datePosted": "2022-09-19 00:48:14.704+00",
                    "failureReason": null,
                    "origin": "manual",
                    "status": "succeeded"
                  }
                ],
                paymentsPeriodFrom: "2022-08-16",
                paymentsPeriodTo: "2022-08-31",
                paymentsSum: "0.00",
                previousBalance: 1875,
                success: true
            }),
        );
        
        return response(res);
    }),
];