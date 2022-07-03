import { IAuthor, Props } from '../types';
import { ALL_AUTHORS } from '../queries';
import { useQuery } from '@apollo/client';

type AuthorsProps = Props;

const Authors = (props: AuthorsProps) => {
  const { data } = useQuery<IAuthor[]>(ALL_AUTHORS);

  if (!props.show) {
    return null;
  }

  // @ts-ignore
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
          {/* @ts-ignore */}
          {data?.allAuthors.map((a) => (
            <tr key={a.name}>
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
