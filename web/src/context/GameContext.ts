import { createContext } from 'react';
import { GameContextInterface } from '../types';

const GameContext = createContext<GameContextInterface>({
  playing: false,
  rooms: [],
  currentRoom: null,
  opponent: null,
  nickname: '',
  error: '',
  isPlayerTurn: false,
  isHost: false,
  joinRoom: () => { },
  leaveRoom: () => { },
  getRooms: () => { },
  createRoom: () => { },
  removePlayer: () => { },
  newPlayer: () => { },
  makeAMove: () => { },
  setTurn: () => { },
  ws: null,
});

export default GameContext;
