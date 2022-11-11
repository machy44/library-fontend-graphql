import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { ALL_AUTHORS } from '../service/queries';
import Authors from './Authors';
import { ErrorBoundary } from '../ui/ErrorBoundary';

const mockedData = [
  {
    name: 'Robert Martin',
    id: '6368c4e6f1f34b35a9516a79',
    born: 1952,
    bookCount: 2,
    __typename: 'Author',
  },
  {
    name: 'Martin Fowler',
    id: '6368c4e6f1f34b35a9516a83',
    born: 1963,
    bookCount: 1,
    __typename: 'Author',
  },
];

const defaultMocks = [
  {
    request: {
      query: ALL_AUTHORS,
    },
    result: {
      data: {
        allAuthors: mockedData,
      },
    },
  },
];

const renderWithApollo = (children, mocks = defaultMocks) => {
  return render(
    <MockedProvider mocks={mocks} addTypename={false}>
      {children}
    </MockedProvider>,
  );
};

describe('authors page', () => {
  it('table should be rendered when data exists', async () => {
    renderWithApollo(<Authors />);

    await waitFor(() => {
      expect(screen.getByTestId('author-table-body')).toBeInTheDocument();
    });
  });
  it('should render two authors', async () => {
    renderWithApollo(<Authors />);

    await waitFor(() => {
      expect(screen.getAllByTestId(/author-row-/).length).toBe(2);
    });
  });
  it('should render loading state', async () => {
    renderWithApollo(<Authors />);

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
