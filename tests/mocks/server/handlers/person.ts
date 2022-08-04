import { compose, rest as mockServer } from 'msw'
import path from 'path';
import fs from 'fs';
import { badUserId, errorUserId, goodUserId, mockUrl } from '../constants';

export const person_handlers = [
    mockServer.get(mockUrl + "/user/:userId", (request, response, context) => {

        const { userId } = request.params;

        if (!userId || userId === errorUserId) {
            const res = compose(
                context.status(400),
            );
            return response(res);
        }

        else if (userId === badUserId) {
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
                usr: { id: goodUserId },
            }),
        );
        return response(res);

    }),


    mockServer.post(mockUrl + "/onboarding/user", (_,response, context) => {


        const res = compose(
            context.status(200),
            context.json({
                success: true,
                newUser: {
                    firstName: "Ann",
                    lastName: "Smith",
                    email: "ann@flexbase.app"
                },
            }),

        );
        return response(res);
    }),

    mockServer.put(mockUrl + "/user/:userId", (request, response, context) => {

        const { userId } = request.params;

        if (!userId || userId === errorUserId) {
            const res = compose(
                context.status(400),
            );
            return response(res);
        }
        else if (userId === badUserId) {
            const res = compose(
                context.status(200),
                context.json({
                    success: false,
                    newUser: {},
                })
            );
            return response(res);
        }

        const res = compose(
            context.status(200),
            context.json({
                    firstName: "Ann",
                    lastName: "Smith",
                    email: "ann@flexbase.app"
                },
            ),

        );

        return response(res);
    }),

    mockServer.post(mockUrl + "/user/:userId/profilePic", (request, response, context) => {

        const { userId } = request.params;

        if (!userId || userId === errorUserId) {
            const res = compose(
                context.status(400),
            );
            return response(res);
        }
        else if (userId === badUserId) {
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
                success: true
            }),

        );

        return response(res);
    }),

    mockServer.get(mockUrl + "/user/:userId/profilePic", (request, response, context) => {

        const { userId } = request.params;

        if (!userId || userId === errorUserId) {
            const res = compose(
                context.status(400),
            );
            return response(res);
        }
        else if (userId === badUserId) {
            const res = compose(
                context.status(400),
                context.json({
                    success: false,
                    error: "Error message"
                })
            );
            return response(res);
        }

        const imageBuffer = fs.readFileSync(path.resolve(__dirname, '../files/person_pic.jpeg'))

        const bytes = new Uint8Array(59);

        for (let i = 0; i < 59; i++) {
            bytes[i] = 32 + i;
        }

        const res = compose(
            context.status(200),
            context.set('Content-Length', imageBuffer.byteLength.toString()),
            context.set('Content-Type', 'image/jpeg'),
            context.body(imageBuffer)
        );

        return response(res);
    }),
]