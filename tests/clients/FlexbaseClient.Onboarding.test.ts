import { testFlexbaseClient } from '../mocks/TestFlexbaseClient';

test('FlexbaseClient get onboarding status success', async () => {
    const response = await testFlexbaseClient.getOnboardingStatus();

    expect(response).not.toBeNull();
    expect(response!.required.length).toBeGreaterThan(0);

    const required = response!.required[0];

    expect(required).toBe('test');
    expect(response!.completedTimestamp).not.toBeNull();
});

test('FlexbaseClient get onboarding status expand success', async () => {
    const response = await testFlexbaseClient.getOnboardingStatus(true);

    expect(response).not.toBeNull();
    expect(response!.required.length).toBeGreaterThan(0);

    const required = response!.required[0];

    expect(required).toBe('test');
    expect(response!.completedTimestamp).not.toBeNull();
});
