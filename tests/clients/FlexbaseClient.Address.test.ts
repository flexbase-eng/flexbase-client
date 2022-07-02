import { testFlexbaseClient } from '../mocks/TestFlexbaseClient';

test("FlexbaseClient address preview success", async () => {

    const response = await testFlexbaseClient.getAddressPreview("test street");

    expect(response).not.toBeNull();

    const addr = response[0];

    expect(addr.street1).toBe("test street");
    expect(addr.city).toBe("Test City");
    expect(addr.state).toBe("Test State");
    expect(addr.postalCode).toBe("12345");
    expect(addr.country).toBe("usa");

});

test("FlexbaseClient address empty parameter no results", async () => {

    const response = await testFlexbaseClient.getAddressPreview(undefined);

    expect(response).not.toBeNull();
    expect(response.length).toBe(0);
});

test("FlexbaseClient address error no results", async () => {

    const response = await testFlexbaseClient.getAddressPreview("error");

    expect(response).not.toBeNull();
    expect(response.length).toBe(0);
});