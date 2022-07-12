import { compose, rest as mockServer } from 'msw'
import { mockUrl } from '../constants';

export const project_handlers = [
    mockServer.get(mockUrl + "/project/all", (_, response, context) => {

        const res = compose(
            context.status(200),
            context.json([
                {
                    id: "1",
                    name: 'Flexbase',
                    contractId: "2",
                }
            ]),

        );
        return response(res);
    }),

    mockServer.post(mockUrl + "/project", (request, response, context) => {

        if(request.body && Object.keys(request.body).length === 0) {
            const res = compose(
                context.status(400),
            );
            return response(res);
        }


        const res = compose(
            context.status(200),
            context.json({
                id: "testId",
                name: "test name",
                description: "test description",
                location: {
                    address: "test address",
                    city: "test city",
                    postalCode: "test code",
                    state: "test state"
                },
            }),

        );

        return response(res);
    }),
]

export const project_failure_handlers = [
    mockServer.get(mockUrl + "/project/all", (_, response, context) => {

        const res = compose(
            context.status(200),
            context.json({
                "success": false,               
            }),
    
        );
        return response(res);
    }),
];

export const project_error_handlers = [
    mockServer.get(mockUrl + "/project/all", (_, response, context) => {

        const res = compose(
            context.status(400),
        );
        return response(res);
    }),
];
