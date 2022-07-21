import { goodCompanyId } from "../mocks/server/constants";
import { testFlexbaseClient } from "../mocks/TestFlexbaseClient";

test("FlexbaseClient get company balance success", async () => {

    const response = await testFlexbaseClient.getCompanyBalance(goodCompanyId);

    expect(response).not.toBeNull();

    expect(response?.success).toBe(true);
    expect(response?.availableLimit).toBe(8903);
    expect(response?.minimumDue).toBe(1097);
});