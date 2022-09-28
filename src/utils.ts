import { IBook } from './types';

export const unique = (genres: IBook['genres']) => {
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
