import { test, expect } from 'vitest';
import { project_error_handlers } from '../mocks/server/handlers/project';
import { server } from '../mocks/server/server';
import { testFlexbaseClient } from '../mocks/TestFlexbaseClient';

test('FlexbaseClient get projects success', async () => {
  const response = await testFlexbaseClient.getCompanyProjects();

  expect(response).not.toBeNull();
  expect(response?.length).toBeGreaterThan(0);

  const project = response![0];

  expect(project.name).toBe('Flexbase');
  expect(project.client?.companyName).toBe('Test Company');
});

test('FlexbaseClient get projects failure', async () => {
  server.use(...project_error_handlers);

  const response = await testFlexbaseClient.getCompanyProjects();

  expect(response).toBeNull();
});

test('FlexbaseClient get projects error', async () => {
  server.use(...project_error_handlers);

  const response = await testFlexbaseClient.getCompanyProjects();

  expect(response).toBeNull();
});

test('FlexbaseClient create project success', async () => {
  const response = await testFlexbaseClient.createOrUpdateProject({
    name: 'test name',
    description: 'test description',
    clientId: 'testClientId',
    location: {
      street1: 'test address',
      street2: 'test address 2',
      city: 'test city',
      postalCode: 'test code',
      state: 'test state',
      country: 'test country',
    },
  });
  expect(response).not.toBeNull();
  expect(response?.name).toBe('test name');
  expect(response?.clientId).toBe('testClientId');
});

test('FlexbaseClient update project success', async () => {
  const response = await testFlexbaseClient.createOrUpdateProject({
    id: 'testId',
    name: 'test name',
    description: 'test description',
    clientId: 'testClientId',
  });
  expect(response).not.toBeNull();
  expect(response?.id).toBe('testId');
  expect(response?.name).toBe('test name');
});

test('FlexbaseClient create project error', async () => {
  const response = await testFlexbaseClient.createOrUpdateProject({});
  expect(response?.id).not.toBe('testId');
  expect(response).toBeNull();
});
