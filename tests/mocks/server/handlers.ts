import { compose, rest as mockServer } from 'msw';
import {
    badPlaidPublicToken,
    goodPass,
    goodPlaidPublicToken,
    goodRefreshToken,
    goodToken,
    goodUser,
    mockUrl,
    plaidLinkToken,
    testTokenType,
    tokenUrl,
    tokenUrl2,
} from './constants';
import { address_handlers } from './handlers/address';
import { credit_handlers } from './handlers/credit';
import { invoice_handlers } from './handlers/invoice';
import { merchant_handlers } from './handlers/merchant';
import { onboarding_handlers } from './handlers/onboarding';
import { patron_handlers } from './handlers/patron';
import { person_handlers } from './handlers/person';
import { plaid_handlers } from './handlers/plaid';
import { underwriting_handlers } from './handlers/underwriting';
import { project_handlers } from './handlers/project';
import { doc_handlers } from './handlers/doc';
import { card_handlers } from './handlers/card';

interface TokenRequest {
    grant_type: string;
    refresh_token?: string;
    scope: string;

    email?: string; // not username
    password?: string;

    client_id?: string;
    client_secret?: string;
}

const createToken = (request, response, context, token_type: string | null) => {
    const isXURL: boolean = request.headers.get('Content-Type') === 'application/x-www-form-urlencoded;charset=UTF-8';

    if (!isXURL) {
        return response(context.status(400));
    }

    let body: TokenRequest = <TokenRequest>{};

    request.body.split('&').forEach(x => {
        const [a, b] = x.split('=');
        return Object.assign(body, { [a]: b });
    });

    const { grant_type, scope } = body;

    let valid = false;

    if (grant_type === 'password') {
        const { email, password } = body;
        valid = email === goodUser && password === goodPass;
    } else if (grant_type === 'refresh_token') {
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

    const res = compose(context.status(valid ? 200 : 401), context.json(json));

    return response(res);
};

export const handlers = [
    mockServer.post<string>(tokenUrl, (request, response, context) => createToken(request, response, context, 'Bearer')),
    mockServer.post<string>(tokenUrl2, (request, response, context) => createToken(request, response, context, null)),

    ...plaid_handlers,
    ...address_handlers,
    ...invoice_handlers,
    ...person_handlers,
    ...credit_handlers,
    ...underwriting_handlers,
    ...merchant_handlers,
    ...patron_handlers,
    ...onboarding_handlers,
    ...project_handlers,
    ...doc_handlers,
    ...card_handlers,
]
