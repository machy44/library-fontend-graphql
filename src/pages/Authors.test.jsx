import { screen, waitFor } from '@testing-library/react';
import { ALL_AUTHORS } from '../service/queries';
import Authors from './Authors';
import { ErrorBoundary } from '../ui/ErrorBoundary';
import { renderWithApollo, mockedAuthorsData } from '../testUtils';

const defaultMocks = [
  {
    request: {
      query: ALL_AUTHORS,
    },
    result: {
      data: {
        allAuthors: mockedAuthorsData,
      },
    },
  },
];

describe('authors page', () => {
  it('table should be rendered when data exists', async () => {
    renderWithApollo(<Authors />, defaultMocks);

    await waitFor(() => {
      expect(screen.getByTestId('author-table-body')).toBeInTheDocument();
    });
  });
  it('should render two authors', async () => {
    renderWithApollo(<Authors />, defaultMocks);

    await waitFor(() => {
      expect(screen.getAllByTestId(/author-row-/).length).toBe(2);
    });
  });
  it('should render loading state', async () => {
    renderWithApollo(<Authors />, defaultMocks);

    expect(screen.getByTestId('spinner')).toBeTruthy();
  });

  it('should return null when authors dont exist', async () => {
    const mocks = [
      {
        request: {
          query: ALL_AUTHORS,
        },
        result: {
          data: {
            allAuthors: undefined,
          },
        },
      },
    ];
    renderWithApollo(<Authors />, mocks);

    await waitFor(() => {
      expect(screen.queryByTestId('author-table-body')).not.toBeInTheDocument();
    });
  });

  it('should display error response message when there is an error', async () => {
    const mocks = [
      {
        request: {
          query: ALL_AUTHORS,
        },

        error: new Error('test error'),
      },
    ];

    renderWithApollo(
      <ErrorBoundary>
        <Authors />
      </ErrorBoundary>,
      mocks,
    );

    await waitFor(() => {
      expect(screen.getByText('test error')).toBeInTheDocument();
    });
  });
});

export {};
