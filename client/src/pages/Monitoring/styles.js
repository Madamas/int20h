import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    height: '100%',
  },
  input: {
    marginTop: theme.spacing(1),
    marginButton: theme.spacing(1),
  },
  button: {
    marginTop: theme.spacing(2),
  }
}));