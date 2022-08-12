import { badCompanyId, errorCompanyId, goodCompanyId } from "../mocks/server/constants";
import { testFlexbaseClient } from "../mocks/TestFlexbaseClient";

describe('Underwriting', () => {
    test("FlexbaseClient underwriting request level success", async () => {

        const response = await testFlexbaseClient.requestLevel(1, goodCompanyId);

        expect(response).not.toBeNull();
        expect(response!.approved).toBe(true);
        expect(response!.maxLimit).toBe(1000);
        expect(response!.level).toBe(1);
    });

    test("FlexbaseClient get company credit failure", async () => {

        const response = await testFlexbaseClient.requestLevel(2, badCompanyId);

        expect(response).toBeNull();
    });

    test("FlexbaseClient get company credit error", async () => {

        const response = await testFlexbaseClient.requestLevel(1, errorCompanyId);

        expect(response).toBeNull();
    });

    test("FlexbaseClient get company credit no id", async () => {

        const response = await testFlexbaseClient.requestLevel(1);

        expect(response).not.toBeNull();
        expect(response!.approved).toBe(true);
        expect(response!.maxLimit).toBe(1000);
        expect(response!.level).toBe(1);
    });
})

