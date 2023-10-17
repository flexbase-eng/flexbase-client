import { test, expect } from 'vitest';
import { DateTime } from 'luxon';
import { badCompanyId, badInvoiceId, errorCompanyId, errorInvoiceId, goodCompanyId, goodInvoiceId, invoiceForm } from '../mocks/server/constants';
import { testFlexbaseClient } from '../mocks/TestFlexbaseClient';

test('FlexbaseClient invoice by company success', async () => {
  const response = await testFlexbaseClient.getInvoicesByCompany(goodCompanyId);

  expect(response).not.toBeNull();

  const invoice = response![0];

  expect(invoice.id).toBe(goodCompanyId);
});

test('FlexbaseClient invoice by company failure', async () => {
  const response = await testFlexbaseClient.getInvoicesByCompany(badCompanyId);

  expect(response).toBeNull();
});

test('FlexbaseClient invoice by company error', async () => {
  const response = await testFlexbaseClient.getInvoicesByCompany(errorCompanyId);

  expect(response).toBeNull();
});

test('FlexbaseClient invoice by company with params', async () => {
  const before = DateTime.now();
  const after = DateTime.now();
  const includeCardholder = true;
  const includeMerchantName = true;
  const includeReversed = true;
  const includeExpired = true;

  const response = await testFlexbaseClient.getInvoicesByCompany(goodCompanyId, {
    before,
    after,
    includeCardholder,
    includeMerchantName,
    includeReversed,
    includeExpired,
  });

  expect(response).not.toBeNull();

  const invoice = response![0];

  expect(invoice.id).toBe(goodCompanyId);
});

// user
test('FlexbaseClient invoice by user success', async () => {
  const response = await testFlexbaseClient.getInvoicesByUser(goodCompanyId);

  expect(response).not.toBeNull();

  const invoice = response![0];

  expect(invoice.id).toBe(goodCompanyId);
});

test('FlexbaseClient invoice by user failure', async () => {
  const response = await testFlexbaseClient.getInvoicesByUser(badCompanyId);

  expect(response).toBeNull();
});

test('FlexbaseClient invoice by user error', async () => {
  const response = await testFlexbaseClient.getInvoicesByUser(errorCompanyId);

  expect(response).toBeNull();
});

test('FlexbaseClient invoice by user with params', async () => {
  const before = DateTime.now();
  const after = DateTime.now();
  const includeCardholder = true;
  const includeMerchantName = true;
  const includeReversed = true;
  const includeExpired = true;

  const response = await testFlexbaseClient.getInvoicesByUser(goodCompanyId, {
    before,
    after,
    includeCardholder,
    includeMerchantName,
    includeReversed,
    includeExpired,
  });

  expect(response).not.toBeNull();

  const invoice = response![0];

  expect(invoice.id).toBe(goodCompanyId);
});

// invoice
test('FlexbaseClient update invoice success', async () => {
  const response = await testFlexbaseClient.updateInvoice(goodInvoiceId, invoiceForm);

  const invoice = response!;

  expect(invoice.id).toBe(goodInvoiceId);
});

test('FlexbaseClient update invoice failure', async () => {
  const response = await testFlexbaseClient.updateInvoice(badInvoiceId, invoiceForm);

  expect(response).toBeNull();
});

test('FlexbaseClient update invoice error', async () => {
  const response = await testFlexbaseClient.updateInvoice(errorInvoiceId, invoiceForm);

  expect(response).toBeNull();
});

test('FlexbaseClient update invoice picture success', async () => {
  const response = await testFlexbaseClient.uploadInvoiceFile(goodInvoiceId, {});

  const invoice = response!;

  expect(invoice.id).toBe(goodInvoiceId);
});

test('FlexbaseClient update invoice picture failure', async () => {
  const response = await testFlexbaseClient.uploadInvoiceFile(badInvoiceId, {});

  expect(response).toBeNull();
});

test('FlexbaseClient update invoice picture error', async () => {
  const response = await testFlexbaseClient.uploadInvoiceFile(errorInvoiceId, {});

  expect(response).toBeNull();
});
