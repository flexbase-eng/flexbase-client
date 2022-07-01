import { badApiKey, errorApiKey, goodApiKey } from "../mocks/server/constants";
import { testFlexbaseClient } from "../mocks/TestFlexbaseClient";

test("FlexbaseClient get merchant success", async () => {

    const response = await testFlexbaseClient.getMerchant(goodApiKey);

    expect(response).not.toBeNull();
    expect(response!.apiKey).toBe(goodApiKey);    
});

test("FlexbaseClient get merchant failure", async () => {

    const response = await testFlexbaseClient.getMerchant(badApiKey);

    expect(response).toBeNull();
});

test("FlexbaseClient get merchant error", async () => {

    const response = await testFlexbaseClient.getMerchant(errorApiKey);

    expect(response).toBeNull();
});

test("FlexbaseClient get merchant no api key", async () => {

    await expect(testFlexbaseClient.getMerchant('')).rejects.toThrow();
});

