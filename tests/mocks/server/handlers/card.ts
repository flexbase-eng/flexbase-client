import { compose, rest as mockServer } from 'msw'
import { mockUrl, badUserId, errorUserId, badCardId, errorCardId, goodCardId } from '../constants';

export const card_handlers = [
    mockServer.get(mockUrl + "/card/company", (_, response, context) => {

        const res = compose(
            context.status(200),
            context.json({
                success: true,
                cards: [
                    {
                        id: goodCardId,
                        cardName: 'Card Test',
                        cardNumber: "1234",
                        status: 'active',
                    },
                ]
            }),

        );
        return response(res);
    }),

    mockServer.get(mockUrl + "/card/:cardId", (request, response, context) => {

        const { cardId } = request.params;

        if (!cardId || cardId === errorCardId) {
            const res = compose(
                context.status(400),
            );
            return response(res);
        }
        else if (cardId === badCardId) {
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
                    id: goodCardId,
                    cardName: 'Card Test',
                    cardNumber: "1234",
                    status: 'active',
                },
            }),

        );
        return response(res);
    }),

    mockServer.post(mockUrl + "/card/:userId/issue", (request, response, context) => {

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
                    id: goodCardId,
                    cardName: 'Card Test',
                    cardNumber: "1234",
                    status: 'active',
                },
            }),

        );
        return response(res);
    }),

    mockServer.put(mockUrl + "/card/:cardId", (request, response, context) => {

        const { cardId } = request.params;

        if (!cardId || cardId === errorCardId) {
            const res = compose(
                context.status(400),
            );
            return response(res);
        }

        if (cardId === badCardId) {
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
                    id: goodCardId,
                    cardName: 'Gas Card',
                    cardNumber: "1234",
                    creditLimit: 5000,
                    status: 'active',
                    expensesTypes: {
                        amount: 5000,
                        groups: ['MATERIALSUPPLIERS'],
                        interval: 'monthly',
                    },
                },
            }),

        );
        return response(res);
    }),

    mockServer.put(mockUrl + "/card/status", (request, response, context) => {

        const res = compose(
            context.status(200),
            context.json({
                success: true,
                card: {
                    id: goodCardId,
                    cardName: 'Gas Card',
                    cardNumber: "1234",
                    creditLimit: 5000,
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

    mockServer.put(mockUrl + "/card/status", (_, response, context) => {

        const res = compose(
            context.status(200),
            context.json({
                success: false,
                error: "Error message",               
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

    mockServer.put(mockUrl + "/card/status", (_, response, context) => {

        const res = compose(
            context.status(400),
        );
        return response(res);
    }),
];

