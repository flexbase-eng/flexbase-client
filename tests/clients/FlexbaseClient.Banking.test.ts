import { server } from '../mocks/server/server';
import { testFlexbaseClient } from '../mocks/TestFlexbaseClient';
import { goodCompanyId, badCompanyId, errorCompanyId } from "../mocks/server/constants";

test("FlexbaseClient get application success", async () => {

    const response = await testFlexbaseClient.getBankingApplicationStatus(goodCompanyId);

    expect(response.success).toBeTruthy();
    expect(response.status).toBe('Approved')
});

test("FlexbaseClient get application failure", async () => {

    const response = await testFlexbaseClient.getBankingApplicationStatus(badCompanyId);

    expect(response.success).toBeFalsy();
    expect(response.error).toBe('Unable to get the application status');
});

test("FlexbaseClient get application error", async () => {

    const response = await testFlexbaseClient.getBankingApplicationStatus(errorCompanyId);

    expect(response.success).toBeFalsy();
    expect(response.error).toBe('Unable to get the application status');
});

test("FlexbaseClient create application success", async () => {

    const response = await testFlexbaseClient.createBankingApplication(goodCompanyId);

    expect(response.id).toBe('1')
    expect(response.message).toBe('The Unit Co. Banking Application was approved.')
    expect(response.status).toBe('Approved')
    expect(response.success).toBeTruthy();
});

test("FlexbaseClient create application failure", async () => {

    const response = await testFlexbaseClient.createBankingApplication(badCompanyId);

    expect(response.success).toBeFalsy();
    expect(response.error).toBe('Unable to create the application for the company');
});

test("FlexbaseClient create application error", async () => {

    const response = await testFlexbaseClient.createBankingApplication(errorCompanyId);

    expect(response.success).toBeFalsy();
    expect(response.error).toBe(`Unable to create the application for the companyId ${errorCompanyId}`);
});
