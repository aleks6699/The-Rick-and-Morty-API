import { Button } from '../components/Button/Button';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

describe('Button Component', () => {
  it('renders the button with correct text', () => {
    render(<Button onClick={() => {}} />);
    const buttonElement = screen.getByRole('button', { name: /search/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick} />);
    const buttonElement = screen.getByRole('button', { name: /search/i });
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
