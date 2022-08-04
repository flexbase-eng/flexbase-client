import { compose, rest as mockServer } from 'msw'
import { mockUrl } from "../constants";

export const password_handlers = [
    mockServer.post(mockUrl + "/auth/setPass", (_, response, context) => {

        const res = compose(
            context.status(200),
            context.json({
                success: true,
            }),

        );
        return response(res);
    }),

    mockServer.post(mockUrl + "/auth/token", (_, response, context) => {

        const res = compose(
            context.status(200),
            context.json({
                token: 'goodToken',
            }),

        );
        return response(res);
    }),
];

export const password_failure_handlers = [
    mockServer.post(mockUrl + "/auth/setPass", (_, response, context) => {

        const res = compose(
            context.status(400),
        );
        return response(res);
    }),

    mockServer.post(mockUrl + "/auth/token", (_, response, context) => {

        const res = compose(
            context.status(400),
        );
        return response(res);
    }),
];
