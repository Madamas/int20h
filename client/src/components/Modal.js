import React from 'react';
import { view } from '@risingstack/react-easy-state';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import Clear from '@material-ui/icons/Clear';
import Button from '@material-ui/core/Button';
import { modalStore } from '../store';
import { useStyles } from './modal.styles';

export const Modal = view(() => {
  const classes = useStyles();
  const { isOpen, status, toggle, onCloseCallback } = modalStore;


  const handleClose = () => {
    toggle();
    onCloseCallback();
  }


  if (status === 'success') {
    return (
      <Dialog
        maxWidth={'lg'}
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title" className={classes.modalText}>
          Успішно!
        </DialogTitle>
        <DialogContent
          className={classes.root}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <DoneAllIcon fontSize="large" className={classes.successIcon} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  if (status === 'failed') {
    return (
      <Dialog
        maxWidth={'lg'}
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title" className={classes.modalText}>
          Помилка!
        </DialogTitle>
        <DialogContent
          className={classes.root}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Clear fontSize="large" className={classes.failedIcon} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return null;
});
