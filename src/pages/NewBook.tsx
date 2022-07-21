import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IBook } from '../types';
import { Button } from '../ui/Button';
import { Label } from '../ui/Label';
import { Text } from '../ui/Text';
import * as yup from 'yup';
import get from 'lodash.get';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from '../ui/Form';

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
  genre: string;
};

const NewBook: React.FC = (props) => {
  const [genres, setGenres] = useState<IBook['genres']>([]);
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    reset,
    formState: { errors },
  } = useForm<MyInputTypes>({
    resolver: yupResolver(schemaValidation),
  });

  console.log('watch', watch('genre'));

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
    console.log({ data }, genres);
    reset();
    setGenres([]);
  };

  const addGenre = () => {
    setGenres(genres.concat(getValues('genre')));
    reset({
      genre: '',
    });
  };

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <Label htmlFor="title" className="mt-2">
        Title
      </Label>

      <Form.Input
        {...register('title')}
        placeholder="Title"
        error={get(errors, 'title.message') || null}
      />
      <Label htmlFor="author" className="mt-2">
        Author
      </Label>
      <Form.Input
        placeholder="Author"
        {...register('author')}
        error={get(errors, 'author.message') || null}
      />
      <Label htmlFor="published" className="mt-2">
        Published
      </Label>
      <Form.Input
        placeholder="Published"
        {...register('published')}
        type="number"
        error={get(errors, 'published.message') || null}
      />
      <Label htmlFor="genre" className="mt-2">
        Genre
      </Label>
      <div className="grid gap-x-8 grid-cols-3 box-content">
        <Form.Input
          id="genre"
          placeholder="Genre"
          className="col-span-2"
          {...register('genre')}
          error={null}
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
    </Form>
  );
};

export default NewBook;
