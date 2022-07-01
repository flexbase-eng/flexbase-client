import { compose, rest as mockServer } from 'msw'
import { badCompanyId, errorCompanyId, mockUrl } from '../constants';

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
];