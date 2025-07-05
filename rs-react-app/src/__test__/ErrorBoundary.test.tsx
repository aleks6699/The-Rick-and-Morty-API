import { ErrorBoundary } from '../ErrorBoundary';

import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Header } from '../components/Header/Header';

describe('ErrorBoundary', () => {
  it('renders children without error', () => {
    render(
      <ErrorBoundary>
        <Header searchTerm="Test" setSearchTerm={() => {}} />
      </ErrorBoundary>
    );
    const inputElement = screen.getByPlaceholderText('Search character...');
    expect(screen.getByDisplayValue('Test')).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
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
