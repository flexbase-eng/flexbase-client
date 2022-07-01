import { badCompanyId, errorCompanyId, goodCompanyId } from "../mocks/server/constants";
import { testFlexbaseClient } from "../mocks/TestFlexbaseClient";

test("FlexbaseClient underwriting request level success", async () => {

    const response = await testFlexbaseClient.requestLevel(goodCompanyId, 1);

    expect(response).not.toBeNull();
    expect(response!.approved).toBe(true);
    expect(response!.maxLimit).toBe(1000);
    expect(response!.level).toBe(1);
});

test("FlexbaseClient get company credit failure", async () => {

    const response = await testFlexbaseClient.requestLevel(badCompanyId, 2);

    expect(response).toBeNull();
});

test("FlexbaseClient get company credit error", async () => {

    const response = await testFlexbaseClient.requestLevel(errorCompanyId, 1);

    expect(response).toBeNull();
});

test("FlexbaseClient get company credit no id", async () => {

    await expect(testFlexbaseClient.requestLevel('', 1)).rejects.toThrow();
});

