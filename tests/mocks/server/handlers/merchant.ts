import { compose, rest as mockServer } from 'msw'
import { badApiKey, errorApiKey, mockUrl } from '../constants';

export const merchant_handlers = [
    mockServer.get(mockUrl + "/credit/merchant/:apiKey", (request, response, context) => {

        const { apiKey } = request.params;

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
                merchant: { apiKey },
            }),

        );

        return response(res);
    }),
];