import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';
import { IBook, Props } from '../types';

type BooksProps = Props;

const Books = (props: BooksProps) => {
  const { data } = useQuery<{ allBooks: IBook[] }>(ALL_BOOKS);

  const books: IBook[] = [];

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data?.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
