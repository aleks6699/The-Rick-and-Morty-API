import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MainContent } from '../components/MainContent/MainContent';

describe('MainContent Component', () => {
  it('displays loader during loading and then content', async () => {
    render(<MainContent searchTerm="Rick" />);
    const loader = screen.getByRole('status');

    expect(loader).toBeInTheDocument();
    expect(loader).toHaveClass('animate-spin');

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: /Rick/i })
      ).toBeInTheDocument();
    });

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('correctly displays character card', async () => {
    render(<MainContent searchTerm="Rick" />);

    await waitFor(() => {
      const card = screen.getByRole('listitem');
      expect(card).toBeInTheDocument();
      expect(
        screen.getByRole('heading', { name: /Rick/i })
      ).toBeInTheDocument();
      expect(screen.getByText(/Human/)).toBeInTheDocument();
      expect(screen.getByText(/Alive/)).toBeInTheDocument();
      expect(screen.getByText(/Male/)).toBeInTheDocument();
      expect(screen.getByText(/Earth/)).toBeInTheDocument();
    });
  });

  it('displays error message on 404', async () => {
    render(<MainContent searchTerm="error" />);

    await waitFor(() => {
      const errorMessage = screen.getByText(/Character not found/i);
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveClass('text-red-400');
    });
  });

  it('displays "No characters found" for empty results', async () => {
    render(<MainContent searchTerm="empty" />);

    await waitFor(() => {
      const message = screen.getByText(/No characters found/i);
      expect(message).toBeInTheDocument();
      expect(message).toHaveClass('text-gray-400');
    });
  });

  it('updates content when searchTerm changes', async () => {
    const { rerender } = render(<MainContent searchTerm="Rick" />);

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: /Rick/i })
      ).toBeInTheDocument();
    });

    rerender(<MainContent searchTerm="Morty" />);

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: /Morty/i })
      ).toBeInTheDocument();
    });
  });
});
