import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  modalText: {
    textAlign: 'center'
  },
  root: {
    width: 200,
    height: 100
  },
  successIcon: {
    color: 'green'
  },
  failedIcon: {
    color: 'red'
  }
}));