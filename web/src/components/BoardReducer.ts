import { Reducer } from 'react'


export interface BoardState {
  squares: Array<string>;
  Next: string;
  winner: string;
  status: string;
  end: boolean;
  highlighted: Array<number>;
}

export interface Action {
  type: 'PLAYER_MOVE' | 'OP_MOVE' | 'UPDATE_STATUS' | 'GAME_OVER' | 'RESTART' | 'DRAW';
  payload: any;
}


export function initReducer(initialState: BoardState) {
  const BoardReducer: Reducer<BoardState, Action> = (state: BoardState, action: Action): BoardState => {
    switch (action.type) {
      case "PLAYER_MOVE":
        return {
          ...state,
          Next: action.payload.Next,
          squares: action.payload.squares
        }
      case "OP_MOVE":
        console.log({ payload: action.payload })
        const sqrs = state.squares.slice()
        sqrs[action.payload.position] = action.payload.player
        return {
          ...state,
          Next: action.payload.Next,
          squares: sqrs
        };
      case 'UPDATE_STATUS':
        return {
          ...state,
          status: action.payload
        }
      case 'GAME_OVER':
        return {
          ...state,
          end: true,
          winner: action.payload.winner,
          highlighted: action.payload.highlighted
        }
      case 'DRAW':
        return {
          ...state,
          end: true,
          status: 'Draw'
        }
      case 'RESTART':
        return initialState
      default:

        return state
    }
  }

  return BoardReducer
}

