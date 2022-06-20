import { compose, rest as mockServer } from 'msw'
import { badPlaidPublicToken, goodPass, goodPlaidPublicToken, goodRefreshToken, goodToken, goodUser, mockUrl, plaidLinkToken, testTokenType, tokenUrl, tokenUrl2 } from './constants';

interface TokenRequest {
    grant_type: string,
    refresh_token?: string,
    scope: string,

    email?: string, // not username
    password?: string,

    client_id?: string,
    client_secret?: string,
}

const createToken = (request, response, context, token_type: string | null) => {
    const isXURL: boolean = request.headers.get("Content-Type") === "application/x-www-form-urlencoded;charset=UTF-8";

    if (!isXURL) {
        return response(context.status(400));
    }

    let body: TokenRequest = <TokenRequest>{};

    request.body.split("&").forEach(x => {
        const [a, b] = x.split("=");
        return Object.assign(body, { [a]: b });
    })

    const { grant_type, scope } = body;

    let valid = false;

    if (grant_type === "password") {
        const { email, password } = body;
        valid = email === goodUser && password === goodPass;
    }
    else if (grant_type === 'refresh_token') {
        const { email, client_id, refresh_token } = body;

        valid = email ? email === goodUser : client_id === goodUser;
        valid ||= refresh_token === goodRefreshToken;
    }

    let json: any = null;

    if (valid)
        json = {
            success: true,
            token: goodToken,
        };

    const res = compose(
        context.status(valid ? 200 : 401),
        context.json(json)
    );

    return response(res);
}

export const handlers = [

    mockServer.post<string>(tokenUrl, (request, response, context) => createToken(request, response, context, "Bearer")),
    mockServer.post<string>(tokenUrl2, (request, response, context) => createToken(request, response, context, null)),

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
]