import { apiClientFactory } from '@vue-storefront/core';
import axios from 'axios';
import type { Setttings, Endpoints } from './types';

function onCreate(settings) {
   if (!settings?.client) {
    return init(settings);
  }
  return {
    config: settings,
    client: settings.client
  };
}

const { createApiClient } = apiClientFactory<Setttings, Endpoints>({
  onCreate,
  api: {

  }
});

const init = (settings) => {
  const client = axios.create({
    baseURL: settings.api.url
  });

  return {
    config: settings,
    client
  };
};

export {
  createApiClient,
  init
};
