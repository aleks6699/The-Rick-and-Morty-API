import { renderWithQueryClient } from './test-utils';
import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { CharacterDetails } from '../components/CharacterDetails/CharacterDetails';

describe('CharacterDetails (integration with MSW)', () => {
  it('should show loading spinner', () => {
    renderWithQueryClient(
      <MemoryRouter initialEntries={['/?id=1']}>
        <CharacterDetails />
      </MemoryRouter>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should show character details', async () => {
    renderWithQueryClient(
      <MemoryRouter initialEntries={['/?id=1']}>
        <CharacterDetails />
      </MemoryRouter>
    );

    const name = await screen.findByText('Rick Sanchez');
    expect(name).toBeInTheDocument();
  });

  it('should show 404 error', async () => {
    renderWithQueryClient(
      <MemoryRouter initialEntries={['/?id=404']}>
        <CharacterDetails />
      </MemoryRouter>
    );

    const errorMsg = await screen.findByText(/character not found/i);
    expect(errorMsg).toBeInTheDocument();
  });

  it('should render empty character state', async () => {
    renderWithQueryClient(
      <MemoryRouter initialEntries={['/?id=500']}>
        <CharacterDetails />
      </MemoryRouter>
    );

    const msg = await screen.findByText(/character not found/i);
    expect(msg).toBeInTheDocument();
  });
});
