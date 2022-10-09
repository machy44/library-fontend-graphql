import { gql } from '@apollo/client';
import { CORE_BOOK_FIELDS } from './fragments';

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...CoreBookFields
    }
  }
  ${CORE_BOOK_FIELDS}
`;
