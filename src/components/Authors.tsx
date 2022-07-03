import { IAuthor, Props } from '../types';

type AuthorsProps = Props;

const Authors = (props: AuthorsProps) => {
  if (!props.show) {
    return null
  }
  const authors: IAuthor[] | undefined = undefined

  if(authors === undefined) return null;

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
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Authors
