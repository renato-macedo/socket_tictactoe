import React, { useState, useContext, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';

import Button from '@material-ui/core/Button';
import { Room } from '../types';
import Modal from './Modal';
import GameContext from '../context/GameContext';

export default function RoomList() {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<Room | null>(null);

  const { joinRoom, createRoom, rooms, getRooms, error, ws } = useContext(
    GameContext,
  );

  function handleSelect(room: Room) {
    setSelected(room);
    setVisible(true);
  }

  function handleClose() {
    setVisible(false);
  }

  function handleJoin(nickname: string) {
    if (selected) {
      joinRoom(nickname, selected);
    } else {
      createRoom(nickname);
    }
  }

  function handleCreate() {
    setSelected(null);
    setVisible(true);
  }

  useEffect(() => {
    getRooms();
  }, []);

  return (
    <>
      <List component="nav" aria-label="main mailbox folders">
        <li className="collection-header">
          <h4>Rooms</h4>
        </li>

        {rooms.length > 0 &&
          rooms.map((room: Room) => (
            <>
              <ListItem
                key={room.id}
                button
                selected={selected?.id === room.id}
                onClick={() => handleSelect(room)}>
                <ListItemText primary={`${room.title}`} />
              </ListItem>
            </>
          ))}
      </List>
      <Button variant="contained" color="primary" onClick={handleCreate}>
        Create Room
      </Button>
      <Modal
        visible={visible}
        handleClose={handleClose}
        roomNumber={selected?.num}
        handleJoin={(text: string) => handleJoin(text)}
      />
    </>
  );
}
