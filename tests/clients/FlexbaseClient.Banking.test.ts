import { DateTime } from 'luxon';
import { server } from '../mocks/server/server';
import { Statement } from '../../src/models/Banking/Statement';
import { testFlexbaseClient } from '../mocks/TestFlexbaseClient';
import { banking_error_handlers, banking_failure_handlers } from '../mocks/server/handlers/banking';
import { goodCompanyId, badCompanyId, errorCompanyId, paymentBodyReq, counterparty, createDebitCard, updateDebitCard, createUnitcoToken } from "../mocks/server/constants";

// APPLICATION
// GET APPLICATION STATUS
test('FlexbaseClient get application success', async () => {

    const response = await testFlexbaseClient.getBankingApplicationStatus(goodCompanyId);

    expect(response.success).toBeTruthy();
    expect(response.status).toBe('Approved');
});

test('FlexbaseClient get application failure', async () => {

    const response = await testFlexbaseClient.getBankingApplicationStatus(badCompanyId);

    expect(response.success).toBeFalsy();
    expect(response.error).toBe('Unable to get the application status');
});

test('FlexbaseClient get application error', async () => {

    const response = await testFlexbaseClient.getBankingApplicationStatus(errorCompanyId);

    expect(response.success).toBeFalsy();
});

// CREATE APPLICATION
test('FlexbaseClient create application success', async () => {

    const response = await testFlexbaseClient.createBankingApplication(goodCompanyId);

    expect(response.id).toBe('1');
    expect(response.message).toBe('The Unit Co. Banking Application was approved.');
    expect(response.status).toBe('Approved');
    expect(response.success).toBeTruthy();
});

test('FlexbaseClient create application failure', async () => {

    const response = await testFlexbaseClient.createBankingApplication(badCompanyId);

    expect(response.success).toBeFalsy();
    expect(response.error).toBe('Unable to create the application for the company');
});

test('FlexbaseClient create application error', async () => {

    const response = await testFlexbaseClient.createBankingApplication(errorCompanyId);

    expect(response.success).toBeFalsy();
});


// STATEMENTS
// GET LIST OF STATEMENTS
test('FlexbaseClient get statement list success', async () => {

    const response = await testFlexbaseClient.getBankingStatements(goodCompanyId);

    expect(response.success).toBeTruthy();

    const statement = response.statement![0] as Statement;
    expect(statement.id).toBe('0123');
    expect(statement.type).toBe('statement');
});

test('FlexbaseClient get statement list failure', async () => {

    const response = await testFlexbaseClient.getBankingStatements(badCompanyId);

    expect(response.success).toBeFalsy();
    expect(response.error).toBe('Unable to get the list of statements');
});

test('FlexbaseClient get statement list error', async () => {

    const response = await testFlexbaseClient.getBankingStatements(errorCompanyId);

    expect(response.success).toBeFalsy();
});

// GET SINGLE STATEMENT
test('FlexbaseClient get statement detail success', async () => {

    const response = await testFlexbaseClient.getBankingPdfStatement(goodCompanyId, '0123');

    expect(response.success).toBeTruthy();
    expect(response.statement).toBe('html/pdf document');
});

test('FlexbaseClient get statement detail success with params', async () => {

    const isPdf = true;
    const response = await testFlexbaseClient.getBankingPdfStatement(goodCompanyId, '0123', { isPdf });

    expect(response.success).toBeTruthy();
    expect(response.statement).toBe('html/pdf document');
});

test('FlexbaseClient get statement detail failure', async () => {

    const response = await testFlexbaseClient.getBankingPdfStatement(badCompanyId, '0123');

    expect(response.success).toBeFalsy();
    expect(response.error).toBe('Unable to get the statement details for statementId 0123');
});

test('FlexbaseClient get statement detail error', async () => {

    const response = await testFlexbaseClient.getBankingPdfStatement(errorCompanyId, '0123');

    expect(response.success).toBeFalsy();
});

// PAYMENTS
// CREATE PAYMENTS
test('FlexbaseClient create payment success', async () => {

    const response = await testFlexbaseClient.createBankingPayment(goodCompanyId, paymentBodyReq);

    expect(response.success).toBeTruthy();

    expect(response?.payment?.id).toBe('01234');
    expect(response?.payment?.payAmount).toBe('1000.0');
    expect(response?.payment?.companyId).toBe(goodCompanyId);
    expect(response?.payment?.payDescription).toBe('New payment');
});

test('FlexbaseClient create payment failure', async () => {

    const response = await testFlexbaseClient.createBankingPayment(badCompanyId, paymentBodyReq);

    expect(response.success).toBeFalsy();
    expect(response.error).toBe('Unable to create a Unit Co. Payment');
});

test('FlexbaseClient create payment error', async () => {

    const response = await testFlexbaseClient.createBankingPayment(errorCompanyId, paymentBodyReq);

    expect(response.success).toBeFalsy();
});

//GET LIST OF PAYMENTS
test("FlexbaseClient get payment list success", async () => {

    const response = await testFlexbaseClient.getBankingPayments(goodCompanyId);

    expect(response.success).toBeTruthy();

    const payment = response.payments![0];
    expect(payment.id).toBe('123');
    expect(payment.status).toBe('Pending');
});

test("FlexbaseClient get payment list failure", async () => {

    const response = await testFlexbaseClient.getBankingPayments(badCompanyId);

    expect(response.success).toBeFalsy();
    expect(response.error).toBe('Unable to get the list of payments');
});

test("FlexbaseClient get payment list error", async () => {

    const response = await testFlexbaseClient.getBankingPayments(errorCompanyId);

    expect(response.success).toBeFalsy();
});



// COUNTERPARTIES
// CREATE COUNTERPARTY
test('FlexbaseClient create counterparty success', async () => {

    const response = await testFlexbaseClient.createBankingCounterparty(goodCompanyId, {
        type: 'achCounterparty',
        counterparty
    });

    expect(response).not.toBeNull();

    expect(response?.id).toBe('01234');
    expect(response?.accountName).toBe('April Oniel');
    expect(response?.routingNumber).toBe('812345679');
    expect(response?.accountNumber).toBe('1000000001');

});

test('FlexbaseClient create counterparty failure', async () => {

    const response = await testFlexbaseClient.createBankingCounterparty(badCompanyId, {
        type: 'achCounterparty',
        counterparty
    });

    expect(response).toBeNull()
});

// GET COUNTERPARTIES LIST
test('FlexbaseClient get counterparties list success', async () => {

    const response = await testFlexbaseClient.getBankingCounterparties(goodCompanyId);

    expect(response).not.toBeNull();
    expect(response?.length).toBeGreaterThan(0);

    const ctrParty = response![0];
    expect(ctrParty?.id).toBe('01234');
    expect(ctrParty?.type).toBe('achCounterparty');
    expect(ctrParty?.accountName).toBe('April Oniel');
    expect(ctrParty?.routingNumber).toBe('812345679');
    expect(ctrParty?.accountNumber).toBe('1000000001');
});

test('FlexbaseClient get counterparties list failure', async () => {

    const response = await testFlexbaseClient.getBankingCounterparties(badCompanyId);

    expect(response).toBeNull();
});

// DEPOSITS
// GET DEPOSIT ACCOUNT INFO
test('FlexbaseClient get deposit account info success', async () => {

    const response = await testFlexbaseClient.getBankingAccounts(goodCompanyId);

    expect(response.success).toBeTruthy();

    const mainAccount = response?.accounts![0];

    expect(mainAccount?.id).toBe('01234');
    expect(mainAccount?.type).toBe('depositAccount');
    expect(mainAccount?.balance).toBe(30000);
    expect(mainAccount?.depositProduct).toBe('checking');
    expect(mainAccount?.accountNumber).toBe('000123456789');
    expect(mainAccount.plaidProcessorToken).toBe('processor-sandbox-18f7e98d-ee2e-49cc-99a1-7bc36b7e6e9d');
});

test('FlexbaseClient get deposit account info failure', async () => {

    const response = await testFlexbaseClient.getBankingAccounts(badCompanyId);

    expect(response.success).toBeFalsy();
    expect(response.error).toBe('While trying to get a banking deposit account, an unhandled exception was thrown');
});

test('FlexbaseClient get deposit account info error', async () => {

    const response = await testFlexbaseClient.getBankingAccounts(errorCompanyId);

    expect(response.success).toBeFalsy();
});

// DEPOSIT
// GET DEPOSIT ACCOUNT HISTORY
test('FlexbaseClient get deposit account history success', async () => {

    const response = await testFlexbaseClient.getBankingAccountBalance(goodCompanyId);

    expect(response.success).toBeTruthy();

    const statement = response?.statement![0];

    expect(statement?.id).toBe('01234');
    expect(statement?.attributes?.hold).toBe(0);
    expect(statement?.type).toBe('accountEndOfDay');
    expect(statement?.attributes?.balance).toBe(30000);
    expect(statement?.attributes?.available).toBe(30000);
    expect(statement?.attributes?.overdraftLimit).toBe(0);
    expect(statement?.attributes?.date).toBe('2022-08-18');
});

test('FlexbaseClient get deposit account history success with params', async () => {

    const pageLimit = 10;
    const pageOffset = 1;
    const toDate = DateTime.fromISO('2022-08-18');
    const fromDate = DateTime.fromISO('2022-04-20');

    const response = await testFlexbaseClient.getBankingAccountBalance(goodCompanyId, {
        pageLimit, pageOffset, fromDate, toDate
    });

    expect(response.success).toBeTruthy();

    const statement = response?.statement![0];

    expect(statement?.id).toBe('01234');
    expect(statement?.attributes?.hold).toBe(0);
    expect(statement?.type).toBe('accountEndOfDay');
    expect(statement?.attributes?.balance).toBe(30000);
    expect(statement?.attributes?.available).toBe(30000);
    expect(statement?.attributes?.overdraftLimit).toBe(0);
    expect(statement?.attributes?.date).toBe('2022-08-18');
});

test('FlexbaseClient get deposit account history failure', async () => {

    const response = await testFlexbaseClient.getBankingAccountBalance(badCompanyId);

    expect(response.success).toBeFalsy();
    expect(response.error).toBe('While trying to get banking deposit balance history, an unhandled exception was thrown');
});

test('FlexbaseClient get deposit account history error', async () => {

    const response = await testFlexbaseClient.getBankingAccountBalance(errorCompanyId);

    expect(response.success).toBeFalsy();
});

// GET DEPOSIT ACCOUNT LIMITS
test('FlexbaseClient get deposit account limits success', async () => {

    const response = await testFlexbaseClient.getBankingAccountLimits(goodCompanyId);

    expect(response.success).toBeTruthy();
    expect(response?.type).toBe('limits');
    expect(response?.attributes?.ach.limits.dailyCredit).toBe(50000);
    expect(response?.attributes?.card.limits.dailyWithdrawal).toBe(500000);
});

test('FlexbaseClient get deposit account limits failure', async () => {

    const response = await testFlexbaseClient.getBankingAccountLimits(badCompanyId);

    expect(response.success).toBeFalsy();
    expect(response.error).toBe('While trying to get banking deposit limits, an unhandled exception was thrown');
});

test('FlexbaseClient get deposit account limits error', async () => {

    const response = await testFlexbaseClient.getBankingAccountLimits(errorCompanyId);

    expect(response.success).toBeFalsy();
});

// DEBIT CARDS
// GET DEBIT CARDS
test("FlexbaseClient get debit cards success", async () => {

    const response = await testFlexbaseClient.getBankingDebitCards(goodCompanyId);

    expect(response.success).toBeTruthy();

    const card = response.cards![0];
    expect(card.id).toBe('01234');
    expect(card.status).toBe('Active');
    expect(card.expirationDate).toBe('2025-09');
    expect(card.cardNumber).toBe('6559');
    expect(card.expensesTypes.monthlyPurchase).toBe('700000');
});

test("FlexbaseClient get debit cards success with params", async () => {

    const accountId = '770032';
    const response = await testFlexbaseClient.getBankingDebitCards(goodCompanyId, { accountId });

    expect(response.success).toBeTruthy();

    const card = response.cards![0];
    expect(card.id).toBe('01234');
    expect(card.status).toBe('Active');
    expect(card.cardNumber).toBe('6559');
    expect(card.expirationDate).toBe('2025-09');
    expect(card.expensesTypes.monthlyPurchase).toBe('700000');
});

test("FlexbaseClient get debit cards failure", async () => {

    const response = await testFlexbaseClient.getBankingDebitCards(badCompanyId);

    expect(response.success).toBeFalsy();
    expect(response.error).toBe('While trying to get banking Cards by Company, an unhandled exception occurred')
});

test("FlexbaseClient get debit cards error", async () => {

    const response = await testFlexbaseClient.getBankingDebitCards(errorCompanyId);

    expect(response.success).toBeFalsy();
});

// CREATE DEBIT CARD
test("FlexbaseClient create Debit Card success", async () => {

    const response = await testFlexbaseClient.createBankingDebitCard(goodCompanyId, createDebitCard);

    expect(response.success).toBeTruthy();
    expect(response?.card?.lastFour).toBe('6559');
    expect(response?.card?.status).toBe('Active');
    expect(response?.card?.dailyPurchase).toBe('7000');
});

test("FlexbaseClient create Debit Card failure", async () => {

    const response = await testFlexbaseClient.createBankingDebitCard(badCompanyId, createDebitCard );

    expect(response.success).toBeFalsy();
    expect(response.error).toBe('While trying to create a Unit Co. Debit Card, an unhandled exception was thrown')
});

test("FlexbaseClient create Debit Card error", async () => {

    const response = await testFlexbaseClient.createBankingDebitCard(errorCompanyId, createDebitCard);

    expect(response.success).toBeFalsy();
});

// UPDATE DEBIT CARD
test("FlexbaseClient update Debit Card success", async () => {

    const response = await testFlexbaseClient.updateBankingDebitCard(goodCompanyId, updateDebitCard);

    expect(response.success).toBeTruthy();
    expect(response?.card?.lastFour).toBe('6559');
    expect(response?.card?.status).toBe('Active');
    expect(response?.card?.dailyPurchase).toBe('10000');
});

test("FlexbaseClient update Debit Card failure", async () => {

    const response = await testFlexbaseClient.updateBankingDebitCard(badCompanyId, updateDebitCard );

    expect(response.success).toBeFalsy();
    expect(response.error).toBe('While trying to update the Unit Co. Debit Card, an unhandled exception was thrown')
});

test("FlexbaseClient update Debit Card error", async () => {

    const response = await testFlexbaseClient.updateBankingDebitCard(errorCompanyId, updateDebitCard);

    expect(response.success).toBeFalsy();
});

//TRANSACTIONS
//GET TRANSACTIONS
test('FlexbaseClient get banking transactions success', async () => {

    const response = await testFlexbaseClient.getBankingTransactions(goodCompanyId);

    expect(response.success).toBeTruthy();
    const transaction = response.transactions![0];
    expect(transaction.id).toBe('c1c62e41-47cd-42d6-a49f-b088b4424544');
    expect(transaction.cardId).toBe('430451');
    expect(transaction.depositAccount).toBe('824214');
    expect(transaction.balance).toBe('19999.0');
    expect(transaction.companyName).toBe('Crab Shack');
});

test('FlexbaseClient get banking transactions failure', async () => {

    const response = await testFlexbaseClient.getBankingTransactions(badCompanyId);

    expect(response.success).toBeFalsy();
    expect(response.error).toBe('Unable to get the list of transactions');
});

test('FlexbaseClient get banking transactions error', async () => {

    const response = await testFlexbaseClient.getBankingTransactions(errorCompanyId);

    expect(response.success).toBeFalsy();
});

//UNITCO TOKEN
//GET TOKEN
test('FlexbaseClient get Unitco token success', async () => {

    const response = await testFlexbaseClient.getUnitcoToken();

    expect(response.success).toBeTruthy();
    expect(response.type).toBe('customerTokenVerification');
    expect(response.attributes?.verificationToken).toBe('verifyToken');
});

test('FlexbaseClient get Unitco token failure', async () => {

    server.use(...banking_failure_handlers);

    const response = await testFlexbaseClient.getUnitcoToken();

    expect(response.success).toBeFalsy();
    expect(response.error).toBe('While trying to create a new Customer Token Verification, an error occurred!');
});

test('FlexbaseClient get Unitco token error', async () => {

    server.use(...banking_error_handlers);

    const response = await testFlexbaseClient.getUnitcoToken();

    expect(response.success).toBeFalsy();
});

//CREATE TOKEN
test('FlexbaseClient create Unitco token success', async () => {

    const response = await testFlexbaseClient.createUnitCoToken(createUnitcoToken);

    expect(response.success).toBeTruthy();
    expect(response.expiresIn).toBe(86400);
    expect(response.asOf).toBe('2022-10-15 13:48:50.298+00');
});

test('FlexbaseClient create Unitco token failure', async () => {

    server.use(...banking_failure_handlers);

    const response = await testFlexbaseClient.createUnitCoToken(createUnitcoToken);

    expect(response.success).toBeFalsy();
    expect(response.error).toBe('While trying to create a new Customer Token, an error occurred!');
});

test('FlexbaseClient create Unitco token error', async () => {

    server.use(...banking_error_handlers);

    const response = await testFlexbaseClient.createUnitCoToken(createUnitcoToken);

    expect(response.success).toBeFalsy();
});
