export interface GameContextInterface {
  playing: boolean;
  rooms: Room[];
  nickname: string;
  currentRoom: Room | null;
  joinRoom: (nickname: string, room: Room) => void;
  leaveRoom: () => void;
}

export interface GameStateInterface {
  playing: boolean;
  rooms: Room[];
  nickname: string;
  currentRoom: Room | null;
}

export interface Room {
  id: string;
  num: number;
  players: number;
}

// Events
export const JOIN_ROOM = 'JOIN_ROOM';
export const LEAVE_ROOM = 'LEAVE_ROOM';
export const SET_CURRENT_ROOM = 'SET_CURRENT_ROOM';
