import { test, expect } from 'vitest';
import { DateTime } from 'luxon';
import { convertFlexbaseToken } from '../../src/index';
import { goodRefreshToken, goodToken } from '../mocks/server/constants';

test('convertFlexbaseToken Success', async () => {
  const token = convertFlexbaseToken({
    token: goodToken,
    success: true,
  });

  expect(token).not.toBeNull();

  const exp = DateTime.utc().plus(3600).toUnixInteger();

  expect(token!.tokenType).toBe('Bearer');
  expect(token!.token).toBe(goodToken);
  expect(token!.expiration).toBe(exp);
  expect(token!.refreshToken).toBe(goodRefreshToken);
  expect(token!.scope).toBe('ADMIN');
});

test('convertFlexbaseToken Failure', async () => {
  const token = convertFlexbaseToken({
    token: '',
    success: false,
  });

  expect(token).toBeNull();
});

test('convertFlexbaseToken Challenge', async () => {
  const token = convertFlexbaseToken({
    token: '',
    success: true,
    message: 'Sent code',
  });

  expect(token).not.toBeNull();
  expect(token?.tokenType).toBe('Challenge');
});
