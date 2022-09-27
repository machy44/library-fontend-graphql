import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
  query allAuthors {
    allAuthors {
      name
      id
      born
      bookCount
    }
  }
`;

export const CORE_BOOK_FIELDS = gql`
  fragment CoreBookFields on Book {
    title
    published
    author {
      name
      id
      born
      bookCount
    }
    genres
    id
  }
`;

export const BOOKS_BY_GENRE = gql`
  ${CORE_BOOK_FIELDS}
  query BooksByGenre($genre: String) {
    allBooks(genre: $genre) {
      ...CoreBookFields
    }
  }
`;

export const ALL_BOOKS = gql`
  ${CORE_BOOK_FIELDS}
  query AllBooks {
    allBooks {
      ...CoreBookFields
    }
  }
`;

export const USER_INFO = gql`
  query Me {
    me {
      username
      favoriteGenre
      id
    }
  }
`;
