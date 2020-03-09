import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';

const Transition = React.forwardRef<unknown, TransitionProps>(
  function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  },
);

export default function FormDialog({
  visible,
  handleClose,
  roomTitle,
  handleJoin,
}: {
  visible: boolean;
  handleClose: () => void;
  handleJoin: (text: string) => void;
  roomTitle?: string;
}) {
  const [text, setText] = useState('');
  const [error, setError] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault()
    if (text) {
      setError(false);
      handleJoin(text);
    } else {
      setError(true);
    }
  };

  return (
    <div>
      <Dialog
        open={visible}
        TransitionComponent={Transition}
        onClose={handleClose}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Join {roomTitle}</DialogTitle>
        <form onSubmit={handleClick}>
          <DialogContent>
            <DialogContentText>
              Before join the Room please type a nickname
          </DialogContentText>

            <TextField
              autoComplete="off"
              error={error}
              autoFocus
              margin="dense"
              id="name"
              label="Nickname"
              type="text"
              fullWidth
              onChange={handleChange}
              helperText={error ? 'Nickname must be empty' : null}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
          </Button>
            <Button type="submit" color="primary">
              Join Room
          </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
