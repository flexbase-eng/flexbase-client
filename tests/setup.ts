import { MockedRequest } from 'msw';
import { server } from './mocks/server/server'

const unhandledRequest = (request: MockedRequest) => {
  console.error(`Undefined endpoint called:${request.method} ${request.url}`);
}

beforeAll(() => {
  server.listen({
    onUnhandledRequest: unhandledRequest,
  });
})

afterEach(() => {
  server.resetHandlers();
})

afterAll(() => {
  server.close();
})

export { }