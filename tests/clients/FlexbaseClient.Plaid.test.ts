import { badPlaidPublicToken, goodPlaidPublicToken, plaidLinkToken } from '../mocks/server/constants';
import { plaid_failure_handlers, plaid_http_error_handlers } from '../mocks/server/handlers/plaid';
import { server } from '../mocks/server/server';
import { testFlexbaseClient } from '../mocks/TestFlexbaseClient';

test("FlexbaseClient plaid link token success", async () => {

    const response = await testFlexbaseClient.getPlaidLinkToken();

    expect(response).toBe(plaidLinkToken);
});

test("FlexbaseClient plaid link token failure", async () => {

    server.use(...plaid_failure_handlers);

    const response = await testFlexbaseClient.getPlaidLinkToken();

    expect(response).toBeNull();
});

test("FlexbaseClient plaid link token error", async () => {

    server.use(...plaid_http_error_handlers);

    const response = await testFlexbaseClient.getPlaidLinkToken();

    expect(response).toBeNull();
});

test("FlexbaseClient exchange plaid public token success", async () => {

    const response = await testFlexbaseClient.exchangePlaidPublicToken(goodPlaidPublicToken, null);

    expect(response.success).toBe(true);
    expect(response.response?.accessToken).toBe(plaidLinkToken);
});

test("FlexbaseClient exchange plaid public token failure", async () => {

    const response = await testFlexbaseClient.exchangePlaidPublicToken(badPlaidPublicToken, null);

    expect(response.success).toBe(false);
});

test("FlexbaseClient exchange plaid public token 400", async () => {

    const response = await testFlexbaseClient.exchangePlaidPublicToken("400", null);

    expect(response.success).toBe(false);
});

test("FlexbaseClient update plaid link token success", async () => {

    const response = await testFlexbaseClient.updatePlaidLinkToken();

    expect(response).toBe(plaidLinkToken);
});

test("FlexbaseClient update plaid link token faillure", async () => {

    server.use(...plaid_failure_handlers);

    const response = await testFlexbaseClient.updatePlaidLinkToken();

    expect(response).toBeNull();
});

test("FlexbaseClient update plaid link token error", async () => {

    server.use(...plaid_http_error_handlers);

    const response = await testFlexbaseClient.updatePlaidLinkToken();

    expect(response).toBeNull();
});