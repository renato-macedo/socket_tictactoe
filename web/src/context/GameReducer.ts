import {
  GameStateInterface,
  JOIN_ROOM,
  Room,
  LEAVE_ROOM,
  CREATE_ROOM,
  GET_ROOMS,
  PLAYER_JOINED,
  PLAYER_LEFT,
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
      };
    case JOIN_ROOM:
      return {
        ...state,
        playing: true,
        currentRoom: action.payload.room,
        opponent: action.payload.opponent,
        nickname: action.payload.nickname,
        ws: action.payload.ws,
      };
    case LEAVE_ROOM:
      return {
        ...state,
        currentRoom: null,
      };
    case GET_ROOMS:
      if (action.payload.rooms) {
        return {
          ...state,
          rooms: [...action.payload.rooms],
        };
      } else {
        return state;
      }
    case PLAYER_JOINED:
      return {
        ...state,
        opponent: action.payload,
      };
    case PLAYER_LEFT: {
      return {
        ...state,
        opponent: null
      }
    }
    default:
      return state;
  }
}
