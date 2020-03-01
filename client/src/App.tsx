import React, { useState, useContext } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { RoomList, Game } from './components';
import GameState from './context/GameState';
import GameContext from './context/GameContext';
// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       display: 'flex',
//       flexWrap: 'wrap',
//       '& > *': {
//         margin: theme.spacing(1),
//         width: theme.spacing(16),
//         height: theme.spacing(16),
//       },
//     },
//   }),
// );

function App() {
  const { playing } = useContext(GameContext);
  return (
    <Paper
      style={{ width: '80%', margin: '0 auto', padding: '2% 5%' }}
      elevation={3}>
      <h1>Socket Tic Tac Toe</h1>
      {!playing ? <RoomList /> : <Game />}
    </Paper>
  );
}

export default function AppWithContext() {
  return (
    <GameState>
      <App />
    </GameState>
  );
}
