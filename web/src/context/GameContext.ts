import { createContext } from 'react';
import { GameContextInterface } from '../types';

const GameContext = createContext<GameContextInterface>({
  playing: false,
  rooms: [],
  currentRoom: null,
  opponent: null,
  nickname: '',
  error: '',
  joinRoom: () => { },
  leaveRoom: () => { },
  getRooms: () => { },
  createRoom: () => { },
  removePlayer: () => { },
  newPlayer: () => { },
  ws: null,
});

export default GameContext;
