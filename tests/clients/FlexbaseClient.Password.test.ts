import { test, expect } from 'vitest';
import { testFlexbaseClient } from '../mocks/TestFlexbaseClient';
import { password_failure_handlers, password_handlers } from '../mocks/server/handlers/password';
import { server } from '../mocks/server/server';

test('FlexbaseClient change password success', async () => {
  const response = await testFlexbaseClient.changePassword('Flex1234**');

  expect(response).not.toBeNull();

  expect(response.success).toBe(true);
});

test('FlexbaseClient change password failure', async () => {
  server.use(...password_failure_handlers);

  const response = await testFlexbaseClient.changePassword('');

  expect(response.success).toBe(false);
  expect(response.error).toBe('Unable to change the password');
});

test('FlexbaseClient validate password success', async () => {
  server.use(...password_handlers);

  const response = await testFlexbaseClient.validatePassword('dayana21@gmail.com', 'Flex1234');

  expect(response).not.toBeNull();

  expect(response.token).toBe('goodToken');
});

test('FlexbaseClient validate password failure', async () => {
  server.use(...password_failure_handlers);

  const response = await testFlexbaseClient.validatePassword('', '');

  expect(response.token).toBe(null);
});
