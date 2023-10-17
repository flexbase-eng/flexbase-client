import { MockedRequest } from 'msw';
import { server } from './mocks/server/server';
import fetch from 'node-fetch';
import { beforeAll, afterEach, afterAll } from 'vitest';

// @ts-ignore
global.fetch = fetch;

const unhandledRequest = (request: MockedRequest) => {
  console.error(`Undefined endpoint called:${request.method} ${request.url}`);
};

beforeAll(() => {
  server.listen({
    onUnhandledRequest: unhandledRequest,
  });
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

export {};
