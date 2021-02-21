export const getUserToken = () => {
  return localStorage.getItem('token');
}

export const setUserToken = (token) => {
  localStorage.setItem('token', token);
}