import { createContext } from 'react';
import { GameContextInterface } from '../types';

const GameContext = createContext<GameContextInterface>({
  playing: false,
  rooms: [],
  currentRoom: null,
  nickname: '',
  joinRoom: () => {},
  leaveRoom: () => {},
});

export default GameContext;
