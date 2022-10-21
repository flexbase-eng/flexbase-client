import { testFlexbaseClient } from "../mocks/TestFlexbaseClient";
import { errorCompanyId, goodCompanyId } from "../mocks/server/constants";

test("FlexbaseClient get credit statement data", async () => {

    const response = await testFlexbaseClient.getCreditStatement(goodCompanyId);
    expect(response).not.toBeNull();

    expect(response?.success).toBeTruthy();
    expect(response?.invoicesNewPeriodFrom).toBe("2022-08-16");
    expect(response?.invoicesNewPeriodTo).toBe("2022-08-31");
});

test("FlexbaseClient get credit statement data error", async () => {

    const response = await testFlexbaseClient.getCreditStatement(errorCompanyId);
    expect(response?.success).toBeFalsy();
    expect(response?.error).toBe('Unable to get credit statement data');
});
