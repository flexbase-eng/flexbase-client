import { testFlexbaseClient } from '../mocks/TestFlexbaseClient';
import { password_failure_handlers } from '../mocks/server/handlers/password';
import { server } from '../mocks/server/server';

test("FlexbaseClient change password success", async () => {

    const response = await testFlexbaseClient.changePassword("Flex1234**");

    expect(response).not.toBeNull();

    expect(response.success).toBe(true);

});

test("FlexbaseClient change password failure", async () => {

    server.use(...password_failure_handlers);

    const response = await testFlexbaseClient.changePassword(null);

    expect(response.success).toBe(false);
    expect(response.error).toBe('Unable to change the password');
});
