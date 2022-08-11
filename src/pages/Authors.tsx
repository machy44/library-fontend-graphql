import { useForm } from 'react-hook-form';
import { IAuthor } from '../types';
import { ALL_AUTHORS } from '../queries';
import { EDIT_AUTHOR } from '../mutations';
import { useMutation, useQuery } from '@apollo/client';
import { Spinner } from '../ui/Spinner';
import { Title } from '../ui/Text';
import { Card } from '../ui/Card';
import { Table } from '../ui/Table';
import { get } from 'react-hook-form';
import { Button } from '../ui/Button';
import { Form } from '../ui/Form';
import { Label } from '../ui/Label';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const { Thead, Tr, Th, Tbody, Td } = Table;

const schemaValidation = yup.object().shape({
  name: yup.string().required('Name is required'),
  born: yup
    .number()
    .min(4, 'Must be 4 characters long')
    .required('born is required')
    .positive()
    .integer(),
});

type AuthorUpdate = Pick<IAuthor, 'name' | 'born'>;

const AuthorForm: React.FC = () => {
  const [editAuthor] = useMutation<AuthorUpdate>(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuthorUpdate>({
    resolver: yupResolver(schemaValidation),
  });

  const submit = (data: AuthorUpdate) => {
    const { name, born } = data;
    editAuthor({
      variables: { name, setBornTo: born },
    });
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <Label htmlFor="name" className="mt-2">
        Name
      </Label>
      <Form.Input
        data-testid="name"
        {...register('name')}
        placeholder="Name"
        error={get(errors, 'name.message') || null}
      />
      <Label htmlFor="born" className="mt-2">
        Born
      </Label>
      <Form.Input
        data-testid="born"
        placeholder="born"
        {...register('born')}
        type="number"
        error={get(errors, 'born.message') || null}
      />
      <Button type="submit" className="mt-4 w-full" data-testid="update-author-submit">
        update author
      </Button>
    </Form>
  );
};

const Authors: React.FC = () => {
  const { data, loading, error } = useQuery<{ allAuthors: IAuthor[] }>(ALL_AUTHORS);

  if (loading) return <Spinner />;
  if (error) {
    throw new Error(error.message);
  }

  if (data?.allAuthors === undefined) return null;

  return (
    <>
      <Card className="grid gap-y-8">
        <Title className="text-center">authors</Title>
        <Table>
          <Thead>
            <Tr>
              <Th />
              <Th>born</Th>
              <Th>books</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.allAuthors.map((a) => (
              <Tr key={a.id}>
                <Td>{a.name}</Td>
                <Td>{a.born}</Td>
                <Td>{a.bookCount}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Card>
      <AuthorForm />
    </>
  );
};

export default Authors;
