import React, {
  useState,
  useEffect,
  useContext,
} from 'react';
import GameContext from '../context/GameContext';
import Board from './Board';
import Snackbar, { SnackbarOrigin } from '@material-ui/core/Snackbar';
import PlayerList from './PlayerList';

export default function Game() {
  const { ws, error, newPlayer, removePlayer } = useContext(GameContext);
  const [alert, setAlert] = useState('');


  useEffect(() => {
    if (ws) {
      console.log('ok');
      ws.addEventListener('message', event => {
        const { type, data } = JSON.parse(event.data);
        switch (type) {
          case 'newplayer':

            newPlayer(data);
            setAlert('New Player joined the room');

            break;
          case 'gs_left':
          case 'hs_left':
            removePlayer()
            setAlert(data)
          default:
            break;
        }
      })
    }
  }, []);
  return (
    <>
      <PlayerList />
      <Board />
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={!!alert}
        onClose={() => setAlert('')}
        message={alert}
      />
    </>
  );
}

// -----------------------------------------------------------------------
