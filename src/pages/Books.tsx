import { useLazyQuery } from '@apollo/client';
import { BooksTable } from '../components/BooksTable';
import { useGetAllBooks } from '../service/api';
import { BOOKS_BY_GENRE } from '../service/queries';
import { IBook } from '../types';
import { Button } from '../ui/Button';

import { Card } from '../ui/Card';
import { unique } from '../utils';

const groupGenres = (books: IBook[]) => {
  return books.reduce((genres: IBook['genres'], book) => {
    return [...genres, ...book.genres];
  }, []);
};

const Books: React.FC = () => {
  const { data, error } = useGetAllBooks();

  const [loadGenre, { called, data: genreBooks }] = useLazyQuery<{ allBooks: IBook[] }>(
    BOOKS_BY_GENRE,
  );

  if (error) {
    throw new Error(error.message);
  }

  return (
    <Card className="space-y-4">
      <BooksTable data={called ? genreBooks?.allBooks : data?.allBooks} />

      <Card className="space-x-4 space-y-4">
        {data?.allBooks.length
          ? unique(groupGenres(data.allBooks)).map((genre) => {
              return (
                <Button
                  onClick={() => {
                    loadGenre({ variables: { genre } });
                  }}>
                  {genre}
                </Button>
              );
            })
          : null}
      </Card>
    </Card>
  );
};

export default Books;
