import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

export const renderWithApollo = (children: React.ReactNode, mocks: any) => {
  return render(
    <MockedProvider mocks={mocks} addTypename={false}>
      {children}
    </MockedProvider>,
  );
};

export const mockedBooksData = [
  {
    title: 'Clean Code',
    published: 2008,
    author: {
      name: 'Robert Martin',
      id: '636a164817864dfc64cee279',
      born: 1952,
      bookCount: 2,
      __typename: 'Author',
    },
    genres: ['refactoring'],
    id: '636a164917864dfc64cee27b',
    __typename: 'Book',
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: {
      name: 'Robert Martin',
      id: '636a164817864dfc64cee279',
      born: 1952,
      bookCount: 2,
      __typename: 'Author',
    },
    genres: ['agile', 'patterns', 'design'],
    id: '636a164917864dfc64cee27f',
    __typename: 'Book',
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: {
      name: 'Martin Fowler',
      id: '636a164917864dfc64cee283',
      born: 1963,
      bookCount: 1,
      __typename: 'Author',
    },
    genres: ['refactoring'],
    id: '636a164917864dfc64cee285',
    __typename: 'Book',
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: {
      name: 'Fyodor Dostoevsky',
      id: '636a164917864dfc64cee289',
      born: 1821,
      bookCount: 2,
      __typename: 'Author',
    },
    genres: ['classic', 'crime'],
    id: '636a164917864dfc64cee28b',
    __typename: 'Book',
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: {
      name: 'Joshua Kerievsky',
      id: '636a164917864dfc64cee28f',
      born: null,
      bookCount: 1,
      __typename: 'Author',
    },
    genres: ['refactoring', 'patterns'],
    id: '636a164917864dfc64cee291',
    __typename: 'Book',
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: {
      name: 'Sandi Metz',
      id: '636a164917864dfc64cee295',
      born: null,
      bookCount: 1,
      __typename: 'Author',
    },
    genres: ['refactoring', 'design'],
    id: '636a164917864dfc64cee297',
    __typename: 'Book',
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: {
      name: 'Fyodor Dostoevsky',
      id: '636a164917864dfc64cee289',
      born: 1821,
      bookCount: 2,
      __typename: 'Author',
    },
    genres: ['classic', 'revolution'],
    id: '636a164a17864dfc64cee29b',
    __typename: 'Book',
  },
];

export const mockedAuthorsData = [
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
