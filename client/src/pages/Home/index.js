import React from 'react';
import { useHistory } from 'react-router-dom';
import cs from 'classnames';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './styles';
import { getUserToken } from '../../utils';

export const Home = () => {
  const s = useStyles();
  const history = useHistory();

  const handleClick = (page) => () => {
    const token = getUserToken();
    if (page === 'lost') {
      if (token) {
        history.push('/lostpet');
        return;
      }
      localStorage.setItem('after-redirect', 'lostpet');
      history.push('/signup');
      return;
    }

    if (page === 'find') {
      if (token) {
        history.push('/findpet');
        return;
      }
      localStorage.setItem('after-redirect', 'findpet');
      history.push('/signup');
      return;
    }

    if (page === 'volonteer') {
      history.push('/volonteer');
      return;
    }

    if (page === 'addpet') {
      if (token) {
        history.push('/addpet');
        return;
      }
      localStorage.setItem('after-redirect', 'findpet');
      history.push('/signup');
      return;
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Paper className={cs(s.paper, s.title)} onClick={handleClick('lost')}>
            <Typography variant="subtitle1">Загубив Котика?</Typography>
            <img
              src="data:image/png;base64,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"
              className={s.img}
            />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={cs(s.paper, s.title)} onClick={handleClick('find')}>
            <Typography variant="subtitle1">Бачив Котика?</Typography>
            <img
              src="https://i.pinimg.com/originals/83/ae/70/83ae70614042756804c23217b5bb177b.jpg"
              className={s.img}
            />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper
            className={cs(s.paper, s.title)}
            onClick={handleClick('volonteer')}
          >
            <Typography variant="subtitle1">Я - Волонтер!</Typography>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGiJ-3FSGbQtRSQLBktOoeu5FT2eKRTBHQEw&usqp=CAU"
              className={s.img}
            />
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Paper className={cs(s.paper, s.title)} onClick={handleClick('addpet')}>
            <Typography variant="subtitle1">Додати нашийник</Typography>
            <img
              src="https://comps.canstockphoto.com/simple-black-and-white-dog-collar-image_csp36194978.jpg"
              className={s.img}
            />
          </Paper>
        </Grid>

      </Grid>
    </>
  );
};
