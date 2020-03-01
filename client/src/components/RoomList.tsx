import React, { useState, useContext } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import { Room } from '../types';
import Modal from './Modal';
import GameContext from '../context/GameContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

const rooms: Room[] = [
  { id: 'a', num: 1, players: 1 },
  { id: 'b', num: 2, players: 1 },
  { id: 'c', num: 3, players: 2 },
  { id: 'd', num: 4, players: 1 },
];

export default function RoomList() {
  const classes = useStyles();

  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<Room | null>(null);
  const { joinRoom } = useContext(GameContext);

  const handleSelect = (room: Room) => {
    setSelected(room);
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  const handleJoin = (nickname: string) => {
    if (selected) {
      joinRoom(nickname, selected);
    }
  };

  return (
    <>
      <List component="nav" aria-label="main mailbox folders">
        <li className="collection-header">
          <h4>Rooms</h4>
        </li>
        {rooms.map(room => (
          <>
            <ListItem
              key={room.id}
              button
              selected={selected?.num === room.num}
              onClick={() => handleSelect(room)}>
              <ListItemText primary={`Room ${room.num}`} />
            </ListItem>
          </>
        ))}
      </List>

      <Modal
        visible={visible}
        handleClose={handleClose}
        roomNumber={selected?.num}
        handleJoin={(text: string) => handleJoin(text)}
      />
    </>
  );
}
