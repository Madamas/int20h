import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { device as getDeviceApi } from '../../api';
import { useStyles } from './styles';
import { Map } from './MonitoringMap';

export const Monitoring = () => {
  const [devices, setDevices] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    async function getDevices() {
      const device = await getDeviceApi();
      setDevices(device.data.devices);
    }

    getDevices();
  }, []);

  useEffect(() => {
    async function getDevices() {
      const device = await getDeviceApi();
      setDevices(device.data.devices);
    }

    const timer = setInterval(() => {
      getDevices();
    }, 20 * 1000);
    return () => clearInterval(timer);
  }, [])

  const shouldRenderMap = devices.length > 0;

  return (
    <Grid container>
      <Grid item xs={6} className={classes.paper}>
        <Paper className={classes.paper}>
          {shouldRenderMap && <Map devices={devices} />}
          {!shouldRenderMap && <h2>Немає доданих девайсів</h2>}
        </Paper>
      </Grid>
    </Grid>
  );
};
