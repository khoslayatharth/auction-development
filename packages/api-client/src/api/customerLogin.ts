
import { LoginInput } from '../types';
import axios, { AxiosInstance } from 'axios';

type Variables = {
  input?: LoginInput;
};

// const client: AxiosInstance = axios.create({
//   baseURL: 'https://3a61421c-ebaa-4715-801e-358f3e4e43e3.mock.pstmn.io',
//   headers: {
//     // set your headers here
//   }
// });


export async function customerLogin(context, params) {
  const url = new URL('/login', context.config.api.url);
  const inputFilters = {
    email: params?.email,
    password: params?.password,
  };

  try {
    const response = await context.client.post(url.href, inputFilters);
    return response.data;
  } catch (error) {
    console.log('Error customerLogin:');
    console.log(error);
    throw error.response?.data || error.message;
  }
}
