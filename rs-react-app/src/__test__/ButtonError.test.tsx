import { ButtonError } from '../components/ButtonError/ButtonError';
import { ErrorBoundary } from '../ErrorBoundary';

import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

describe('ButtonError Component', () => {
  it('renders without crashing', () => {
    render(<ButtonError forceError={false} />);
    const buttonElement = screen.getByRole('button', {
      name: '💥',
    });
    expect(buttonElement).toBeInTheDocument();
  });

  it('throws an error when clicked and is caught by ErrorBoundary', () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ButtonError forceError={false} />
      </ErrorBoundary>
    );

    const buttonElement = screen.getByRole('button', { name: '💥' });
    fireEvent.click(buttonElement);

    expect(screen.getByText(/Quantum Flux Detected/i)).toBeInTheDocument();

    expect(consoleErrorSpy).toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });
});
