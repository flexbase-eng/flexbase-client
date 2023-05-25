import { Mock } from 'moq.ts';
import { FlexbaseAuthenticationTokenAccessor, FlexbaseClient } from '../../src';
import { mockUrl } from './server/constants';
import wretch from 'wretch';
import { AuthenticationToken, AuthenticationTokenAccessor } from '@flexbase/http-client-middleware';
import { NoopLogger } from '@flexbase/logger';
import nodeFetch from 'node-fetch';

export const testTokenAccessor = new Mock<FlexbaseAuthenticationTokenAccessor>();

export const testFlexbaseClient = new FlexbaseClient(wretch(mockUrl).polyfills({ fetch: nodeFetch }), testTokenAccessor.object(), new NoopLogger());

export class ProtectedFlexbaseClient extends FlexbaseClient {
  setAuthenticationToken(authToken: AuthenticationToken | null) {
    super.setAuthenticationToken(authToken);
  }

  get public_tokenAccessor(): AuthenticationTokenAccessor<any> {
    return this.tokenAccessor;
  }
}
