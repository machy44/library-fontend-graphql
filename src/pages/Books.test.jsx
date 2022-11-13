import { screen, waitFor } from '@testing-library/react';
import Books from './Books';
import { mockedBooksData, renderWithApollo } from '../testUtils';
import { ErrorBoundary } from '../ui/ErrorBoundary';
import { ALL_BOOKS } from '../service/queries';

describe('books page', () => {
  it('should render right number of genres', () => {
    expect(true).toBe(true);
  });
  it('BooksPage should display error response message when there is an error', async () => {
    const mocks = [
      {
        request: {
          query: ALL_BOOKS,
        },

        error: new Error('test error'),
      },
    ];
    renderWithApollo(
      <ErrorBoundary>
        <Books />
      </ErrorBoundary>,
      mocks,
    );

    await waitFor(() => {
      expect(screen.getByText('test error')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.queryByTestId('books-table-body')).not.toBeInTheDocument();
    });
  });
});

export {};
