import { gql } from '@apollo/client';
import { IBook } from '../types';
import { CORE_BOOK_FIELDS } from './fragments';

export type AddBookMutation = {
  addBook: IBook;
};

export const ADD_BOOK = gql`
  ${CORE_BOOK_FIELDS}
  mutation addBook($title: String!, $published: Int!, $genres: [String!]!, $author: String!) {
    addBook(title: $title, published: $published, genres: $genres, author: $author) {
      ...CoreBookFields
    }
  }
`;

export const EDIT_AUTHOR = gql`
  mutation EditAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      id
    }
  }
`;

export const LOGIN = gql`
  mutation Mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;
