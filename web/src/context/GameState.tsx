import React, { createContext, useReducer, PropsWithChildren } from 'react';
import {
  GameStateInterface,
  Room,
  SET_CURRENT_ROOM,
  JOIN_ROOM,
  CREATE_ROOM,
  GET_ROOMS,
  GameContextInterface,
  PLAYER_JOINED,
  PLAYER_LEFT,
  MOVE,
  START_TURN,

} from '../types';
import GameReducer from './GameReducer';
import GameContext from './GameContext';

// let ws: WebSocket;

function GameState(props: any) {
  const initialState: GameStateInterface = {
    playing: false,
    rooms: [],
    nickname: '',
    error: '',
    waiting: false,
    isHost: false,
    currentRoom: null,
    opponent: null,
    ws: null,
  };

  const [state, dispatch] = useReducer(GameReducer, initialState);

  function createRoom(nickname: string) {
    const ws = new WebSocket('ws://localhost:3000/ws');

    // tell the server to create a room
    ws.onopen = event => {

      ws.send(JSON.stringify({ type: 'create', nickname }));
    };

    // when server notifies that the room is created, update state
    ws.onmessage = (event: MessageEvent) => {
      const { type, data } = JSON.parse(event.data);

      if (type === 'created') {

        dispatch({
          type: CREATE_ROOM,
          payload: { room: { id: data, players: 1 }, nickname, ws },
        });
      }
    };
  }

  function joinRoom(nickname: string, room: Room) {
    const ws = new WebSocket('ws://localhost:3000/ws');

    // tell the server that the player wants to join a room
    ws.onopen = event => {
      console.log('connected');
      console.log({ id: room.id })
      ws.send(
        JSON.stringify({
          type: 'join',
          id: room.id,
          nickname,
        }),
      );
    };

    // when server notifies that the player joined, update state
    ws.onmessage = (event: MessageEvent) => {
      const { type, data } = JSON.parse(event.data);
      if (type === 'joined') {
        dispatch({
          type: JOIN_ROOM,
          payload: {
            room: { id: room.id, players: 2 },
            nickname,
            opponent: data,
            ws,
          },
        });
      }
    };
  }

  function newPlayer(nickname: string) {
    dispatch({
      type: PLAYER_JOINED,
      payload: nickname,
    });
  }

  function removePlayer() {
    dispatch({
      type: PLAYER_LEFT,
      payload: null
    })
  }

  function makeAMove(square: number, player: string) {
    if (state.ws) {
      dispatch({
        type: MOVE,
        payload: true // set waiting true
      })
      state.ws.send(JSON.stringify({ type: 'move', square: square.toString(), player }))
    }
  }

  function startTurn() {
    dispatch({
      type: START_TURN,
      payload: false // set waiting false
    })
  }

  async function getRooms() {
    const response = await fetch('http://localhost:3000/rooms');

    const data: Array<Room> = await response.json();

    dispatch({
      type: GET_ROOMS,
      payload: { rooms: data },
    });
  }

  function leaveRoom() { }

  return (
    <GameContext.Provider
      value={{
        playing: state.playing,
        rooms: state.rooms,
        nickname: state.nickname,
        currentRoom: state.currentRoom,
        createRoom,
        joinRoom,
        leaveRoom,
        getRooms,
        newPlayer,
        waiting: state.waiting,
        error: state.error,
        ws: state.ws,
        opponent: state.opponent,
        removePlayer,
        isHost: state.isHost,
        makeAMove,
        startTurn
      }}>
      {props.children}
    </GameContext.Provider>
  );
}

export default GameState;
