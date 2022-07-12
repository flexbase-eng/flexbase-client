import { compose, rest as mockServer } from 'msw';
import { badCompanyId, errorCompanyId, mockUrl } from '../constants';

export const onboarding_handlers = [
    mockServer.get(mockUrl + '/onboarding', (request, response, context) => {
        const full = request.url.searchParams.get('full');

        const res = compose(
            context.status(200),
            context.json({
                success: true,
                required: ['test'],
                completedTimestamp: '2022-02-16 20:29:03.433+00',
                user: {
                    id: '',
                    email: '',
                    companyId: '',
                },
                company: {
                    id: '',
                },
            })
        );

        return response(res);
    }),
];
