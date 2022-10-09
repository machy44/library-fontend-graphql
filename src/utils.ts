import { ApolloCache } from '@apollo/client';
import { ALL_BOOKS, AuthorsQuery, ALL_AUTHORS } from './service/queries';
import { IAuthor, IBook } from './types';

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

const unique =
  <T extends {}, K extends keyof T>(field: K) =>
  (a: T[]) => {
    let seen = new Set();
    return a.filter((item: T) => {
      let k = item[field];
      return seen.has(k) ? false : seen.add(k);
    });
  };

const uniqueByTitle = unique<IBook, keyof IBook>('title');

const uniqueByName = unique<IAuthor, keyof IAuthor>('name');

export const updateAddBookCache = (cache: ApolloCache<object>, bookData: IBook) => {
  cache.updateQuery<{ allBooks: IBook[] }>({ query: ALL_BOOKS }, (data) => {
    if (data?.allBooks && bookData) {
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
