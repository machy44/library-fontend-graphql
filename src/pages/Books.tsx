import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';
import { IBook } from '../types';
import { Card } from '../ui/Card';
import { Title } from '../ui/Text';

const Books: React.FC = () => {
  const { data } = useQuery<{ allBooks: IBook[] }>(ALL_BOOKS);

  return (
    <Card>
      <Title>books</Title>

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
    </Card>
  );
};

export default Books;
