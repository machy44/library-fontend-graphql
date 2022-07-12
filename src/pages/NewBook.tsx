import { useState } from 'react';
import { IBook } from '../types';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Text } from '../ui/Text';

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
        <Label htmlFor="title" className="mt-2">
          Title
        </Label>
        <Input
          id="title"
          placeholder="Title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <Label htmlFor="author" className="mt-2">
          Author
        </Label>
        <Input
          id="author"
          placeholder="Author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <Label htmlFor="published" className="mt-2">
          Published
        </Label>
        <Input
          id="published"
          placeholder="Published"
          type="number"
          value={published}
          onChange={({ target }) => setPublished(target.value)}
        />
        <Label htmlFor="genre" className="mt-2">
          Genre
        </Label>
        <div className="grid gap-x-8 grid-cols-3 box-content">
          <Input
            value={genre}
            id="genre"
            placeholder="Genre"
            onChange={({ target }) => setGenre(target.value)}
            className="col-span-2"
          />
          <Button onClick={addGenre} type="button">
            add genre
          </Button>
        </div>
        <div className="my-4">
          <Text>genres: {genres.join(' ')}</Text>
        </div>
        <Button type="submit" className="mt-4 w-full">
          create book
        </Button>
      </form>
    </Card>
  );
};

export default NewBook;
