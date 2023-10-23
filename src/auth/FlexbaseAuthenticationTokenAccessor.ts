import { AuthenticationToken, AuthenticationTokenAccessorBase } from '@flexbase/http-client-middleware';
import { FlexbasePasswordCredentials } from '../models/auth/FlexbasePasswordCredentials.js';
import { convertFlexbaseToken } from './ConvertFlexbaseToken.js';

export class FlexbaseAuthenticationTokenAccessor extends AuthenticationTokenAccessorBase<FlexbasePasswordCredentials> {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  protected generateBody(credentials: FlexbasePasswordCredentials, refreshToken: string | undefined): { url: string; body: any } {
    let url = '';
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    const body: any = {};

    if (refreshToken && refreshToken.trim().length !== 0) {
      body.grant_type = credentials.refreshGrantType;
      body.refresh_token = refreshToken;
      url = credentials.refreshTokenUrl || credentials.tokenUrl;
    } else {
      body.grant_type = credentials.grantType;
      body.password = credentials.password;
      url = credentials.tokenUrl;
    }

    body.email = credentials.username;
    body.scope = credentials.scope;
    body.code = credentials.code;

    return { url, body };
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  protected coerceResponse(tokenResponse: any): AuthenticationToken | null {
    return convertFlexbaseToken(tokenResponse);
  }
}
