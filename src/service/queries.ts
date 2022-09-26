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

export const BOOKS_BY_GENRE = gql`
  query BooksByGenre($genre: String) {
    allBooks(genre: $genre) {
      title
      published
      author {
        name
        id
        born
        bookCount
      }
      id
    }
  }
`;

export const ALL_BOOKS = gql`
  query allBooks {
    allBooks {
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
