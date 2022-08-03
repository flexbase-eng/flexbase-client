import { compose, rest as mockServer } from 'msw'
import { mockUrl, badCompanyId, errorCompanyId } from '../constants';

export const banking_handlers = [
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
]
