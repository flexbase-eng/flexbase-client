import { test, expect } from 'vitest';
import { badDocId, errorDocId, goodDocId } from '../mocks/server/constants';
import { testFlexbaseClient } from '../mocks/TestFlexbaseClient';

test('FlexbaseClient get doc picture success', async () => {
  const response = await testFlexbaseClient.getDocumentImage(goodDocId);

  expect(response).not.toBeNull();
  expect(response).toBeInstanceOf(ArrayBuffer);
});

test('FlexbaseClient get doc picture failure', async () => {
  const response = await testFlexbaseClient.getDocumentImage(badDocId);

  expect(response).toBeNull();
});

test('FlexbaseClient get doc picture error', async () => {
  const response = await testFlexbaseClient.getDocumentImage(errorDocId);

  expect(response).toBeNull();
});
