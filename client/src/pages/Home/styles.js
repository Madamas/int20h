import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100%',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '4px 4px 8px 0px rgba(34, 60, 80, 0.2)',
    }
  },
  img: {
    height: 255,
    width: 255,
    paddingTop: 15
  },
  title: {
    color: 'black'
  }
}));
