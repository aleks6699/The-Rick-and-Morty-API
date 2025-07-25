import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import CharacterDetails from '../components/CharacterDetails/CharacterDetails';
import { useCharacterDetailsQuery } from '../hooks/useCharacterDetailsQuery';
import { vi } from 'vitest';

vi.mock('../hooks/useCharacterDetailsQuery', () => ({
  useCharacterDetailsQuery: vi.fn(),
}));

describe('CharacterDetails', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render the loading spinner when loading is true', () => {
    (useCharacterDetailsQuery as jest.Mock).mockReturnValue({
      character: null,
      loading: true,
      error: null,
      hasData: false,
    });

    render(
      <MemoryRouter initialEntries={['/?search=&page=1&id=5']}>
        <CharacterDetails />
      </MemoryRouter>
    );

    const spinner = screen.getByTestId('loader');
    expect(spinner).toBeInTheDocument();
  });

  it('should render the CharacterDetails component and show View API details link', async () => {
    (useCharacterDetailsQuery as jest.Mock).mockReturnValue({
      character: {
        id: 5,
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        gender: 'Male',
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        type: '',
        location: { name: 'Earth' },
        origin: { name: 'Earth (C-137)' },
        created: '2017-11-04T18:48:46.250Z',
        url: 'https://rickandmortyapi.com/api/character/1',
      },
      loading: false,
      error: null,
      hasData: true,
    });

    render(
      <MemoryRouter initialEntries={['/?search=&page=1&id=5']}>
        <CharacterDetails />
      </MemoryRouter>
    );

    const link = await screen.findByText(/view api details/i);
    expect(link).toBeInTheDocument();

    const closeButton = screen.getByTestId('close-button');
    expect(closeButton).toBeInTheDocument();
  });
  it('should render the error message', () => {
    (useCharacterDetailsQuery as jest.Mock).mockReturnValue({
      character: null,
      loading: false,
      error: 'Character not found',
      hasData: false,
    });

    render(
      <MemoryRouter initialEntries={['/?search=&page=1&id=5']}>
        <CharacterDetails />
      </MemoryRouter>
    );

    const spinner = screen.getByText(/Character not found/i);
    expect(spinner).toBeInTheDocument();
  });
});
