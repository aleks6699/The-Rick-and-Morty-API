import '@testing-library/jest-dom/vitest';
import { setupServer } from 'msw/node';
import { handlers } from './mock/handlers';
import { cleanup } from '@testing-library/react';

export const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());
