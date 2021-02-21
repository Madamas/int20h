import { store } from '@risingstack/react-easy-state';

export const userStore = store({
  token: '',
  setToken: (token) => {
    userStore.token = token;
  },
  userData: null
});

export const modalStore = store({
  isOpen: false,
  status: '',
  onCloseCallback: () => {},
  toggle: () => {
    modalStore.isOpen = !modalStore.isOpen;

    if (modalStore.isOpen === false) {
      modalStore.status = '';
    }
  },
  openSuccess: (cb = () => {}) => {
    modalStore.status = 'success';
    modalStore.isOpen = true;
    modalStore.onCloseCallback = cb;
  },
  openFailed: (cb = () => {}) => {
    modalStore.status = 'failed';
    modalStore.isOpen = true;
    modalStore.onCloseCallback = cb;
  },
});
