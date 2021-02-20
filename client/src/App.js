import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { LostPet } from './pages/LostPet';
import { SignUp } from './pages/SignUp';
import { SignIn } from './pages/SignIn';
import { Home } from './pages/Home';

import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useStyles } from './styles';
import 'leaflet/dist/leaflet.css';

export default function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute">
        <Toolbar className={classes.toolbar}>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Lost Pussy
          </Typography>
          {/* <Notifications /> */}
        </Toolbar>
      </AppBar>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container} fixed={true}>
          <Router>
            <Switch>
              <Route path="/lostpet">
                <LostPet />
              </Route>
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
          </Router>
        </Container>
        {/* <Modal /> */}
      </main>
    </div>
  );
}
