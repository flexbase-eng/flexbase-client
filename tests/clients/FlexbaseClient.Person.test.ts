import { badUserId, errorUserId, goodUserId, addPersonForm } from "../mocks/server/constants";
import { employees_error_handlers } from '../mocks/server/handlers/employees';
import { server } from '../mocks/server/server';
import { testFlexbaseClient } from "../mocks/TestFlexbaseClient";


test("FlexbaseClient get employees success", async () => {

    const response = await testFlexbaseClient.getEmployees();

    expect(response).not.toBeNull();
    expect(response.length).toBeGreaterThan(0);

    const employee = response[0];
    expect(employee.id).toBe(goodUserId);
    expect(employee.firstName).toBe("Ann");
    expect(employee.jobTitle).toBe("Manager");

});

test("FlexbaseClient add person success", async () => {

    const response = await testFlexbaseClient.addPerson(addPersonForm);

    expect(response?.firstName).toBe("Ann");
    expect(response?.lastName).toBe("Smith");
    expect(response?.email).toBe("ann@flexbase.app");
});

test("FlexbaseClient get employees error", async () => {

    server.use(...employees_error_handlers);

    const response = await testFlexbaseClient.getEmployees();

    expect(response).not.toBeNull();
    expect(response.length).toBe(0);
});

test("FlexbaseClient get person success", async () => {

    const response = await testFlexbaseClient.getPerson(goodUserId);

    expect(response).not.toBeNull();
    expect(response!.id).toBe(goodUserId);
});

test("FlexbaseClient get person failure", async () => {

    const response = await testFlexbaseClient.getPerson(badUserId);

    expect(response).toBeNull();
});

test("FlexbaseClient get person error", async () => {

    const response = await testFlexbaseClient.getPerson(errorUserId);

    expect(response).toBeNull();
});

test("FlexbaseClient get person no user id", async () => {

    await expect(testFlexbaseClient.getPerson('')).rejects.toThrow();
});

test("FlexbaseClient update person success", async () => {

    const response = await testFlexbaseClient.updatePerson(goodUserId, 
    {
        firstName: "Ann",
        lastName: "Smith",
        email: "ann@flexbase.app"
    });

    expect(response).not.toBeNull();
    expect(response?.firstName).toBe("Ann");
    expect(response?.lastName).toBe("Smith");
    expect(response?.email).toBe("ann@flexbase.app");
});

test("FlexbaseClient update person failure", async () => {

    const response = await testFlexbaseClient.updatePerson(badUserId, {});

    expect(response).toBeNull;
});

test("FlexbaseClient update person error", async () => {

    const response = await testFlexbaseClient.updatePerson(errorUserId, {});

    expect(response).toBeNull;
});

test("FlexbaseClient update person no user id", async () => {

    await expect(testFlexbaseClient.updatePerson('', {})).rejects.toThrow();
});

test("FlexbaseClient update person picture success", async () => {

    const response = await testFlexbaseClient.updatePersonPicture(goodUserId, {});

    expect(response).toBe(true);
});

test("FlexbaseClient update person picture failure", async () => {

    const response = await testFlexbaseClient.updatePersonPicture(badUserId, {});

    expect(response).toBe(false);
});

test("FlexbaseClient update person picture error", async () => {

    const response = await testFlexbaseClient.updatePersonPicture(errorUserId, {});

    expect(response).toBe(false);
});

test("FlexbaseClient update person picture no user id", async () => {

    await expect(testFlexbaseClient.updatePersonPicture('', {})).rejects.toThrow();
});

test("FlexbaseClient get person picture success", async () => {

    const response = await testFlexbaseClient.getPersonPicture(goodUserId);

    expect(response).not.toBeNull();
    expect(response).toBeInstanceOf(ArrayBuffer);
});

test("FlexbaseClient get person picture failure", async () => {

    const response = await testFlexbaseClient.getPersonPicture(badUserId);

    expect(response).toBeNull();
});

test("FlexbaseClient get person picture error", async () => {

    const response = await testFlexbaseClient.getPersonPicture(errorUserId);

    expect(response).toBeNull();
});

test("FlexbaseClient get person picture no user id", async () => {

    await expect(testFlexbaseClient.getPersonPicture('')).rejects.toThrow();
});