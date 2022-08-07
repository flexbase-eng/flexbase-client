import { server } from '../mocks/server/server';
import { Statement } from '../../src/models/Banking/Statement';
import { testFlexbaseClient } from '../mocks/TestFlexbaseClient';
import { goodCompanyId, badCompanyId, errorCompanyId } from "../mocks/server/constants";

// APPLICATION
// GET APPLICATION STATUS
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

// CREATE APPLICATION
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


// STATEMENTS
// GET LIST OF STATEMENTS
test("FlexbaseClient get statement list success", async () => {

    const response = await testFlexbaseClient.getBankingStatements(goodCompanyId);

    expect(response.success).toBeTruthy();

    const statement = response.statement![0] as Statement;
    expect(statement.id).toBe('0123');
    expect(statement.type).toBe('statement');
});

test("FlexbaseClient get statement list failure", async () => {

    const response = await testFlexbaseClient.getBankingStatements(badCompanyId);

    expect(response.success).toBeFalsy();
    expect(response.error).toBe('Unable to get the list of statements');
});

test("FlexbaseClient get statement list error", async () => {

    const response = await testFlexbaseClient.getBankingStatements(errorCompanyId);

    expect(response.success).toBeFalsy();
    expect(response.error).toBe('Unable to get the list of statements');
});

// GET SINGLE STATEMENT
test("FlexbaseClient get statement detail success", async () => {

    const response = await testFlexbaseClient.getBankingStatements(goodCompanyId, '0123');

    expect(response.success).toBeTruthy();
    expect(response.statement).toBe('html/pdf document');
});

test("FlexbaseClient get statement detail success with params", async () => {

    const isPdf = true;
    const response = await testFlexbaseClient.getBankingStatements(goodCompanyId, '0123', { isPdf });

    expect(response.success).toBeTruthy();
    expect(response.statement).toBe('html/pdf document');
});

test("FlexbaseClient get statement detail failure", async () => {

    const response = await testFlexbaseClient.getBankingStatements(badCompanyId, '0123');

    expect(response.success).toBeFalsy();
    expect(response.error).toBe('Unable to get the statement details for statementId 0123');
});

test("FlexbaseClient get statement detail error", async () => {

    const response = await testFlexbaseClient.getBankingStatements(errorCompanyId, '0123');

    expect(response.success).toBeFalsy();
    expect(response.error).toBe('Unable to get the statement details for statementId 0123');
});
