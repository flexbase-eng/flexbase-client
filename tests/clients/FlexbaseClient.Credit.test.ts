import { badApiKey, badCompanyId, deniedApiKey, errorApiKey, errorCompanyId, goodApiKey, goodCompanyId } from "../mocks/server/constants";
import { testFlexbaseClient } from "../mocks/TestFlexbaseClient";
import { server } from '../mocks/server/server';
import { credit_error_handlers } from "../mocks/server/handlers/credit";

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

    const response = await testFlexbaseClient.getCompanyCredit();

    expect(response).not.toBeNull();
    expect(response!.available).toBe(100);
    expect(response!.total).toBe(1000);
});

test("FlexbaseClient request pay with flexbase success", async () => {

    const response = await testFlexbaseClient.requestPayWithFlexbase({apiKey: goodApiKey, amount: 1000, session: "test", mode: 'immediate', requestId: 'test' });

    expect(response).not.toBeNull();
    expect(response!.approved).toBe(true);
    expect(response!.invoice?.amount).toBe(1000);
    expect(response!.invoice?.session).toBe("test");
    expect(response!.merchant?.id).toBe(goodApiKey);
    expect(response!.merchant?.baseUrl).toBe('http://fake.fake');
});

test("FlexbaseClient request pay with flexbase failure", async () => {

    const response = await testFlexbaseClient.requestPayWithFlexbase({apiKey: badApiKey, amount: 1000, mode: 'immediate', requestId: 'test' });

    expect(response).not.toBeNull();
    expect(response!.approved).toBe(false);
});

test("FlexbaseClient request pay with flexbase error", async () => {

    const response = await testFlexbaseClient.requestPayWithFlexbase({apiKey: errorApiKey, amount: 1000, mode: 'immediate', requestId: 'test' });

    expect(response).not.toBeNull();
    expect(response!.approved).toBe(false);
});

test("FlexbaseClient request pay with flexbase denied", async () => {

    const response = await testFlexbaseClient.requestPayWithFlexbase({apiKey: deniedApiKey, amount: 1000, mode: 'immediate', requestId: 'test' });

    expect(response).not.toBeNull();
    expect(response!.approved).toBe(false);
});

test("FlexbaseClient request pay with flexbase invalid payload", async () => {

    await expect(testFlexbaseClient.requestPayWithFlexbase({apiKey: '', amount: 1000, mode: 'immediate', requestId: 'test' })).rejects.toThrow();

    await expect(testFlexbaseClient.requestPayWithFlexbase({apiKey: goodApiKey, amount: 0, mode: 'immediate', requestId: 'test' })).rejects.toThrow();

    await expect(testFlexbaseClient.requestPayWithFlexbase({apiKey: goodApiKey, amount: 0, mode: 'immediate', requestId: '' })).rejects.toThrow();

});


test("FlexbaseClient paydebt", async () => {

    const amount = '1000';
    const response = await testFlexbaseClient.payDebt(goodCompanyId, amount);

    expect(response).not.toBeNull();
    expect(response.success).toBe(true);
});

test("FlexbaseClient pay debt error", async () => {
    server.use(...credit_error_handlers);

    const response = await testFlexbaseClient.payDebt('', '');
    expect(response.error).toBe('Unable to make the pay debt');
});



describe('Get BNPL request', () => {
    test('Should successfully return the request', async () => {
        const response = await testFlexbaseClient.getBnplRequest('12345');
        expect(response?.status).toBeTruthy();
    });

    test('Should throw an error if ID is not provided', async () => {
        await expect(testFlexbaseClient.getBnplRequest('' as any)).rejects.toThrow('ID is required');
    });

    test('Should return null if not found', async () => {
        const result = await testFlexbaseClient.getBnplRequest(badCompanyId);
        expect(result).toBeNull();
    });

    test('Should error', async () => {
        const result = await testFlexbaseClient.getBnplRequest(errorCompanyId);
        expect(result).toBeNull();
    });

})