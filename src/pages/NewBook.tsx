import { useState } from 'react';
import { IBook } from '../types';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';

const NewBook: React.FC = (props) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState<IBook['genres']>([]);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log('add book...');

    setTitle('');
    setPublished('');
    setAuthor('');
    setGenres([]);
    setGenre('');
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre('');
  };

  return (
    <Card>
      <form onSubmit={submit}>
        <Label htmlFor="username">Username</Label>
        <Input id="username" placeholder="Username" />
        <Label htmlFor="title">Title</Label>
        <Input id="title" placeholder="Title" />
        <Label htmlFor="published">Published</Label>
        <Input id="published" placeholder="Published" type="number" />

        <div>
          title
          <input value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author
          <input value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input value={genre} onChange={({ target }) => setGenre(target.value)} />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </Card>
  );
};

export default NewBook;
