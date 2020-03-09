import {
  GameStateInterface,
  JOIN_ROOM,
  Room,
  LEAVE_ROOM,
  CREATE_ROOM,
  GET_ROOMS,
  PLAYER_JOINED,
  PLAYER_LEFT,
  SET_TURN,
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
        isPlayerTurn: false,
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
        isPlayerTurn: false,
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
      return {
        ...state,
        opponent: action.payload,
        isPlayerTurn: true
      };
    case PLAYER_LEFT:
      return {
        ...state,
        opponent: null,
        isHost: true,
        isPlayerTurn: false,
      }


    case SET_TURN:
      return {
        ...state,
        isPlayerTurn: action.payload
      }


    default:
      return state;
  }
}
