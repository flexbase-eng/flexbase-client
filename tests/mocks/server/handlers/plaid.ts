import { compose, rest as mockServer } from 'msw'
import { mockUrl, plaidLinkToken, goodPlaidPublicToken, badPlaidPublicToken } from "../constants";

export const plaid_handlers = [
    mockServer.get(mockUrl + "/plaid/linktoken", (_, response, context) => {

        const res = compose(
            context.status(200),
            context.json({
                "success": true,
                "response": {
                    expiration: "100",
                    link_token: plaidLinkToken,
                    request_id: "1",
                }
            }),

        );
        return response(res);
    }),

    mockServer.get(mockUrl + "/plaid/linktoken/update", (_, response, context) => {

        const res = compose(
            context.status(200),
            context.json({
                "success": true,
                "response": {
                    expiration: "100",
                    link_token: plaidLinkToken,
                    request_id: "1",
                }
            }),

        );
        return response(res);
    }),

    mockServer.post<{ public_token: string, metadata: unknown }>(mockUrl + "/plaid/publicToken", (request, response, context) => {

        if (request.body.public_token === goodPlaidPublicToken) {
            const res = compose(
                context.status(200),
                context.json({
                    "success": true,
                    "response": {
                        accessToken: plaidLinkToken,
                        accountId: "101",
                        itemId: "1",
                        userId: "9"
                    }
                }),

            );

            return response(res);
        } else if (request.body.public_token === badPlaidPublicToken) {
            const res = compose(
                context.status(200),
                context.json({
                    "success": false
                }),
            );

            return response(res);
        } else {
            const res = compose(
                context.status(400),
            );

            return response(res);
        }
    }),

    mockServer.get(mockUrl + "/plaid/acctLocation", (_, response, context) => {

        const res = compose(
            context.status(200),
            context.json({
                accountName: "Checking",
                accountType: "checking",
                bankName: "Customer Bank",
                officialAccountName: "Plaid checking",
                success: true            
            }),

        );
        return response(res);
    }),
];

export const plaid_failure_handlers = [
    mockServer.get(mockUrl + "/plaid/linktoken", (_, response, context) => {

        const res = compose(
            context.status(200),
            context.json({
                "success": false,               
            }),
    
        );
        return response(res);
    }),

    mockServer.get(mockUrl + "/plaid/linktoken/update", (_, response, context) => {

        const res = compose(
            context.status(200),
            context.json({
                "success": false,              
            }),

        );
        return response(res);
    }),

    mockServer.get(mockUrl + "/plaid/acctLocation", (_, response, context) => {

        const res = compose(
            context.status(400),
        );
        return response(res);
    }),
];

export const plaid_http_error_handlers = [
    mockServer.get(mockUrl + "/plaid/linktoken", (_, response, context) => {

        const res = compose(
            context.status(400),
        );
        return response(res);
    }),

    mockServer.get(mockUrl + "/plaid/linktoken/update", (_, response, context) => {

        const res = compose(
            context.status(400),
        );
        return response(res);
    }),
];