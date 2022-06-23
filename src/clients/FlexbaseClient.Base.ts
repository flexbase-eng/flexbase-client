import { AuthenticationTokenAccessor, AuthenticationToken } from '@flexbase/http-client-middleware';
import { Logger, ConsoleLogger } from '@flexbase/logger';
import { Wretcher } from 'wretch';

export abstract class FlexbaseClientBase {
    private readonly _client: Wretcher;
    private readonly _logger: Logger;
    private _tokenAccessor: AuthenticationTokenAccessor<any>;
    private _token: AuthenticationToken | null;

    constructor(client: Wretcher, tokenAccessor: AuthenticationTokenAccessor<any>, logger?: Logger) {
        this._client = client;
        this._tokenAccessor = tokenAccessor;
        this._token = null;
        this._logger = logger || new ConsoleLogger();
    }

    protected get client(): Wretcher {
        return this._client;
    }

    get token(): AuthenticationToken | null {
        return this._token;
    }

    protected get logger(): Logger {
        return this._logger;
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
