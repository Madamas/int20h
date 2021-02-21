import React, { useEffect } from 'react';
import cs from 'classnames';
import { view } from '@risingstack/react-easy-state';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { userStore } from './store';

import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useStyles } from './styles';
import { GuardedRoute } from './components/GuardRoute';
import { Modal } from './components/Modal';
import { setUserToken } from './utils';

import { LostPet } from './pages/LostPet';
import { SignUp } from './pages/SignUp';
import { SignIn } from './pages/SignIn';
import { Home } from './pages/Home';
import { AddPet } from './pages/AddPet';
import { Monitoring } from './pages/Monitoring';

import 'leaflet/dist/leaflet.css';

export default view(() => {
  const classes = useStyles();
  const token = userStore.token || localStorage.getItem('token');

  useEffect(() => {
    if (!userStore.token && localStorage.getItem('token')) {
      userStore.token = localStorage.getItem('token');
    }
  }, []);

  const handleLogout = () => {
    userStore.setToken('');
    setUserToken('');
    window.location.href = '/';
  };

  return (
    <div className={classes.root}>
      <Router>
        <CssBaseline />
        <AppBar position="absolute">
          <Toolbar className={classes.toolbar}>
            <Grid container justify="space-between">
              <Link to="/" style={{ textDecoration: 'none' }}>
                <Typography
                  component="h1"
                  variant="h6"
                  color="inherit"
                  noWrap
                  className={cs(classes.title, classes.logo)}
                >
                  Lost Pussy
                </Typography>
              </Link>
              {token && (
                <Button style={{ color: 'white' }} onClick={handleLogout}>
                  Вийти
                </Button>
              )}
            </Grid>
          </Toolbar>
        </AppBar>

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container} fixed={true}>
            <Switch>
              <GuardedRoute
                path="/lostpet"
                component={LostPet}
                auth={!!token}
              />
              <GuardedRoute
                path="/findpet"
                component={LostPet}
                auth={!!token}
              />
              <GuardedRoute path="/addpet" component={AddPet} auth={!!token} />
              <GuardedRoute path="/monitoring" component={Monitoring} auth={!!token} />
              <Route path="/signup">
                <SignUp />
              </Route>
              <Route path="/signin">
                <SignIn />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Container>
        </main>
        <Modal />
      </Router>
    </div>
  );
});
