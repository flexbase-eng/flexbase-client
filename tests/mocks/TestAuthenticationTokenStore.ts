import { AuthenticationTokenStore, AuthenticationToken } from "@flexbase/http-client-middleware";

export class TestAuthenticationTokenStore implements AuthenticationTokenStore {
    private _token: AuthenticationToken | null;

    retrieveToken(): AuthenticationToken | null {
        return this._token;
    }
    storeToken(token: AuthenticationToken): void {
        this._token = token;
    }

}