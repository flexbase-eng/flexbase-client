import { compose, rest as mockServer } from 'msw'
import { badCompanyId, errorCompanyId, mockUrl } from '../constants';

export const underwriting_handlers = [
    mockServer.get(mockUrl + "/underwriting/updateLevel", (request, response, context) => {

        const id = request.url.searchParams.get('id');
        const level = Number(request.url.searchParams.get('level'));

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
                approved: true,
                maxLimit: 1000,
                level,
            }),

        );

        return response(res);
    }),
];