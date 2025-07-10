import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import App from '../App';
import { MemoryRouter } from 'react-router';

describe('App Component (with mocked localStorage)', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders Header and MainContent correctly', () => {
    render(
      <MemoryRouter>
        <App />{' '}
      </MemoryRouter>
    );
    expect(
      screen.getByPlaceholderText('Search character...')
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('initializes searchTerm from localStorage', () => {
    (localStorage.getItem as jest.Mock).mockReturnValue('Rick');
    render(
      <MemoryRouter initialEntries={['/?search=Rick']}>
        <App />{' '}
      </MemoryRouter>
    );
    expect(screen.getByDisplayValue('Rick')).toBeInTheDocument();
  });

  it('updates searchTerm and saves to localStorage on button click', () => {
    render(
      <MemoryRouter>
        <App />{' '}
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText('Search character...');
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'Morty' } });
    fireEvent.click(button);

    expect(localStorage.setItem).toHaveBeenCalledWith('searchTerm', 'Morty');
    expect(screen.getByDisplayValue('Morty')).toBeInTheDocument();
  });

  it('updates MainContent when searchTerm changes', () => {
    render(
      <MemoryRouter>
        <App />{' '}
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText('Search character...');
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'Summer' } });
    fireEvent.click(button);

    expect(screen.getByRole('list')).toBeInTheDocument();
  });
});
