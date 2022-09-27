import { gql } from '@apollo/client';
import { IAuthor, IBook } from '../types';
import { CORE_BOOK_FIELDS } from './fragments';

export type AuthorsQuery = {
  allAuthors: IAuthor[];
};

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

export type BooksQuery = {
  allBooks: IBook[];
};

export const ALL_BOOKS = gql`
  ${CORE_BOOK_FIELDS}
  query AllBooks($genre: String) {
    allBooks(genre: $genre) {
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
