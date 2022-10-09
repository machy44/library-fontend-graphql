import { useMutation, useQuery } from '@apollo/client';
import { EDIT_AUTHOR, ADD_BOOK, LOGIN, AddBookMutation } from './mutations';
import { ALL_AUTHORS, ALL_BOOKS, BooksQuery, AuthorsQuery } from './queries';
import { IAuthor, IBook, IUser, UnArray } from '../types';
import { updateAddBookCache } from '../utils';

export type EditAuthorData = Pick<IAuthor, 'name' | 'born'>;

export const useEditAuthor = () => {
  const [editAuthor] = useMutation<EditAuthorData>(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  return { editAuthor };
};

export const useGetAllAuthors = () => {
  const { data, loading, error } = useQuery<AuthorsQuery>(ALL_AUTHORS);

  return {
    data,
    loading,
    error,
  };
};

export const useGetAllBooks = () => {
  const { data, error } = useQuery<BooksQuery>(ALL_BOOKS);

  return {
    data,
    error,
  };
};

export const useGenreBooks = (genre: string | undefined) => {
  const { data, error } = useQuery<BooksQuery>(ALL_BOOKS, {
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
  const [addBook] = useMutation<AddBookMutation>(ADD_BOOK, {
    update: (cache, response) => {
      if (response.data?.addBook) {
        updateAddBookCache(cache, response.data?.addBook);
      }
    },
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
