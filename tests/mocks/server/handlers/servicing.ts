import { compose, rest as mockServer } from 'msw'
import { badCompanyId, errorCompanyId, mockUrl } from '../constants';

export const servicing_handlers = [
    mockServer.get(mockUrl + "/servicing/statement/:companyId", (request, response, context) => {
        const { companyId } = request.params;

        if (companyId === errorCompanyId) {
            const res = compose(
                context.status(400),
            );
            return response(res);
        } else if (companyId === badCompanyId) {
            const res = compose(
                context.status(200),
                context.json({
                    success: false,
                    error: 'Unable to get credit statement data',
                })
            );
            return response(res);
        }

        const res = compose(
            context.status(200),
            context.json({
                company: {
                    active: true,
                    address: "5018 Bridgevalley Ct",
                    addressLine2: null,
                    autopay: false,
                    city: "Spring",
                    country: "US",
                    creditLimit: "$25,000.00",
                    frozen: false,
                    name: "Texas Stag Roofing Solutions",
                    phone: "2102552027",
                    postalCode: "77379-5148",
                    state: "TX"
                },
                invoicesNewPeriodFrom: "2022-08-16",
                invoicesNewPeriodTo: "2022-08-31",
                invoicesNewSum: "2000.00",
                minimumDue: -6759,
                payments: [
                  {
                    amount: "-3000.00",
                    createdAt: "2022-09-15 00:48:14.704+00",
                    datePosted: "2022-09-19 00:48:14.704+00",
                    failureReason: null,
                    origin: "manual",
                    status: "succeeded"
                  }
                ],
                invoicesNew: [
                  {
                    cardholder: "Juston Test",
                    city: "Wilmington",
                    date: "2022-09-16 00:00:00+00",
                    last4: "-7554",
                    name: "DOZR.com",
                    origin: "bnpl",
                    postalCode: "19810",
                    project: null,
                    state: "DE",
                    total: "21.20",
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
