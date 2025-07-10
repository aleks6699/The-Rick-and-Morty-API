import { render } from '@testing-library/react';
import { Pagination } from '../components/Pagination/Pagination';
import { vi } from 'vitest';

describe('Pagination', () => {
  it('should render the Pagination component', () => {
    const { getByText } = render(
      <Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />
    );
    expect(getByText('Page 1 of 10')).toBeInTheDocument();
  });

  it('should render the Pagination component with multiple pages', () => {
    const { getByText } = render(
      <Pagination currentPage={2} totalPages={10} onPageChange={() => {}} />
    );
    expect(getByText('Page 2 of 10')).toBeInTheDocument();
  });
  it('clicking on a page should call onPageChange', () => {
    const onPageChange = vi.fn();
    const { getByText } = render(
      <Pagination currentPage={1} totalPages={10} onPageChange={onPageChange} />
    );
    getByText('2').click();
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('click next page (») should call onPageChange with next page', () => {
    const onPageChange = vi.fn();

    const { getByText } = render(
      <Pagination currentPage={9} totalPages={10} onPageChange={onPageChange} />
    );

    getByText('»').click();
    expect(onPageChange).toHaveBeenCalledWith(10);
  });
  it('click next page (›) should call onPageChange with next page', () => {
    const onPageChange = vi.fn();

    const { getByText } = render(
      <Pagination currentPage={9} totalPages={10} onPageChange={onPageChange} />
    );

    getByText('›').click();
    expect(onPageChange).toHaveBeenCalledWith(10);
  });
  it('must have class "cursor-not-allowed" on last page', () => {
    const { getByLabelText } = render(
      <Pagination currentPage={10} totalPages={10} onPageChange={vi.fn()} />
    );

    const nextButton = getByLabelText('Next page');
    expect(nextButton).toHaveClass('cursor-not-allowed');
    expect(nextButton).toBeDisabled();
  });

  it('must have class "cursor-pointer" if NOT last page', () => {
    const { getByLabelText } = render(
      <Pagination currentPage={5} totalPages={10} onPageChange={vi.fn()} />
    );

    const nextButton = getByLabelText('Next page');
    expect(nextButton).toHaveClass('cursor-pointer');
    expect(nextButton).not.toBeDisabled();
  });
});
