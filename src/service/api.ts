import { useMutation, useQuery } from '@apollo/client';
import { EDIT_AUTHOR, ADD_BOOK, LOGIN, AddBookMutation } from './mutations';
import { ALL_AUTHORS, ALL_BOOKS, BooksQuery, AuthorsQuery } from './queries';
import { IAuthor, IBook, IUser, UnArray } from '../types';

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
    update: (cache, response, options) => {
      cache.updateQuery<{ allBooks: (IBook | undefined)[] }>({ query: ALL_BOOKS }, (data) => {
        if (data?.allBooks) {
          return { allBooks: [...data.allBooks, response?.data?.addBook] };
        }
      });
      console.log({ response });
      cache.updateQuery<AuthorsQuery>({ query: ALL_AUTHORS }, (data) => {
        if (data && response.data) {
          return { allAuthors: [...data.allAuthors, response.data.addBook.author] };
        }
      });

      response.data?.addBook.genres.forEach((genre) => {
        cache.updateQuery({ query: ALL_BOOKS, variables: { genre } }, (data) => {
          if (data && response.data) {
            return { allBooks: [...data.allBooks, response.data.addBook] };
          }
        });
      });
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
