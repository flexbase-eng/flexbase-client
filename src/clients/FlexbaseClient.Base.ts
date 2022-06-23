import { AuthenticationTokenAccessor, AuthenticationToken } from '@flexbase/http-client-middleware';
import { Wretcher } from 'wretch';

export abstract class FlexbaseClientBase {
    private readonly _client: Wretcher;
    private _tokenAccessor: AuthenticationTokenAccessor<any>;
    private _token: AuthenticationToken | null;

    constructor(client: Wretcher, tokenAccessor: AuthenticationTokenAccessor<any>) {
        this._client = client;
        this._tokenAccessor = tokenAccessor;
        this._token = null;
    }

    protected get client(): Wretcher {
        return this._client;
    }

    get token(): AuthenticationToken | null {
        return this._token;
    }

    protected setAuthenticationToken(authToken: AuthenticationToken | null) {
        this._token = authToken;
        this.client._options = {
            ...this.client._options,
            authContext: {
                token: this._token,
            },
        };
    }

    protected get tokenAccessor(): AuthenticationTokenAccessor<any> {
        return this._tokenAccessor;
    }
}
