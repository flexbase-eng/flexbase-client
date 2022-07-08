import { server } from '../mocks/server/server';
import { testFlexbaseClient } from '../mocks/TestFlexbaseClient';
import { badUserId, errorUserId, goodUserId, issueCardForm } from "../mocks/server/constants";
import { card_failure_handlers, card_error_handlers } from '../mocks/server/handlers/card';


test("FlexbaseClient get cards success", async () => {

    const response = await testFlexbaseClient.getCompanyCards();

    expect(response).not.toBeNull();
    expect(response?.length).toBeGreaterThan(0);

    const card = response![0];

    expect(card.cardName).toBe('Card Test');
});

test("FlexbaseClient cards by company with params", async () => {

    const searchTerm = 'Card';
    const status = 'active';

    const response = await testFlexbaseClient.getCompanyCards({ searchTerm, status });

    expect(response).not.toBeNull();

    const cards = response![0];

    expect(cards.id).toBe('0');
});

test("FlexbaseClient get cards failure", async () => {

    server.use(...card_error_handlers);

    const response = await testFlexbaseClient.getCompanyCards();

    expect(response).toBeNull();
});

test("FlexbaseClient get cards error", async () => {

    server.use(...card_failure_handlers);

    const response = await testFlexbaseClient.getCompanyCards();

    expect(response).toBeNull();
});

// USER CARD
test("FlexbaseClient get user card success", async () => {

    const response = await testFlexbaseClient.getUserCard(goodUserId);

    expect(response).not.toBeNull();

    expect(response?.cardName).toBe('Card Test');
    expect(response?.cardNumber).toBe('1234');
});

test("FlexbaseClient get user card failure", async () => {

    const response = await testFlexbaseClient.getUserCard(badUserId);

    expect(response).toBeNull();
});

test("FlexbaseClient get user card error", async () => {

    const response = await testFlexbaseClient.getUserCard(errorUserId);

    expect(response).toBeNull();
});

// ISSUE CARD
test("FlexbaseClient issue user card success", async () => {

    const response = await testFlexbaseClient.issueUserCard(goodUserId, issueCardForm);

    expect(response).not.toBeNull();

    expect(response?.cardName).toBe('Card Test');
    expect(response?.cardNumber).toBe('1234');
});

test("FlexbaseClient issue user card failure", async () => {

    const response = await testFlexbaseClient.issueUserCard(badUserId, issueCardForm);

    expect(response).toBeNull();
});

test("FlexbaseClient issue user card error", async () => {

    const response = await testFlexbaseClient.issueUserCard(errorUserId, issueCardForm);

    expect(response).toBeNull();
});