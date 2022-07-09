import { server } from '../mocks/server/server';
import { testFlexbaseClient } from '../mocks/TestFlexbaseClient';
import { goodCardId, badUserId, errorUserId, goodUserId, updateCardForm, badCardId, errorCardId, cardType } from "../mocks/server/constants";
import { card_failure_handlers, card_error_handlers } from '../mocks/server/handlers/card';


test("FlexbaseClient get cards success", async () => {

    const response = await testFlexbaseClient.getCardsByCompany();

    expect(response).not.toBeNull();
    expect(response?.length).toBeGreaterThan(0);

    const card = response![0];

    expect(card.id).toBe(goodCardId);
    expect(card.cardName).toBe('Card Test');
});

test("FlexbaseClient cards by company with params", async () => {

    const searchTerm = 'Card';
    const status = 'active';

    const response = await testFlexbaseClient.getCardsByCompany({ searchTerm, status });

    expect(response).not.toBeNull();

    const card = response![0];

    expect(card.id).toBe(goodCardId);
});

test("FlexbaseClient get cards failure", async () => {

    server.use(...card_error_handlers);

    const response = await testFlexbaseClient.getCardsByCompany();

    expect(response).toBeNull();
});

test("FlexbaseClient get cards error", async () => {

    server.use(...card_failure_handlers);

    const response = await testFlexbaseClient.getCardsByCompany();

    expect(response).toBeNull();
});

// CARD
test("FlexbaseClient get user card success", async () => {

    const response = await testFlexbaseClient.getCardById(goodCardId);

    expect(response).not.toBeNull();

    expect(response?.id).toBe(goodCardId);
    expect(response?.cardName).toBe('Card Test');
    expect(response?.cardNumber).toBe('1234');
});

test("FlexbaseClient get user card failure", async () => {

    const response = await testFlexbaseClient.getCardById(badCardId);

    expect(response).toBeNull();
});

test("FlexbaseClient get user card error", async () => {

    const response = await testFlexbaseClient.getCardById(errorCardId);

    expect(response).toBeNull();
});

// ISSUE CARD
test("FlexbaseClient issue user card success", async () => {

    const response = await testFlexbaseClient.issueCard(goodUserId, cardType);

    expect(response).not.toBeNull();

    expect(response?.id).toBe(goodCardId);
    expect(response?.cardName).toBe('Card Test');
    expect(response?.cardNumber).toBe('1234');
});

test("FlexbaseClient issue user card failure", async () => {

    const response = await testFlexbaseClient.issueCard(badUserId, cardType);

    expect(response).toBeNull();
});

test("FlexbaseClient issue user card error", async () => {

    const response = await testFlexbaseClient.issueCard(errorUserId, cardType);

    expect(response).toBeNull();
});

// UPDATE CARD
test("FlexbaseClient update user card success", async () => {

    const response = await testFlexbaseClient.updateCard(goodUserId, updateCardForm);

    expect(response).not.toBeNull();

    expect(response?.id).toBe(goodCardId);
    expect(response?.cardName).toBe('Gas Card');
    expect(response?.cardNumber).toBe('1234');
    expect(response?.creditLimit).toBe(5000);
});

test("FlexbaseClient update user card failure", async () => {

    const response = await testFlexbaseClient.updateCard(badCardId, updateCardForm);

    expect(response).toBeNull();
});

test("FlexbaseClient update user card error", async () => {

    const response = await testFlexbaseClient.updateCard(errorCardId, updateCardForm);

    expect(response).toBeNull();
});
