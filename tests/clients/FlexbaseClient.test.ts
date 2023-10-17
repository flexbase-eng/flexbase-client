import { test, expect } from 'vitest';
import { FlexbaseClient } from '../../src/index';
import { Wretcher } from 'wretch';
import { AuthenticationTokenAccessor } from '@flexbase/http-client-middleware';
import { Mock } from 'moq.ts';
import { ProtectedFlexbaseClient } from '../mocks/TestFlexbaseClient';
import { goodToken, testTokenType } from '../mocks/server/constants';

test('FlexbaseClient mixins', () => {
  const wretch = new Mock<Wretcher>();

  const tokenAccessor = new Mock<AuthenticationTokenAccessor<any>>();

  const client = new FlexbaseClient(wretch.object(), tokenAccessor.object());

  expect(typeof client.getAddressPreview).toBe('function');
  expect(typeof client.exchangePlaidPublicToken).toBe('function');
  expect(typeof client.getPlaidLinkToken).toBe('function');
  expect(typeof client.updatePlaidLinkToken).toBe('function');
  expect(typeof client.getInvoicesByCompany).toBe('function');
  expect(typeof client.getInvoicesByUser).toBe('function');
  expect(typeof client.getPerson).toBe('function');
  expect(typeof client.updatePerson).toBe('function');
  expect(typeof client.updatePersonPicture).toBe('function');
  expect(typeof client.getPersonPicture).toBe('function');
  expect(typeof client.getMerchant).toBe('function');
});

test('FlexbaseClient set auth token', () => {
  const wretch = new Mock<Wretcher>();

  const tokenAccessor = new Mock<AuthenticationTokenAccessor<any>>();

  const client = new ProtectedFlexbaseClient(wretch.object(), tokenAccessor.object());

  client.setAuthenticationToken({
    token: goodToken,
    tokenType: testTokenType,
    expiration: 100,
    scope: 'scope',
  });

  const token = client.token;

  expect(token).not.toBeNull();
  expect(token!.token).toBe(goodToken);
  expect(token!.tokenType).toBe(testTokenType);
  expect(token!.expiration).toBe(100);
  expect(token!.refreshToken).toBeUndefined();
  expect(token!.scope).toBe('scope');
});

test('FlexbaseClient get token accessor', () => {
  const wretch = new Mock<Wretcher>();

  const tokenAccessor = new Mock<AuthenticationTokenAccessor<any>>();

  const client = new ProtectedFlexbaseClient(wretch.object(), tokenAccessor.object());

  const accessor = client.public_tokenAccessor;

  expect(accessor).not.toBeNull();
  expect(accessor).toBe(tokenAccessor.object());
});
