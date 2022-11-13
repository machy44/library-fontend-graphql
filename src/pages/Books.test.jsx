import { screen, waitFor } from '@testing-library/react';
import Books from './Books';
import { mockedBooksData, renderWithApollo } from '../testUtils';
import { ErrorBoundary } from '../ui/ErrorBoundary';
import { ALL_BOOKS } from '../service/queries';

const defaultMocks = [
  {
    request: {
      query: ALL_BOOKS,
    },
    result: {
      data: {
        allBooks: mockedBooksData,
      },
    },
  },
];

describe('books page', () => {
  it('should render books table and genre buttons', async () => {
    renderWithApollo(<Books />, defaultMocks);
    expect(await screen.findByTestId('books-table-body')).toBeInTheDocument();
    expect(await screen.findByTestId('genre-buttons')).toBeInTheDocument();
  });
  it('should render right number of genre buttons and table rows', async () => {
    renderWithApollo(<Books />, defaultMocks);

    await waitFor(() => {
      expect(screen.getAllByTestId(/genre-button-/).length).toBe(7);
    });
    await waitFor(() => {
      expect(screen.getAllByTestId(/book-row-/).length).toBe(7);
    });
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
