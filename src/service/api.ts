import { useMutation, useQuery } from '@apollo/client';
import { EDIT_AUTHOR, ADD_BOOK, LOGIN } from './mutations';
import { ALL_AUTHORS, ALL_BOOKS, BOOKS_BY_GENRE } from './queries';
import { IAuthor, IBook, IUser, UnArray } from '../types';

export type EditAuthorData = Pick<IAuthor, 'name' | 'born'>;

export const useEditAuthor = () => {
  const [editAuthor] = useMutation<EditAuthorData>(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  return { editAuthor };
};

export const useGetAllAuthors = () => {
  const { data, loading, error } = useQuery<{ allAuthors: IAuthor[] }>(ALL_AUTHORS);

  return {
    data,
    loading,
    error,
  };
};

export const useGetAllBooks = () => {
  const { data, error } = useQuery<{ allBooks: IBook[] }>(ALL_BOOKS);

  return {
    data,
    error,
  };
};

export const useGenreBooks = (genre: string | undefined) => {
  const { data, error } = useQuery<{ allBooks: IBook[] }>(BOOKS_BY_GENRE, {
    variables: { genre },
    skip: !genre,
  });

  return {
    data,
    error,
  };
};

export type AddNewBookType = Omit<IBook, 'id'> & {
  genre: UnArray<IBook['genres']>;
};

export const useAddNewBook = () => {
  const [addBook] = useMutation<AddNewBookType>(ADD_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
  });
  return { addBook };
};

export const useLoginUser = () => {
  const [login, result] = useMutation<{ login: { value: string } }, IUser>(LOGIN);

  return {
    login,
    result,
  };
};
