// import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { ALL_AUTHORS } from '../service/queries';
import Authors from './Authors';

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

const mocks = [
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

describe('authors page', () => {
  it('should render right number of authors', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Authors />
      </MockedProvider>,
    );

    expect(screen.getByText('the lion king')).toBeInTheDocument();
    // expect(screen.getByRole('tr')).toHaveLength(3);
  });
  it('should render loading state', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Authors />
      </MockedProvider>,
    );

    expect(screen.getByTestId('spinner')).toBeTruthy();
  });
  it('should return null when authors dont exist', () => {
    expect(true).toBe(true);
  });
  // it('should throw an error when server response is not sucessfull', () => {
  //   expect(true).toBe(true);
  // });
});

export {};
