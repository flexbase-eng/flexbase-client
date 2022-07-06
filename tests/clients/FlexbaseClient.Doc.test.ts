import { badDocId, errorDocId, goodDocId } from "../mocks/server/constants";
import { testFlexbaseClient } from "../mocks/TestFlexbaseClient";

test("FlexbaseClient get doc picture success", async () => {

    const response = await testFlexbaseClient.getImage(goodDocId);

    expect(response).not.toBeNull();
    expect(response).toBeInstanceOf(ArrayBuffer);
});

test("FlexbaseClient get doc picture failure", async () => {

    const response = await testFlexbaseClient.getImage(badDocId);

    expect(response).toBeNull();
});

test("FlexbaseClient get doc picture error", async () => {

    const response = await testFlexbaseClient.getImage(errorDocId);

    expect(response).toBeNull();
});
