import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IBook, UnArray } from '../types';
import { Button } from '../ui/Button';
import { Label } from '../ui/Label';
import { Text } from '../ui/Text';
import * as yup from 'yup';
import get from 'lodash.get';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@apollo/client';
import { Form } from '../ui/Form';
import { ADD_BOOK } from '../mutations';

const schemaValidation = yup.object().shape({
  title: yup.string().required('Title is required'),
  author: yup.string().min(3, 'Minimum length should be 3').required('Author is required'),
  published: yup
    .number()
    .min(4, 'Must be 4 characters long')
    .required('Published is required')
    .positive()
    .integer(),
  genres: yup.array().min(1).of(yup.string()),
});

type MyInputTypes = Omit<IBook, 'id'> & {
  genre: UnArray<IBook['genres']>;
};

const NewBook: React.FC = (props) => {
  const [addBook] = useMutation<MyInputTypes>(ADD_BOOK);

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<MyInputTypes>({
    resolver: yupResolver(schemaValidation),
    defaultValues: {
      genre: '',
      genres: [],
    },
  });

  const submit = (data: MyInputTypes) => {
    console.log({ data });
    const { title, published, author, genres } = data;
    addBook({
      variables: { title, published, author, genres },
    });
    reset();
  };

  const addGenre = () => {
    const newValue = [...getValues('genres'), getValues('genre')];
    setValue('genres', newValue);
    setValue('genre', '');
  };

  watch('genres');

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
          error={get(errors, 'genres.message') || null}
        />
        <Button onClick={addGenre} type="button">
          add genre
        </Button>
      </div>
      <div className="my-4">
        <Text {...register('genres')}>
          genres:
          {getValues('genres')?.join(' ')}
        </Text>
      </div>
      <Button type="submit" className="mt-4 w-full">
        create book
      </Button>
    </Form>
  );
};

export default NewBook;
