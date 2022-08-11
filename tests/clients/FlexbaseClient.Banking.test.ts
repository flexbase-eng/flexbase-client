import { Statement } from '../../src/models/Banking/Statement';
import { testFlexbaseClient } from '../mocks/TestFlexbaseClient';
import { goodCompanyId, badCompanyId, errorCompanyId, paymentBodyReq, counterparty } from "../mocks/server/constants";

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
});

// PAYMENTS
test("FlexbaseClient create payment success", async () => {

    const response = await testFlexbaseClient.createBankingPayment(goodCompanyId, paymentBodyReq);

    expect(response.success).toBeTruthy();

    expect(response.id).toBe('01234');
    expect(response.payAmount).toBe('1000.0');
    expect(response.companyId).toBe(goodCompanyId);
    expect(response.payDescription).toBe('New payment');
});

test("FlexbaseClient create payment failure", async () => {

    const response = await testFlexbaseClient.createBankingPayment(badCompanyId, paymentBodyReq);

    expect(response.success).toBeFalsy();
    expect(response.error).toBe('Unable to create a Unit Co. Payment')
});

test("FlexbaseClient create payment error", async () => {

    const response = await testFlexbaseClient.createBankingPayment(errorCompanyId, paymentBodyReq);

    expect(response.success).toBeFalsy();
});

// COUNTERPARTIES
test("FlexbaseClient create counterparty success", async () => {

    const response = await testFlexbaseClient.createBankingCounterparty(goodCompanyId, { type: 'achCounterparty', counterparty });

    expect(response.success).toBeTruthy();
    
    expect(response?.ctrParty?.id).toBe('01234');
    expect(response?.ctrParty?.type).toBe('achCounterparty');
    expect(response?.ctrParty?.companyId).toBe(goodCompanyId);
});

test("FlexbaseClient create counterparty failure", async () => {

    const response = await testFlexbaseClient.createBankingCounterparty(badCompanyId, { type: 'achCounterparty', counterparty });

    expect(response.success).toBeFalsy();
    expect(response.error).toBe('Unable to create a Unit Co. Counter Party. Please verify that all the Counterparty banking data required exists')
});

test("FlexbaseClient create counterparty error", async () => {

    const response = await testFlexbaseClient.createBankingCounterparty(errorCompanyId, { type: 'achCounterparty', counterparty });

    expect(response.success).toBeFalsy();
});
