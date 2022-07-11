import { goodUserId } from "../mocks/server/constants";
import { testFlexbaseClient } from "../mocks/TestFlexbaseClient";

test("FlexbaseClient get employees success", async () => {

    const response = await testFlexbaseClient.getEmployees();

    expect(response).not.toBeNull();
    expect(response.length).toBeGreaterThan(0);

    const employee = response[0];
    expect(employee.id).toBe(goodUserId);
    expect(employee.firstName).toBe("Test");
    expect(employee.jobTitle).toBe("Manager");

});

test("FlexbaseClient get employees failure", async () => {

    const response = await testFlexbaseClient.getEmployees();

    expect(response).not.toBeNull();
    expect(response.length).toBe(0);
});

test("FlexbaseClient get employees error", async () => {

    const response = await testFlexbaseClient.getEmployees();

    expect(response).not.toBeNull();
    expect(response.length).toBe(0);
});