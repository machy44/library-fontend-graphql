import { IAuthor, Props } from '../types';
import { ALL_AUTHORS } from '../queries';
import { useQuery } from '@apollo/client';
import { Spinner } from '../ui/Spinner';
import { Title } from '../ui/Text';

type AuthorsProps = Props;

const Authors = (props: AuthorsProps) => {
  const { data, loading } = useQuery<{ allAuthors: IAuthor[] }>(ALL_AUTHORS);

  if (loading) return <Spinner />;

  if (data?.allAuthors === undefined) return null;

  return (
    <div>
      <Title>authors</Title>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {data.allAuthors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Authors;
