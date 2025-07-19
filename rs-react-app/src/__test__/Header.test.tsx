import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Header } from '../components/Header/Header';

describe('Header Component', () => {
  const mockSetSearchTerm = vi.fn();

  beforeEach(() => {
    mockSetSearchTerm.mockClear();
    cleanup();
  });

  it('renders input and button', () => {
    render(<Header searchTerm="Rick" setSearchTerm={mockSetSearchTerm} />);

    const input = screen.getByPlaceholderText('Search character...');
    const button = screen.getByRole('button');

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(input).toHaveValue('Rick');
  });

  it('updates input value when user types', () => {
    render(<Header searchTerm="" setSearchTerm={mockSetSearchTerm} />);

    const input = screen.getByPlaceholderText('Search character...');
    fireEvent.change(input, { target: { value: 'Morty' } });

    expect(input).toHaveValue('Morty');
  });

  it('calls setSearchTerm with input value when button is clicked', () => {
    render(<Header searchTerm="" setSearchTerm={mockSetSearchTerm} />);

    const input = screen.getByPlaceholderText('Search character...');
    const button = screen.getByRole('button');

    fireEvent.change(input, { target: { value: 'Summer' } });
    fireEvent.click(button);

    expect(mockSetSearchTerm).toHaveBeenCalledTimes(1);
    expect(mockSetSearchTerm).toHaveBeenCalledWith('Summer');
  });

  it('initializes input with provided searchTerm prop', () => {
    render(<Header searchTerm="Beth" setSearchTerm={mockSetSearchTerm} />);

    const input = screen.getByPlaceholderText('Search character...');
    expect(input).toHaveValue('Beth');
  });
});
