import React, {
  PropsWithChildren,
  useState,
  useEffect,
  useContext,
} from 'react';
import GameContext from '../context/GameContext';
import Board from './Board';
import Snackbar, { SnackbarOrigin } from '@material-ui/core/Snackbar';
import PlayerList from './PlayerList';

export default function Game() {
  const { ws, error, newPlayer } = useContext(GameContext);
  const [alert, setAlert] = useState(false);

  function handleClose() {
    setAlert(false);
  }
  useEffect(() => {
    if (ws) {
      console.log('ok');
      ws.onmessage = (event: MessageEvent) => {
        const { type, data } = JSON.parse(event.data);
        if (type == 'newplayer') {
          newPlayer(data);
          setAlert(true);
        }
      };
    }
  }, []);
  return (
    <>
      <PlayerList />
      <Board />
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={alert}
        onClose={handleClose}
        message={'New Player joined the room'}
      />
    </>
  );
}

// -----------------------------------------------------------------------
