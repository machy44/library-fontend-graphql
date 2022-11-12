import { mockedBooksData } from '../testUtils';
import { BooksTable } from './BooksTable';
import { render, screen } from '@testing-library/react';

describe('BooksTable', () => {
  it('should render right number of books', () => {
    render(<BooksTable data={mockedBooksData} />);
    expect(screen.getByTestId('books-table-body')).toBeInTheDocument();
    expect(screen.getAllByTestId(/book-row-/).length).toBe(7);
  });

  it('should not render table when there is no data', () => {
    render(<BooksTable data={undefined} />);
    expect(screen.queryByText('books')).not.toBeInTheDocument();
    expect(screen.queryByTestId('books-table-body')).not.toBeInTheDocument();
  });
  it('tableTitle should be set on default if it is undefined', () => {
    render(<BooksTable data={mockedBooksData} />);
    expect(screen.getByText('books')).toBeInTheDocument();
  });
  it('should render right table title', () => {
    render(<BooksTable data={mockedBooksData} tableTitle="refactoring" />);
    expect(screen.getByText('refactoring')).toBeInTheDocument();
    expect(screen.queryByText('books')).not.toBeInTheDocument();
  });
});

export {};
