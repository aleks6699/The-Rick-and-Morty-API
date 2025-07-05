import '@testing-library/jest-dom/vitest';
import { setupServer } from 'msw/node';
import { handlers } from './mock/handlers';

export const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
