import { ErrorBoundary } from '../ErrorBoundary';
import { MemoryRouter } from 'react-router';

import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Header } from '../components/Header/Header';

describe('ErrorBoundary', () => {
  it('renders Header and reads search param', () => {
    render(
      <MemoryRouter initialEntries={['/?search=Test']}>
        <ErrorBoundary>
          <Header onClick={() => {}} initialValue="Test" />
        </ErrorBoundary>
      </MemoryRouter>
    );

    const inputElement = screen.getByPlaceholderText('Search character...');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('Test');
  });
  it('catches errors in children and displays fallback UI', () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const ThrowErrorComponent = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary>
        <ThrowErrorComponent />
      </ErrorBoundary>
    );
    expect(
      screen.getByText(/Reality corruption level: 99.9%/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Attempting to stabilize.../i)).toBeInTheDocument();
    consoleErrorSpy.mockRestore();
  });
});
