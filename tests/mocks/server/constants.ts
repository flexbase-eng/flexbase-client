import { CounterpartyForm, PaymentForm } from '../../../src';

export const mockUrl = "http://localhost:3000";
export const tokenUrl = mockUrl + "/auth/token";
export const tokenUrl2 = mockUrl + "/auth/token2";

export const goodUser = "good_user";
export const goodPass = "good_pass";

export const badUser = "bad_user";
export const badPass = "bad_pass";

export const goodToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjM2MDAsInJvbGVzIjpbIkFETUlOIl19.zZY1fuvVRIFauW3jzK8-he8C82h9AD8YP_fiGWLVq4A";
export const badToken = "bad_token";
export const oldToken = "old_token";

export const goodRefreshToken = goodToken;

export const testTokenType = "Test";

export const plaidLinkToken = "plaid token";
export const goodPlaidPublicToken = "good token";
export const badPlaidPublicToken = "bad token";

export const goodCompanyId = "good company";
export const badCompanyId = "bad company";
export const errorCompanyId = "error company";

export const goodInvoiceId = "good invoice";
export const badInvoiceId = "bad invoice";
export const errorInvoiceId = "error invoice";
export const invoiceForm = { contractId: 'good contract', description: 'invoice description'}


export const goodUserId = "good_user_id";
export const badUserId = "bad_user_id";
export const errorUserId = "error_user_id";
export const addPersonForm = { firstName: "Mariana", lastName: "Murillo 100", jobTitle: "Engineerr 100", email: "mariana+122@edukathe.org" };

export const goodApiKey = "good api key";
export const badApiKey = "bad api key";
export const errorApiKey = "error api key";
export const deniedApiKey = "denied api key";

export const goodDocId = "good docId";
export const badDocId = "bad docId";
export const errorDocId = "error docId";

export const goodCardId = "good card";
export const badCardId = "bad card";
export const errorCardId = "error card";
export const cardType = "physical";
export const updateCardForm = { expensesTypes: { amount: 5000, groups: [], interval: 'monthly' }, notifyUse: true, creditLimit: 5000, cardName: 'Gas Card' }

export const counterparty: Partial<CounterpartyForm> = { routingNumber: "213456787989", accountNumber: "2983433", accountType: "Checking", name: "Jane Doe" }
export const paymentBodyReq: PaymentForm = { type: 'achPayment', amount: '1000.0', accountId: '01234', direction: 'credit', description: 'New payment', counterparty }
export const createDebitCard = { type: 'businessDebitCard', limits: { dailyPurchase: 7000 } }
export const updateDebitCard = { id: '01234', type: 'businessDebitCard', limits: { dailyPurchase: 10000 } }
export const createUnitcoToken = { scope: 'transactions cards cards-write cards-sensitive-write', verificationCode: '301299', verificationToken: 'NewToken' }
