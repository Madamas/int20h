import axios from 'axios';

const BASE_URL = 'https://int-20h-5d3bq.ondigitalocean.app';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
});

export const signUp = ({ email, name, password }) => {
  const url = '/api/sign-up';
  return apiClient.post(url, { email, name, password });
};

export const signIn = ({ name, password }) => {
  const url = '/api/sing-in';
  return apiClient.post(url, { name, password });
};

export const applicationFound = ({kind, breed, color, size, sex, coordinates, special = ''}) => {
  const url = '/api/application-found';
  return apiClient.post(url, { kind, breed, color, size, sex, coordinates, special });
};

// this.router.post('/api/application-found', this.handleRoute(applyFoundAnimal))
// this.router.post('/api/application-lost', this.handleRoute(applyLostAnimal))