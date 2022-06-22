import { compose, rest as mockServer } from 'msw'
import { mockUrl } from '../constants';

export const address_handlers = [
    mockServer.post<{ address: string }>(mockUrl + "/address/preview", (request, response, context) => {

        if (request.body.address && request.body.address !== 'error') {
            const res = compose(
                context.status(200),
                context.json({
                    "previews": [{
                        address: request.body.address,
                        city: "Test City",
                        state: "Test State",
                        postalCode: "12345",
                        country: "usa"
                    }]
                }),

            );
            return response(res);
        }
        else {
            const res = compose(
                context.status(400),
            );
            return response(res);
        }

    }),
]