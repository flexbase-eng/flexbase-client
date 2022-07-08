import { card_failure_handlers, card_error_handlers } from '../mocks/server/handlers/card';
import { server } from '../mocks/server/server';
import { testFlexbaseClient } from '../mocks/TestFlexbaseClient';

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
