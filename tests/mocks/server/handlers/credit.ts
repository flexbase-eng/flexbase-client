import { compose, rest as mockServer } from 'msw'
import { PayWithFlexbase } from '../../../../src/index';
import { badApiKey, badCompanyId, errorApiKey, errorCompanyId, goodApiKey, mockUrl } from '../constants';

export const credit_handlers = [
    mockServer.get(mockUrl + "/servicing/minimumDue", (request, response, context) => {

        const id = request.url.searchParams.get('id');

        if (!id || id === errorCompanyId) {
            const res = compose(
                context.status(400),
            );
            return response(res);
        }
        else if (id === badCompanyId) {
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
                availableLimit: 100,
                creditLimit: 1000
            }),

        );

        return response(res);
    }),

    mockServer.post<PayWithFlexbase>(mockUrl + "/credit/buyNow", (request, response, context) => {

        const { apiKey, amount, session } = request.body;


        if (!apiKey || apiKey === errorApiKey) {
            const res = compose(
                context.status(400),
            );
            return response(res);
        }
        else if (apiKey === badApiKey) {
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
                approved: apiKey === goodApiKey,
                invoice: { amount, session },
                merchant: { id: apiKey, baseUrl: 'http://fake.fake' }
            }),

        );

        return response(res);
    }),
];