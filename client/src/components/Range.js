import React from 'react';
import cs from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    padding: '8px',
  }
});

export function Range({ handleChangeCallback }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(30);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    handleChangeCallback(newValue);
  };

  return (
    <div className={cs(classes.root, classes.container)}>
      <Slider
        value={typeof value === 'number' ? value : 0}
        onChange={handleSliderChange}
        aria-labelledby="input-slider"
        valueLabelDisplay="auto"
      />
      <Typography id="input-slider">
        Радіус пошуку
      </Typography>
    </div>
  );
}
