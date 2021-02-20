import axios from 'axios';

const BASE_URL = 'https://int-20h-5d3bq.ondigitalocean.app';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
});

console.log(apiClient);
export const signUp = ({ email, name, password }) => {
  const url = '/api/sign-up';
  return apiClient.post(url, { email, name, password });
};

export const signIn = ({ name, password }) => {
  const url = '/api/sing-in';
  return apiClient.post(url, { name, password });
};
