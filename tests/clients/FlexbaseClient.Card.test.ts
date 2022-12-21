import { server } from '../mocks/server/server';
import { testFlexbaseClient } from '../mocks/TestFlexbaseClient';
import { goodCardId, badUserId, errorUserId, goodUserId, updateCardForm, badCardId, errorCardId, cardType } from "../mocks/server/constants";
import { card_failure_handlers, card_error_handlers } from '../mocks/server/handlers/card';


test("FlexbaseClient get cards success", async () => {

    const response = await testFlexbaseClient.getCardsByCompany();

    expect(response).not.toBeNull();
    expect(response?.cards?.length).toBeGreaterThan(0);

    const card = response.cards![0];

    expect(card.id).toBe(goodCardId);
    expect(card.cardName).toBe('Card Test');
});

test("FlexbaseClient cards by company with params", async () => {

    const searchTerm = 'Card';
    const status = 'active';
    const full = true;

    const response = await testFlexbaseClient.getCardsByCompany({ searchTerm, status, full });

    expect(response).not.toBeNull();

    const card = response.cards![0];

    expect(card.id).toBe(goodCardId);
});

test("FlexbaseClient get cards failure", async () => {

    server.use(...card_error_handlers);

    const response = await testFlexbaseClient.getCardsByCompany();

    expect(response.error).toBe('Unable to get company cards');
    expect(response.success).toBeFalsy();
});

test("FlexbaseClient get cards error", async () => {

    server.use(...card_failure_handlers);

    const response = await testFlexbaseClient.getCardsByCompany();

    expect(response.success).toBeFalsy();
});

// CARD
test("FlexbaseClient get user card success", async () => {

    const response = await testFlexbaseClient.getCard(goodCardId);

    expect(response).not.toBeNull();

    expect(response?.card?.id).toBe(goodCardId);
    expect(response?.card?.cardName).toBe('Card Test');
    expect(response?.card?.cardNumber).toBe('1234');
});

test("FlexbaseClient get user card failure", async () => {

    const response = await testFlexbaseClient.getCard(badCardId);

    expect(response.success).toBeFalsy();
});

test("FlexbaseClient get user card error", async () => {

    const response = await testFlexbaseClient.getCard(errorCardId);

    expect(response.error).toBe('Unable to get the card info');
    expect(response.card).toBeNull();
});

// ISSUE CARD
test("FlexbaseClient issue user card success", async () => {

    const response = await testFlexbaseClient.issueCard(goodUserId, { cardType });

    expect(response).not.toBeNull();

    expect(response?.card?.id).toBe(goodCardId);
    expect(response?.card?.cardName).toBe('Card Test');
    expect(response?.card?.cardNumber).toBe('1234');
});

test("FlexbaseClient issue user card failure", async () => {

    const response = await testFlexbaseClient.issueCard(badUserId, { cardType });

    expect(response.success).toBeFalsy();
});

test("FlexbaseClient issue user card error", async () => {

    const response = await testFlexbaseClient.issueCard(errorUserId, { cardType });

    expect(response.error).toBe('Unable to issue the card');
    expect(response.card).toBeNull();
});

// UPDATE CARD
test("FlexbaseClient update user card success", async () => {

    const response = await testFlexbaseClient.updateCard(goodUserId, updateCardForm);

    expect(response).not.toBeNull();

    expect(response?.card?.id).toBe(goodCardId);
    expect(response?.card?.cardName).toBe('Gas Card');
    expect(response?.card?.cardNumber).toBe('1234');
    expect(response?.card?.creditLimit).toBe(5000);
    expect(response?.card?.expensesTypes?.interval).toBe('monthly');
});

test("FlexbaseClient update user card failure", async () => {

    const response = await testFlexbaseClient.updateCard(badCardId, updateCardForm);

    expect(response.error).toBe('Error message');
    expect(response.success).toBeFalsy();
});

test("FlexbaseClient update user card error", async () => {

    const response = await testFlexbaseClient.updateCard(errorCardId, updateCardForm);

    expect(response.error).toBe('Unable to update the card info');
    expect(response.card).toBeNull();
});

// Change card status
test("FlexbaseClient activate card", async () => {

    const last4 = '1234';
    const status = 'active';
    const cardId = goodCardId;

    const response = await testFlexbaseClient.updateCardStatus(cardId, status, last4);

    expect(response).not.toBeNull();

    expect(response?.card?.id).toBe(goodCardId);
    expect(response?.card?.cardName).toBe('Gas Card');
    expect(response?.card?.cardNumber).toBe('1234');
    expect(response?.card?.status).toBe('active');
});

test("FlexbaseClient update card status failure", async () => {

    server.use(...card_failure_handlers);

    const status = 'suspended';
    const response = await testFlexbaseClient.updateCardStatus(badCardId, status);

    expect(response.success).toBeFalsy();
    expect(response.error).toBe('Error message');
});

test("FlexbaseClient update card status error", async () => {

    server.use(...card_error_handlers);

    const status = 'suspended';
    const response = await testFlexbaseClient.updateCardStatus(badCardId, status);

    expect(response.card).toBeNull();
    expect(response.success).toBeFalsy();
    expect(response.error).toBe('Unable to update the card status');
});

test("FlexbaseClient get hidden card information success", async () => {

    const response = await testFlexbaseClient.getCardHiddenInfo(goodCardId);

    expect(response).not.toBeNull();
    expect(response?.cardNumber).toBe('40000099900XXXX');
    expect(response?.cvc).toBe('123');
    expect(response?.expirationDate).toBe('1/20XX');
});

test("FlexbaseClient get hidden card information error", async () => {

    const response = await testFlexbaseClient.getCardHiddenInfo(errorCardId);

    expect(response.error).toBe('Unable to obtain hidden card information');
    expect(response.cardNumber).toBeNull();
});
