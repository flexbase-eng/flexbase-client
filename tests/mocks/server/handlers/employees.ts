import { compose, rest as mockServer } from 'msw'
import { goodUserId, mockUrl } from '../constants';

export const employees_handlers = [
    mockServer.get(mockUrl + "/user", (_, response, context) => {

        const res = compose(
            context.status(200),
            context.json([
                {
                    id: goodUserId,
                    firstName: "Ann",
                    lastName: "Smith",
                    jobTitle: "Manager",
                }
            ]),

        );
        
        return response(res);
    }),
];


export const employees_error_handlers = [
    mockServer.get(mockUrl + "/user", (_, response, context) => {

        const res = compose(
            context.status(400),
        );
        return response(res);
    }),
];