import { GameStateInterface, JOIN_ROOM, Room, LEAVE_ROOM } from '../types';

interface Payload {
  room: Room | null;
  nickname?: string;
}
interface Action {
  type: string;
  payload: Payload;
}

export default function GameReducer(
  state: GameStateInterface,
  action: Action,
): GameStateInterface {
  switch (action.type) {
    case JOIN_ROOM:
      return {
        ...state,
        playing: true,
        currentRoom: action.payload.room,
        nickname: action.payload.nickname
          ? action.payload.nickname
          : state.nickname,
      };
    case LEAVE_ROOM:
      return {
        ...state,
        currentRoom: null,
      };

    default:
      return state;
  }
}
