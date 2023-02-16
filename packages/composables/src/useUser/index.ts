import {
  Context,
  useUserFactory,
  UseUserFactoryParams
} from '@vue-storefront/core';
import type { User } from '@vue-storefront/bagisto-api';
import type {
  UseUserUpdateParams as UpdateParams,
  UseUserRegisterParams as RegisterParams
} from '../types';

const params: UseUserFactoryParams<User, UpdateParams, RegisterParams> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context) => {
    console.log('Mocked: useUser.load');
    return {};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logOut: async (context: Context) => {
    console.log('Mocked: useUser.logOut');
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateUser: async (context: Context, { currentUser, updatedUserData }) => {
    console.log('Mocked: useUser.updateUser');
    return {};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  register: async (context: Context, { email, password, firstName, lastName }) => {
    console.log('Mocked: useUser.register');
    return {};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logIn: async (context: Context, params) => {
    console.log('Mocked: useUser.logIn');
    const loginResult = await context.$bagisto.api.customerLogin(params);

    const loginResultResponse = {
      key: 'customer_login',
      customerToken: loginResult?.data?.customerLogin?.accessToken || null,
      success: loginResult?.data?.customerLogin,
      error: loginResult.data ? null : loginResult
    };

    if (loginResultResponse.customerToken !== null) {
      context.$bagisto.config.app.$cookies.set('vsf-bagCust-token', loginResultResponse.customerToken);
      context?.cart.load();
    }
    console.log("login result response", loginResultResponse)

    return loginResultResponse;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  changePassword: async (context: Context, { currentUser, currentPassword, newPassword }) => {
    console.log('Mocked: useUser.changePassword');
    return {};
  }
};

export const useUser = useUserFactory<User, UpdateParams, RegisterParams>(params);
