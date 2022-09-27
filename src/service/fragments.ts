import { gql } from '@apollo/client';

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
