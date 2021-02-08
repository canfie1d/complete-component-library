/**
 * This hook is used for all API requests.
 * There are 3 variations of hooks available
 * useAxios -> performs an API request with headers
 * useUnauthenticatedAxios -> performs an API request without headers
 * useFormDataAxios -> performs an API request with a form-data Content-Type
 */

import axios from 'axios';
import { makeUseAxios } from 'axios-hooks';
import { getTokenSilently } from '../services/auth';
import config from '../config';

const api = axios.create({
  baseURL: config.baseEndpoint,
  timeout: 6000,
  transformRequest: [
    data => {
      return (data = JSON.stringify(data));
    },
  ],
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async options => {
    const token = await getTokenSilently();

    options.headers['Authorization'] = `Bearer ${token}`;
    return options;
  },
  error => {
    console.error(`error ${error}`);
    return Promise.reject(error);
  }
);

// https://stackoverflow.com/questions/50461746/axios-how-to-cancel-request-inside-request-interceptor-properly
// https://github.com/axios/axios#request-config
export const useAxios = makeUseAxios({
  axios: api,
});

// UNAUTHENTICATED
const unauthenticated = axios.create({
  baseURL: config.baseEndpoint,
  timeout: 6000,
  transformRequest: [
    data => {
      return (data = JSON.stringify(data));
    },
  ],
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const useUnauthenticatedAxios = makeUseAxios({
  axios: unauthenticated,
});

// EXTERNAL API
const external = axios.create({
  baseURL: config.baseEndpoint,
  timeout: 6000,
  transformRequest: [
    data => {
      return (data = JSON.stringify(data));
    },
  ],
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

external.interceptors.request.use(
  async options => {
    if (options.token) {
      options.headers['Authorization'] = `Bearer ${options.token}`;
    }
    return options;
  },
  error => {
    console.error(`error ${error}`);
    return Promise.reject(error);
  }
);

export const useExternalAxios = makeUseAxios({
  axios: external,
});

// FORMDATA UPLOADS
const formDataApi = axios.create({
  baseURL: config.baseEndpoint,
  timeout: 12000,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

formDataApi.interceptors.request.use(
  async options => {
    const token = await getTokenSilently();

    options.headers['Authorization'] = `Bearer ${token}`;
    return options;
  },
  error => {
    console.error(`error ${error}`);
    return Promise.reject(error);
  }
);

export const useFormDataAxios = makeUseAxios({
  axios: formDataApi,
});
