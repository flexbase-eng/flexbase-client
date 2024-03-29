import { test, expect } from 'vitest';
import { testFlexbaseClient } from '../mocks/TestFlexbaseClient';
import { badCompanyId, errorCompanyId, goodCompanyId } from '../mocks/server/constants';

test('FlexbaseClient get credit statement data', async () => {
  const response = await testFlexbaseClient.getCreditStatement(goodCompanyId, { target: '2022-09-15' });
  expect(response).not.toBeNull();

  const invoicesNew = response?.invoicesNew || [];

  expect(response?.success).toBeTruthy();
  expect(response?.invoicesNewPeriodFrom).toBe('2022-08-16');
  expect(response?.invoicesNewPeriodTo).toBe('2022-08-31');
  expect(invoicesNew[0]?.origin).toBe('bnpl');
  expect(response?.company?.active).toBeTruthy();
  expect(response?.company?.address).toBe('5018 Bridgevalley Ct');
  expect(response?.company?.name).toBe('Texas Stag Roofing Solutions');
});

test('FlexbaseClient get credit statement data error', async () => {
  const response = await testFlexbaseClient.getCreditStatement(errorCompanyId);
  expect(response?.success).toBeFalsy();
  expect(response?.error).toBe('Unable to get credit statement data');
});

test('FlexbaseClient get credit statement failure', async () => {
  const response = await testFlexbaseClient.getCreditStatement(badCompanyId);

  expect(response?.success).toBeFalsy();
  expect(response?.error).toBe('Unable to get credit statement data');
});

test('FlexbaseClient get company transactions data', async () => {
  const response = await testFlexbaseClient.getCompanyTransactions(goodCompanyId, { after: '2022-09-15', before: '2022-12-15' });
  expect(response).not.toBeNull();

  const transactions = response?.transactions || [];

  expect(response?.companyId).toBe(goodCompanyId);
  expect(response?.tenantId).toBe('f3807f71-dede-4cc9-ba9c-a30b9fd8cac2');
  expect(transactions[0]?.date).toBe('2022-09-12');
  expect(transactions[0]?.type).toBe('bnpl');
});

test('FlexbaseClient company transactions data failure', async () => {
  const response = await testFlexbaseClient.getCompanyTransactions(badCompanyId);

  expect(response?.error).toBe('Unable to get company transactions data');
});
