import { compose, rest as mockServer } from 'msw'
import { badCompanyId, errorCompanyId, goodCompanyId, mockUrl } from '../constants';

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

    mockServer.get(mockUrl + "/servicing/transactions/:companyId", (request, response, context) => {
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
                    error: 'Unable to get company transactions data',
                })
            );
            return response(res);
        }

        const res = compose(
            context.status(200),
            context.json({
                companyId: goodCompanyId,
                fromDate: "2022-09-10",
                tenantId: "f3807f71-dede-4cc9-ba9c-a30b9fd8cac2",
                toDate: "2022-12-31",
                transactions: [
                  {
                    amount: "5.00",
                    date: "2022-09-12",
                    transaction: "DOZR.com",
                    type: "bnpl",
                    who: "Juston Test"
                  },
                  {
                    amount: "-100.08",
                    date: "2022-10-04",
                    transaction: "Flexbase Credit Payment",
                    type: "manual",
                    who: "Juston Test"
                  },
                  {
                    amount: "0.42",
                    date: "2022-11-01",
                    transaction: "Flexbase Credit Payment",
                    type: "interest",
                    who: "Juston Test"
                  }
                ]
              }),
        );
        
        return response(res);
    }),
];
