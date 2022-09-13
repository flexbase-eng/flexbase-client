import { goodCompanyId } from "../mocks/server/constants";
import { testFlexbaseClient } from "../mocks/TestFlexbaseClient";


test("FlexbaseClient get company balance success", async () => {

    const response = await testFlexbaseClient.getCompanyBalance(goodCompanyId);

    expect(response).not.toBeNull();

    expect(response?.success).toBe(true);
    expect(response?.availableLimit).toBe(8903);
    expect(response?.minimumDue).toBe(1097);
});

test("FlexbaseClient get company payments", async () => {

    const response = await testFlexbaseClient.getCompanyPayments();

    expect(response).not.toBeNull();
    expect(response.length).toBeGreaterThan(0);

    const employee = response[0];
    expect(employee.status).toBe("succeeded");
    expect(employee.datePosted).toBe("2022-07-31");
    expect(employee.amount).toBe("100.00");

});