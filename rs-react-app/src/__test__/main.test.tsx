import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';

vi.mock('react-dom/client', () => ({
  createRoot: vi.fn(() => ({
    render: vi.fn(),
  })),
}));

vi.mock('../App.tsx', () => ({
  default: () => <div>Test App</div>,
}));

vi.mock('../utils/asserts/domAsserts.ts', () => ({
  assertIsHTMLElement: vi.fn(),
}));

describe('main.tsx', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
    document.body.innerHTML = '<div id="root"></div>';
  });

  it('should find the element #root', async () => {
    await import('../main.tsx');

    const rootElement = document.getElementById('root');
    expect(rootElement).toBeDefined();
  });

  it('must call assertIsHTMLElement', async () => {
    const { assertIsHTMLElement } = await import(
      '../utils/asserts/domAsserts.ts'
    );

    await import('../main.tsx');

    expect(assertIsHTMLElement).toHaveBeenCalledOnce();
  });

  it('must call createRoot', async () => {
    const { createRoot } = await import('react-dom/client');

    await import('../main.tsx');

    expect(createRoot).toHaveBeenCalledOnce();
  });
});
