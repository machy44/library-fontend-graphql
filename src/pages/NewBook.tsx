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
import { ALL_AUTHORS, ALL_BOOKS } from '../queries';

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
  const [addBook] = useMutation<MyInputTypes>(ADD_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
  });

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
        data-testid="title"
        {...register('title')}
        placeholder="Title"
        error={get(errors, 'title.message') || null}
      />
      <Label htmlFor="author" className="mt-2">
        Author
      </Label>
      <Form.Input
        data-testid="author"
        placeholder="Author"
        {...register('author')}
        error={get(errors, 'author.message') || null}
      />
      <Label htmlFor="published" className="mt-2">
        Published
      </Label>
      <Form.Input
        data-testid="published"
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
          data-testid="genre"
          id="genre"
          placeholder="Genre"
          className="col-span-2"
          {...register('genre')}
          error={get(errors, 'genres.message') || null}
        />
        <Button onClick={addGenre} type="button" data-testid="add-genre-button">
          add genre
        </Button>
      </div>
      <div className="my-4">
        <Text {...register('genres')} data-testid="genres">
          genres:
          {getValues('genres')?.join(' ')}
        </Text>
      </div>
      <Button type="submit" className="mt-4 w-full" data-testid="create-book-submit">
        create book
      </Button>
    </Form>
  );
};

export default NewBook;
