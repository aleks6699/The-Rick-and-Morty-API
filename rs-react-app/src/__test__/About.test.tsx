import { render, screen } from '@testing-library/react';
import AboutPage from '../pages/About';
import { MemoryRouter } from 'react-router';

describe('AboutPage', () => {
  it('should render the AboutPage', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <AboutPage />
      </MemoryRouter>
    );
    const header = screen.queryByRole('heading', { name: 'About the App' });
    expect(header).toBeInTheDocument();
  });
});
