import { useMutation, useQuery } from '@apollo/client';
import { EDIT_AUTHOR, ADD_BOOK } from './mutations';
import { ALL_AUTHORS, ALL_BOOKS } from './queries';
import { IAuthor, IBook, UnArray } from '../types';

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

export type AddNewBookType = Omit<IBook, 'id'> & {
  genre: UnArray<IBook['genres']>;
};

export const useAddNewBook = () => {
  const [addBook] = useMutation<AddNewBookType>(ADD_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
  });
  return { addBook };
};
