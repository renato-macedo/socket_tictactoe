import React, { useContext } from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import GameContext from '../context/GameContext';

export default function PlayerList() {
  const { nickname, opponent } = useContext(GameContext);
  return (
    <List>
      <ListItem>
        <ListItemText primary={nickname} />
      </ListItem>

      <ListItem>
        <ListItemText primary={opponent} />
      </ListItem>
    </List>
  );
}
