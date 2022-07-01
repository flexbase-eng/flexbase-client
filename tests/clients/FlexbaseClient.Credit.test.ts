import { badCompanyId, errorCompanyId, goodCompanyId } from "../mocks/server/constants";
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

