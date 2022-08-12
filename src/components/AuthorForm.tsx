import { useForm } from 'react-hook-form';
import { get } from 'react-hook-form';
import { Button } from '../ui/Button';
import { Form } from '../ui/Form';
import { Label } from '../ui/Label';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { EditAuthorData, useEditAuthor, useGetAllAuthors } from '../service/api';

const schemaValidation = yup.object().shape({
  name: yup.string().required('Name is required'),
  born: yup
    .number()
    .test(
      'Is positive?',
      'The number must be greater than 0',
      (value) => value !== undefined && value > 0,
    )
    .min(4, 'Must be 4 characters long')
    .required('born is required')
    .integer(),
});

export const AuthorForm: React.FC = () => {
  const { editAuthor } = useEditAuthor();
  const { data } = useGetAllAuthors();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditAuthorData>({
    resolver: yupResolver(schemaValidation),
  });

  const submit = (data: EditAuthorData) => {
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
      {/* <ReactSelect options={} /> */}
      <Label htmlFor="born" className="mt-2">
        Born
      </Label>
      <Form.Input
        data-testid="born"
        placeholder="Born"
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
