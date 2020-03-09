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
  const [alert, setAlert] = useState('');
  return (
    <>
      <PlayerList />
      <Board setAlert={setAlert} />
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
