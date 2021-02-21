import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { view } from '@risingstack/react-easy-state';
import {userStore} from '../../store';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { signIn } from '../../api';
import { setUserToken, getUserToken } from '../../utils';
import { useStyles } from './styles';

export const SignIn = view(() => {
  const classes = useStyles();
  const history = useHistory();
  
  const { setToken, token: storeToken } = userStore;
  const userToken = storeToken || getUserToken();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeName = (event) => {
    setName(event.target.value);
  }

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  }

  useEffect(() => {
    if (userToken) {
      history.push('/');
    }
  }, []);

  const handleClick = async () => {
    const response = await signIn({ name, password });
    const afterRedirect = localStorage.getItem('after-redirect');
    const redirectURL = afterRedirect || '/';
    setUserToken(response.data.token);
    setToken(response.data.token);
    history.push(redirectURL);
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Логін
          </Typography>
          <div className={classes.form} noValidate>
             <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Ім'я"
              name="name"
              onChange={handleChangeName}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChangePassword}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleClick}
            >
              Логін
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/signup" variant="body2">
                  {"Немає акаунта? Створи!"}
                </Link>
              </Grid>
            </Grid>
          </div>
        </div>
      </Grid>
    </Grid>
  );
});
