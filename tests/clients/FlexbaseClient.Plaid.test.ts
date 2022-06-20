import { badPlaidPublicToken, goodPlaidPublicToken, plaidLinkToken } from '../mocks/server/constants';
import { testFlexbaseClient } from '../mocks/TestFlexbaseClient';

test("FlexbaseClient plaid link token success", async () => {

    const response = await testFlexbaseClient.getPlaidLinkToken();

    expect(response).toBe(plaidLinkToken);
});

test("FlexbaseClient exchange plaid public token success", async () => {

    const response = await testFlexbaseClient.exchangePlaidPublicToken(goodPlaidPublicToken, null);

    expect(response).toBe(true);
});

test("FlexbaseClient exchange plaid public token failure", async () => {

    const response = await testFlexbaseClient.exchangePlaidPublicToken(badPlaidPublicToken, null);

    expect(response).toBe(false);
});

test("FlexbaseClient exchange plaid public token 400", async () => {

    const response = await testFlexbaseClient.exchangePlaidPublicToken("400", null);

    expect(response).toBe(false);
});

test("FlexbaseClient update plaid link token success", async () => {

    const response = await testFlexbaseClient.updatePlaidLinkToken();

    expect(response).toBe(plaidLinkToken);
});