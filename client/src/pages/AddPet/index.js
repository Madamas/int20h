import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useStyles } from './styles';
import { modalStore } from '../../store';
import { addDevice } from '../../api';

export const AddPet = () => {
  const classes = useStyles();
  const history = useHistory();

  const [device, setDevice] = useState('');
  const [petName, setPetName] = useState('');

  const handleChangeDevice = (event) => {
    setDevice(event.target.value);
  };

  const handleChangePetName = (event) => {
    setPetName(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      await addDevice({ deviceId: device, animalName: petName });
      modalStore.openSuccess(() => history.push('/'));
    } catch (e) {
      modalStore.openFailed(() => history.push('/'));
    }
  };

  return (
    <Grid container>
      <Grid item xs={6} className={classes.paper}>
        <Paper className={classes.paper}>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <TextField
              placeholder="ID девайсу"
              multiline
              onChange={handleChangeDevice}
              className={classes.input}
            />
            <TextField
              placeholder="Кличка"
              multiline
              onChange={handleChangePetName}
              className={classes.input}
            />
            <Button onClick={handleSubmit} className={classes.button}>Додати девайс</Button>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};
