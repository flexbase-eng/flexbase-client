import { badUserId, errorUserId, goodUserId } from "../mocks/server/constants";
import { testFlexbaseClient } from "../mocks/TestFlexbaseClient";

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

test("FlexbaseClient get person no user id", () => {

    expect(testFlexbaseClient.getPerson('')).rejects.toThrow();   
});

test("FlexbaseClient update person success", async () => {

    const response = await testFlexbaseClient.updatePerson(goodUserId, {});

    expect(response).toBe(true);
});

test("FlexbaseClient update person failure", async () => {

    const response = await testFlexbaseClient.updatePerson(badUserId, {});

    expect(response).toBe(false);
});

test("FlexbaseClient update person error", async () => {

    const response = await testFlexbaseClient.updatePerson(errorUserId, {});

    expect(response).toBe(false);
});

test("FlexbaseClient update person no user id", () => {

    expect(testFlexbaseClient.updatePerson('', {})).rejects.toThrow();   
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

test("FlexbaseClient update person picture no user id", () => {

    expect(testFlexbaseClient.updatePersonPicture('', {})).rejects.toThrow();   
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

test("FlexbaseClient get person picture no user id", () => {

    expect(testFlexbaseClient.getPersonPicture('')).rejects.toThrow();   
});