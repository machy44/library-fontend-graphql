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

  const submit = async (data: IUser) => {
    try {
      const { username, password } = data;
      await login({
        variables: { username, password },
      });
      reset();
    } catch (e) {
      console.error(e);
    }
  };

  console.log({ result });

  return (
    <Form onSubmit={handleSubmit(submit)} data-testid="login-form">
      <Label htmlFor="name" className="mt-2">
        username
      </Label>
      <Form.Input
        data-testid="username-input"
        placeholder="Username"
        {...register('username')}
        error={get(errors, 'username.message') || result.error?.message || null}
      />
      <Label htmlFor="name" className="mt-2">
        password
      </Label>
      <Form.Input
        data-testid="password-input"
        type="password"
        placeholder="Password"
        {...register('password')}
        error={get(errors, 'password.message') || result.error?.message || null}
      />
      <Button type="submit" className="mt-4 w-full" data-testid="login-submit">
        login
      </Button>
    </Form>
  );
};
