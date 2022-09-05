import axios from 'axios';
import { ILoginUserData, IRegisterUserData, User } from '../types/types';

export async function registerUser({
  name,
  email,
  password,
  repeatPassword,
}: IRegisterUserData): Promise<User> {
  const response = await axios.post(
    '/api/users/register',
    {
      name,
      email,
      password,
      repeatPassword,
    },
    {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    },
  );

  return response.data.data;
}

export async function loginUser({ email, password }: ILoginUserData): Promise<User> {
  const response = await axios.post(
    '/api/users/login',
    {
      email,
      password,
    },
    {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    },
  );

  return response.data.data;
}
