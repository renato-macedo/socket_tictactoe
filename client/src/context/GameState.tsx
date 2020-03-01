import React, { createContext, useReducer, PropsWithChildren } from 'react';
import {
  GameStateInterface,
  Room,
  SET_CURRENT_ROOM,
  JOIN_ROOM,
} from '../types';
import GameReducer from './GameReducer';
import GameContext from './GameContext';

function GameState(props: any) {
  const initialState: GameStateInterface = {
    playing: false,
    rooms: [],
    nickname: '',
    currentRoom: null,
  };

  const [state, dispatch] = useReducer(GameReducer, initialState);

  function joinRoom(nickname: string, room: Room) {
    dispatch({
      type: JOIN_ROOM,
      payload: { room, nickname },
    });
  }
  function leaveRoom() {}

  return (
    <GameContext.Provider
      value={{
        playing: state.playing,
        rooms: state.rooms,
        nickname: state.nickname,
        currentRoom: state.currentRoom,
        joinRoom,
        leaveRoom,
      }}>
      {props.children}
    </GameContext.Provider>
  );
}

export default GameState;
