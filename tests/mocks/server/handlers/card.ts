import { compose, rest as mockServer } from 'msw'
import { mockUrl, goodUserId, badUserId, errorUserId } from '../constants';

export const card_handlers = [
    mockServer.get(mockUrl + "/card/company", (_, response, context) => {

        const res = compose(
            context.status(200),
            context.json({
                success: true,
                cards: [
                    {
                        id: "0",
                        cardName: 'Card Test',
                        cardNumber: "1234",
                        status: 'active',
                    },
                    {
                        id: "1",
                        cardName: 'Card Test 2',
                        cardNumber: "5678",
                        status: 'issued',
                    }
                ]
            }),

        );
        return response(res);
    }),

    mockServer.get(mockUrl + "/card/:userId", (request, response, context) => {

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
                card: {
                    id: "0",
                    cardName: 'Card Test',
                    cardNumber: "1234",
                    status: 'active',
                },
            }),

        );
        return response(res);
    }),
]

export const card_failure_handlers = [
    mockServer.get(mockUrl + "/card/company", (_, response, context) => {

        const res = compose(
            context.status(200),
            context.json({
                success: false,               
            }),
    
        );
        return response(res);
    }),
];

export const card_error_handlers = [
    mockServer.get(mockUrl + "/card/company", (_, response, context) => {

        const res = compose(
            context.status(400),
        );
        return response(res);
    }),
];
