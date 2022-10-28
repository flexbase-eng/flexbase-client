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
    expect(response?.payments?.length).toBeGreaterThan(0);

    const payment = response.payments![0];

    expect(payment?.status).toBe("succeeded");
    expect(payment?.datePosted).toBe("2022-07-31");
    expect(payment?.amount).toBe("100.00");
    expect(payment?.origin).toBe("manual");
});

test("FlexbaseClient get company data", async () => {

    const response = await testFlexbaseClient.getCompanyData();
    expect(response).not.toBeNull();

    expect(response.company?.id).toBe(goodCompanyId);
    expect(response.company?.companyName).toBe("DBD Company");
    expect(response.company?.createdAt).toBe("2022-03-02 19:54:34.421+00");
    expect(response.company?.address?.line1).toBe("544 Winder Trl");
});
