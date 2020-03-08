import {
  GameStateInterface,
  JOIN_ROOM,
  Room,
  LEAVE_ROOM,
  CREATE_ROOM,
  GET_ROOMS,
  PLAYER_JOINED,
  PLAYER_LEFT,
  MOVE,
  START_TURN,
} from '../types';

interface Payload {
  room?: Room | null;
  nickname?: string;
  rooms?: Room[];
}
interface Action {
  type: string;
  payload: any;
}

export default function GameReducer(
  state: GameStateInterface,
  action: Action,
): GameStateInterface {
  switch (action.type) {
    case CREATE_ROOM:
      return {
        ...state,
        playing: true,
        currentRoom: action.payload.room,
        nickname: action.payload.nickname,
        ws: action.payload.ws,
        waiting: false,
        isHost: true
      };
    case JOIN_ROOM:
      return {
        ...state,
        playing: true,
        currentRoom: action.payload.room,
        opponent: action.payload.opponent,
        nickname: action.payload.nickname,
        ws: action.payload.ws,
        waiting: true,
        isHost: false
      };
    case LEAVE_ROOM:
      return {
        ...state,
        currentRoom: null,
      };
    case GET_ROOMS:
      return {
        ...state,
        rooms: [...action.payload.rooms],
      };
    case PLAYER_JOINED:
      console.log('player joined reducer')
      return {
        ...state,
        opponent: action.payload,
      };
    case PLAYER_LEFT:
      return {
        ...state,
        opponent: null
      }

    case START_TURN:
    case MOVE:
      return {
        ...state,
        waiting: action.payload
      }


    default:
      return state;
  }
}
