import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { InputSearch } from '../components/InputSearch/InputSearch';

describe('InputSearch Component', () => {
  it('should render search input', () => {
    render(<InputSearch value="Rick" onChange={() => {}} />);

    const input = screen.getByPlaceholderText('Search character...');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveValue('Rick');
    expect(input).toHaveRole('textbox');
  });
  it('should call onChange when input value changes', () => {
    const handleChange = vi.fn();
    render(<InputSearch value="" onChange={handleChange} />);

    const input = screen.getByPlaceholderText('Search character...');
    fireEvent.change(input, { target: { value: 'Morty' } });
    expect(handleChange).toHaveBeenCalled();
  });
});
