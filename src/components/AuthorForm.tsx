import { useForm, Controller } from 'react-hook-form';
import { get } from 'react-hook-form';
import { Button } from '../ui/Button';
import { Form } from '../ui/Form';
import { Label } from '../ui/Label';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { EditAuthorData, useEditAuthor } from '../service/api';
import { convertDataToOptions } from '../ui/select/ReactSelect';
import { IAuthor } from '../types';
import Select from 'react-select';
import { Error } from '../ui/Error';

const schemaValidation = yup.object().shape({
  name: yup.string().required('Name is required'),
  born: yup
    .number()
    .min(4, 'Must be 4 characters long')
    .test(
      'Is positive?',
      'The number must be greater than 0',
      (value) => value !== undefined && value > 0,
    )
    .required('born is required')
    .integer(),
});

export const AuthorForm: React.FC<{ data: IAuthor[] }> = ({ data }) => {
  const { editAuthor } = useEditAuthor();

  const options = convertDataToOptions(data);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm<EditAuthorData>({
    resolver: yupResolver(schemaValidation),
    defaultValues: {
      name: options[1].value,
    },
  });

  const submit = (data: EditAuthorData) => {
    console.log({ data });
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
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => {
          console.log({ value });
          return (
            <Select
              options={options}
              onChange={(e) => {
                if (e) {
                  onChange(e.value);
                }
              }}
              value={options.filter((option) => value?.includes(option.value))}
              placeholder="Select author..."
            />
          );
        }}
      />
      <Error error={get(errors, 'name.message') || null} />
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
