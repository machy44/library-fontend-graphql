import {
  ApolloCache,
  DefaultContext,
  MutationUpdaterFunction,
  OperationVariables,
} from '@apollo/client';
import { AddBookMutation } from './service/mutations';
import { ALL_BOOKS, AuthorsQuery, ALL_AUTHORS } from './service/queries';
import { IBook } from './types';

export const uniqueGenres = (genres: IBook['genres']) => {
  const uniques: Record<string, string> = {};
  genres.forEach((genre) => {
    if (!uniques[genre]) {
      uniques[genre] = genre;
    }
  });
  return Object.keys(uniques);
};

export const groupGenres = (books: IBook[]) => {
  return books.reduce((genres: IBook['genres'], book) => {
    return [...genres, ...book.genres];
  }, []);
};

const unique = (field: string) => (a: any) => {
  let seen = new Set();
  return a.filter((item: any) => {
    let k = item[field];
    return seen.has(k) ? false : seen.add(k);
  });
};

const uniqueByTitle = unique('title');

const uniqueByName = unique('name');

export const updateAddBookCache = (cache: ApolloCache<object>, bookData: IBook) => {
  cache.updateQuery<{ allBooks: (IBook | undefined)[] }>({ query: ALL_BOOKS }, (data) => {
    if (data?.allBooks) {
      return { allBooks: uniqueByTitle([...data.allBooks, bookData]) };
    }
  });

  cache.updateQuery<AuthorsQuery>({ query: ALL_AUTHORS }, (data) => {
    if (data && bookData) {
      return { allAuthors: uniqueByName([...data.allAuthors, bookData.author]) };
    }
  });

  bookData.genres.forEach((genre) => {
    cache.updateQuery({ query: ALL_BOOKS, variables: { genre } }, (data) => {
      if (data && bookData) {
        return { allBooks: uniqueByTitle([...data.allBooks, bookData]) };
      }
    });
  });
};
