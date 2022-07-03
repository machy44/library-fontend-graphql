import { IAuthor, Props } from '../types';
import { ALL_AUTHORS } from '../queries';
import { useQuery } from '@apollo/client';
import { Spinner } from '../ui/Spinner';

type AuthorsProps = Props;

const Authors = (props: AuthorsProps) => {
  const { data, loading } = useQuery<{ allAuthors: IAuthor[] }>(ALL_AUTHORS);

  if (!props.show) {
    return null;
  }

  if (loading) return <Spinner />;

  if (data?.allAuthors === undefined) return null;

  return (
    <div>
      <h2>authors</h2>
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
