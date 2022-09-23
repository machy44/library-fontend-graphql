import { useEffect } from 'react';
import * as yup from 'yup';
import { Button } from '../ui/Button';
import { Form } from '../ui/Form';
import { Label } from '../ui/Label';
import { useAuth } from '../auth';
import { useLoginUser } from '../service/api';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { IUser } from '../types';
import get from 'lodash.get';

const schemaValidation = yup.object().shape({
  username: yup.string().required('username is required'),
  password: yup.string().required('password is required'),
});

export const LoginForm = () => {
  const { setToken } = useAuth();
  const { login, result } = useLoginUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IUser>({
    resolver: yupResolver(schemaValidation),
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
    }
  }, [result.data]); // eslint-disable-line

  const submit = (data: IUser) => {
    const { username, password } = data;
    login({
      variables: { username, password },
    });
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <Label htmlFor="name" className="mt-2">
        username
      </Label>
      <Form.Input
        data-testid="username"
        placeholder="Username"
        {...register('username')}
        error={get(errors, 'username.message') || null}
      />
      <Label htmlFor="name" className="mt-2">
        password
      </Label>
      <Form.Input
        type="password"
        placeholder="Password"
        {...register('password')}
        error={get(errors, 'password.message') || null}
      />
      <Button type="submit" className="mt-4 w-full" data-testid="update-author-submit">
        login
      </Button>
    </Form>
  );
};
