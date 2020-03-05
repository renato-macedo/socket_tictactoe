export interface GameContextInterface {
  playing: boolean;
  rooms: Room[];
  nickname: string;
  currentRoom: Room | null;
  opponent: string | null;
  ws: WebSocket | null;
  error: string;
  createRoom: (nickname: string) => void;
  joinRoom: (nickname: string, room: Room) => void;
  leaveRoom: () => void;
  getRooms: () => void;
  newPlayer: (nickname: string) => void;
  removePlayer: () => void
}

export interface GameStateInterface {
  playing: boolean;
  rooms: Room[];
  error: string;
  nickname: string;
  opponent: string | null;
  currentRoom: Room | null;
  ws: WebSocket | null;
}

export interface Room {
  id: string;
  title: string;
  num_players: number;
}

// Events
export const JOIN_ROOM = 'JOIN_ROOM';
export const CREATE_ROOM = 'CREATE_ROOM';
export const LEAVE_ROOM = 'LEAVE_ROOM';
export const SET_CURRENT_ROOM = 'SET_CURRENT_ROOM';
export const GET_ROOMS = 'GET_ROOMS';
export const PLAYER_JOINED = 'PLAYER_JOINED';
export const PLAYER_LEFT = 'PLAYER_LEFT'
export const ERROR = 'ERROR';
