import { MockedRequest } from 'msw';
import { server } from './mocks/server/server'

const unhandledRequest = (request: MockedRequest) => {
  expect(request).fail("Undefined endpoint called: " + request.url);
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