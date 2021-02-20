import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const Selector = ({handleChangeCallback, options, value, withNone = false, helperText = '', title = ''}) => {
  const classes = useStyles();

  const handleChange = (event) => {
    handleChangeCallback(event.target.value);
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor={title}>{title}</InputLabel>
      <NativeSelect
        value={value}
        onChange={handleChange}
        inputProps={{
          name: title,
          id: title,
        }}
      >
        {withNone && <option aria-label="None" value="" />}
        {options.map((option, index) => {
          return (
            <option value={option.value} key={index}>
              {option.text}
            </option>
          );
        })}
      </NativeSelect>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};
