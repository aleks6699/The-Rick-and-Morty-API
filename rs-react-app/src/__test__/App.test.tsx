import { screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import App from '../App';
import { MemoryRouter } from 'react-router';
import { assertIsHTMLElement } from '../utils/asserts/domAsserts';
import { renderWithQueryClient } from './test-utils';

describe('App Component (with mocked localStorage)', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    });
  });

  vi.mock('../utils/asserts/domAsserts', () => ({
    assertIsHTMLElement: vi.fn(),
  }));

  (assertIsHTMLElement as jest.Mock).mockImplementation(() => {});

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders Header and MainContent correctly', () => {
    renderWithQueryClient(
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
    renderWithQueryClient(
      <MemoryRouter initialEntries={['/?search=Rick']}>
        <App />{' '}
      </MemoryRouter>
    );
    expect(screen.getByDisplayValue('Rick')).toBeInTheDocument();
  });

  it('updates searchTerm and saves to localStorage on button click', () => {
    renderWithQueryClient(
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
    renderWithQueryClient(
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
