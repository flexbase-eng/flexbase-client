import { goodCompanyId } from "../mocks/server/constants";
import { testFlexbaseClient } from "../mocks/TestFlexbaseClient";


test("FlexbaseClient get company balance success", async () => {

    const response = await testFlexbaseClient.getCompanyBalance(goodCompanyId);

    expect(response).not.toBeNull();

    expect(response?.success).toBe(true);
    expect(response?.availableLimit).toBe(8903);
    expect(response?.minimumDue).toBe(1097);
});

test("FlexbaseClient get company payments success", async () => {

    const response = await testFlexbaseClient.getCompanyPayments();

    expect(response).not.toBeNull();

    const payment = response![0];

    expect(payment?.status).toBe("succeeded");
    expect(payment?.datePosted).toBe("2022-07-31");
    expect(payment?.amount).toBe("100.00");
    expect(payment?.origin).toBe("manual");
});