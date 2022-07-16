import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IBook } from '../types';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Text } from '../ui/Text';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schemaValidation = yup
  .object()
  .shape({
    title: yup.string().required('Title is required'),
    author: yup.string().min(3, 'Minimum length should be 3').required('Author is required'),
    published: yup.number().min(4, 'must be 4 characters long').required('Published is required'),
  })
  .required();

type MyInputTypes = {
  title: string;
  author: string;
  published: string;
};

const NewBook: React.FC = (props) => {
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState<IBook['genres']>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MyInputTypes>({
    resolver: yupResolver(schemaValidation),
  });

  // const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   console.log('add book...');

  //   setTitle('');
  //   setPublished('');
  //   setAuthor('');
  //   setGenres([]);
  //   setGenre('');
  // };

  const submit = (data: any) => {
    console.log(data);
  };

  console.log(errors);

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre('');
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(submit)}>
        <Label htmlFor="title" className="mt-2">
          Title
        </Label>

        <Input {...register('title')} placeholder="Title" error={errors.title?.message || null} />
        <Label htmlFor="author" className="mt-2">
          Author
        </Label>
        <Input
          placeholder="Author"
          {...register('author')}
          error={errors.author?.message || null}
        />
        <Label htmlFor="published" className="mt-2">
          Published
        </Label>
        <Input
          placeholder="Published"
          {...register('published')}
          type="number"
          error={errors.published?.message || null}
        />
        {/* <Label htmlFor="genre" className="mt-2">
          Genre
        </Label> */}
        {/* <div className="grid gap-x-8 grid-cols-3 box-content">
          <Input
            id="genre"
            placeholder="Genre"
            className="col-span-2"
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <Button onClick={addGenre} type="button">
            add genre
          </Button>
        </div>
        <div className="my-4">
          <Text>genres: {genres.join(' ')}</Text>
        </div> */}
        <Button type="submit" className="mt-4 w-full">
          create book
        </Button>
      </form>
    </Card>
  );
};

export default NewBook;
