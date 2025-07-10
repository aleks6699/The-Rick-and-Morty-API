import { render } from '@testing-library/react';
import { NotFound } from '../components/NotFound/NotFound';
import { MemoryRouter } from 'react-router';

describe('NotFound', () => {
  it('should render the NotFound component', () => {
    const { getByText } = render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
    expect(getByText('404 - Page Not Found')).toBeInTheDocument();
  });
});
