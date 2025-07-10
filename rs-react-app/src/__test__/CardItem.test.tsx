import { render, screen } from '@testing-library/react';
import { CardItem } from '../components/CardItem/CardItem';
import type { Card } from '../types/types';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

const mockCharacter: Card = {
  id: 1,
  name: 'Rick Sanchez',
  species: 'Human',
  status: 'Alive',
  gender: 'Male',
  image: 'https://example.com/image.jpg',
  location: { name: 'Earth', url: 'https://example.com/location' },
  url: 'https://example.com/character/1',
};

describe('CardItem', () => {
  beforeEach(() => {
    vi.stubGlobal('scrollTo', vi.fn());
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('renders character card with image', () => {
    render(
      <MemoryRouter initialEntries={['/?search=Rick']}>
        <CardItem {...mockCharacter} />
      </MemoryRouter>
    );

    expect(screen.getByAltText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('calls scrollTo when link is clicked', async () => {
    render(
      <MemoryRouter initialEntries={['/?search=Rick']}>
        <CardItem {...mockCharacter} />
      </MemoryRouter>
    );

    const link = screen.getByRole('link');
    await userEvent.click(link);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });
});
