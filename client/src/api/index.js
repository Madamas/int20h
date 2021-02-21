import axios from 'axios';
import { getUserToken } from '../utils';

// const BASE_URL = 'https://int-20h-5d3bq.ondigitalocean.app';
const BASE_URL = 'http://localhost:3000';
// const BASE_URL = 'http://161.35.222.200';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
});

export const signUp = ({ email, name, password }) => {
  const url = '/api/sign-up';
  const headers = {};
  const token = getUserToken();
  if (token) {
    headers['token'] = token;
  }

  return apiClient.post(url, { email, name, password }, { headers });
};

export const signIn = ({ name, password }) => {
  const url = '/api/sing-in';
  const headers = {};
  const token = getUserToken();
  if (token) {
    headers['token'] = token;
  }
  return apiClient.post(url, { name, password }, { headers });
};

export const applicationFound = ({
  kind,
  breed,
  color,
  size,
  sex,
  coordinates,
  special = '',
}) => {
  const url = '/api/application-found';
  const headers = {};
  const token = getUserToken();
  if (token) {
    headers['token'] = token;
  }
  return apiClient.post(
    url,
    {
      kind,
      breed,
      color,
      size,
      sex,
      coordinates,
      special,
    },
    { headers }
  );
};

export const applicationLost = ({
  kind,
  breed,
  color,
  size,
  sex,
  coordinates,
  special = '',
}) => {
  const url = '/api/application-lost';
  const headers = {};
  const token = getUserToken();
  if (token) {
    headers['token'] = token;
  }
  return apiClient.post(
    url,
    {
      kind,
      breed,
      color,
      size,
      sex,
      coordinates,
      special,
    },
    { headers }
  );
};

export const devices = ({ deviceId, animalName }) => {
  const url = '/api/devices';
  const headers = {};
  const token = getUserToken();
  if (token) {
    headers['token'] = token;
  }
  return apiClient.post(url, { deviceId, animalName }, { headers });
}