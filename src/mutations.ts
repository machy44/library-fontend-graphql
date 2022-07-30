import { gql } from '@apollo/client';

export const ADD_BOOK = gql`
  mutation AddBook($title: String!, $published: Int!, $genres: [String!]!, $author: String!) {
    addBook(title: $title, published: $published, genres: $genres, author: $author) {
      title
      published
      author
      genres
    }
  }
`;
