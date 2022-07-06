import { project_failure_handlers, project_error_handlers } from '../mocks/server/handlers/project';
import { server } from '../mocks/server/server';
import { testFlexbaseClient } from '../mocks/TestFlexbaseClient';

test("FlexbaseClient get projects success", async () => {

    const response = await testFlexbaseClient.getCompanyProjects();

    expect(response).not.toBeNull();

    const invoice = response![0];

    expect(invoice.name).toBe('Flexbase');
});

test("FlexbaseClient get projects failure", async () => {

    server.use(...project_error_handlers);

    const response = await testFlexbaseClient.getCompanyProjects();

    expect(response).toBeNull();
});

test("FlexbaseClient get projects error", async () => {

    server.use(...project_error_handlers);

    const response = await testFlexbaseClient.getCompanyProjects();

    expect(response).toBeNull();
});
