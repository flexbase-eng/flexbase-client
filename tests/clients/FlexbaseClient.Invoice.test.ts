import { DateTime } from "luxon";
import { badCompanyId, errorCompanyId, goodCompanyId } from "../mocks/server/constants";
import { testFlexbaseClient } from "../mocks/TestFlexbaseClient";

test("FlexbaseClient invoice by company success", async () => {

    const response = await testFlexbaseClient.getInvoicesByCompany(goodCompanyId);

    expect(response).not.toBeNull();

    const invoice = response![0];

    expect(invoice.id).toBe(goodCompanyId);
});

test("FlexbaseClient invoice by company failure", async () => {

    const response = await testFlexbaseClient.getInvoicesByCompany(badCompanyId);

    expect(response).toBeNull();
});

test("FlexbaseClient invoice by company error", async () => {

    const response = await testFlexbaseClient.getInvoicesByCompany(errorCompanyId);

    expect(response).toBeNull();
});

test("FlexbaseClient invoice by company with params", async () => {

    const before = DateTime.now();
    const after = DateTime.now();
    const includeCardholder = true;
    const includeMerchantName = true;
    const includeReversed = true;
    const includeExpired = true;

    const response = await testFlexbaseClient.getInvoicesByCompany(goodCompanyId, { before, after, includeCardholder, includeMerchantName, includeReversed, includeExpired });

    expect(response).not.toBeNull();

    const invoice = response![0];

    expect(invoice.id).toBe(goodCompanyId);
});

// user
test("FlexbaseClient invoice by user success", async () => {

    const response = await testFlexbaseClient.getInvoicesByUser(goodCompanyId);

    expect(response).not.toBeNull();

    const invoice = response![0];

    expect(invoice.id).toBe(goodCompanyId);
});

test("FlexbaseClient invoice by user failure", async () => {

    const response = await testFlexbaseClient.getInvoicesByUser(badCompanyId);

    expect(response).toBeNull();
});

test("FlexbaseClient invoice by user error", async () => {

    const response = await testFlexbaseClient.getInvoicesByUser(errorCompanyId);

    expect(response).toBeNull();
});

test("FlexbaseClient invoice by user with params", async () => {

    const before = DateTime.now();
    const after = DateTime.now();
    const includeCardholder = true;
    const includeMerchantName = true;
    const includeReversed = true;
    const includeExpired = true;

    const response = await testFlexbaseClient.getInvoicesByUser(goodCompanyId, { before, after, includeCardholder, includeMerchantName, includeReversed, includeExpired });

    expect(response).not.toBeNull();

    const invoice = response![0];

    expect(invoice.id).toBe(goodCompanyId);
});