import { badApiKey, badCompanyId, deniedApiKey, errorApiKey, errorCompanyId, goodApiKey, goodCompanyId } from "../mocks/server/constants";
import { testFlexbaseClient } from "../mocks/TestFlexbaseClient";

test("FlexbaseClient get company credit success", async () => {

    const response = await testFlexbaseClient.getCompanyCredit(goodCompanyId);

    expect(response).not.toBeNull();
    expect(response!.available).toBe(100);
    expect(response!.total).toBe(1000);
});

test("FlexbaseClient get company credit failure", async () => {

    const response = await testFlexbaseClient.getCompanyCredit(badCompanyId);

    expect(response).toBeNull();
});

test("FlexbaseClient get company credit error", async () => {

    const response = await testFlexbaseClient.getCompanyCredit(errorCompanyId);

    expect(response).toBeNull();
});

test("FlexbaseClient get company credit no id", async () => {

    await expect(testFlexbaseClient.getCompanyCredit('')).rejects.toThrow();
});

test("FlexbaseClient request pay with flexbase success", async () => {

    const response = await testFlexbaseClient.requestPayWithFlexbase({apiKey: goodApiKey, amount: 1000, session: "test", mode: 'immediate' });

    expect(response).not.toBeNull();
    expect(response!.approved).toBe(true);
    expect(response!.invoice?.amount).toBe(1000);
    expect(response!.invoice?.session).toBe("test");
    expect(response!.merchant?.id).toBe(goodApiKey);
    expect(response!.merchant?.baseUrl).toBe('http://fake.fake');
});

test("FlexbaseClient request pay with flexbase failure", async () => {

    const response = await testFlexbaseClient.requestPayWithFlexbase({apiKey: badApiKey, amount: 1000, mode: 'immediate' });

    expect(response).not.toBeNull();
    expect(response!.approved).toBe(false);
});

test("FlexbaseClient request pay with flexbase error", async () => {

    const response = await testFlexbaseClient.requestPayWithFlexbase({apiKey: errorApiKey, amount: 1000, mode: 'immediate' });

    expect(response).not.toBeNull();
    expect(response!.approved).toBe(false);
});

test("FlexbaseClient request pay with flexbase denied", async () => {

    const response = await testFlexbaseClient.requestPayWithFlexbase({apiKey: deniedApiKey, amount: 1000, mode: 'immediate' });

    expect(response).not.toBeNull();
    expect(response!.approved).toBe(false);
});

test("FlexbaseClient request pay with flexbase invalid payload", async () => {

    await expect(testFlexbaseClient.requestPayWithFlexbase({apiKey: '', amount: 1000, mode: 'immediate' })).rejects.toThrow();

    await expect(testFlexbaseClient.requestPayWithFlexbase({apiKey: goodApiKey, amount: 0, mode: 'immediate' })).rejects.toThrow();
});