import { badCompanyId, errorCompanyId, goodCompanyId } from "../mocks/server/constants";
import { testFlexbaseClient } from "../mocks/TestFlexbaseClient";

test("FlexbaseClient get patrons success", async () => {

    const response = await testFlexbaseClient.getPatrons();

    expect(response).not.toBeNull();
    expect(response.length).toBeGreaterThan(0);

    const patron = response[0];

    expect(patron.id).toBe(goodCompanyId);
    expect(patron.name).toBe("Test");
    expect(patron.tenantId).toBe("Tenant");
});

test("FlexbaseClient get patrons failure", async () => {

    const response = await testFlexbaseClient.getPatrons(badCompanyId);

    expect(response).not.toBeNull();
    expect(response.length).toBe(0);
});

test("FlexbaseClient get patrons error", async () => {

    const response = await testFlexbaseClient.getPatrons(errorCompanyId);

    expect(response).not.toBeNull();
    expect(response.length).toBe(0);
});

test("FlexbaseClient add patron success", async () => {

    const response = await testFlexbaseClient.addOrUpdatePatron({ name: 'test', address: '300 WHITE HALL AVE', state: 'AR', city: 'WHITE HALL', postalCode: '71602' });
    expect(response).not.toBeNull();
    expect(response?.name).toBe('test');
    expect(response?.address?.street1).toBe('300 WHITE HALL AVE');
    expect(response?.address?.state).toBe('AR');
    expect(response?.address?.city).toBe('WHITE HALL');
    expect(response?.address?.postalCode).toBe('71602');
});

test("FlexbaseClient add patron error", async () => {
    const response = await testFlexbaseClient.addOrUpdatePatron({});
    expect(response?.id).not.toBe('testId');
    expect(response).toBeNull();
});

test("FlexbaseClient update patron success", async () => {

    const response = await testFlexbaseClient.addOrUpdatePatron({ id: 'testId', name: 'test2' });
    expect(response).not.toBeNull();
    expect(response?.id).toBe('testId');
    expect(response?.name).toBe('test2');
});


