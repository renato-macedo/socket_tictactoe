import React, { useState, PropsWithChildren, useEffect, useContext, useReducer, Reducer } from 'react';
import GameContext from '../context/GameContext';

import Button from '@material-ui/core/Button';
interface BoardState {
  squares: Array<string>;
  Next: string
}
interface Action {
  type: string;
  payload: any
}

const initialState = { squares: Array(9).fill(''), Next: 'X' }
const reducer: Reducer<BoardState, Action> = (state: BoardState, action: Action): BoardState => {
  switch (action.type) {
    case "PLAYER_MOVE":
      return {
        Next: action.payload.Next,
        squares: action.payload.squares
      }
    case "OP_MOVE":
      console.log({ payload: action.payload })
      const sqrs = state.squares.slice()
      sqrs[action.payload.position] = action.payload.player
      return {
        ...state,
        squares: sqrs
      };
    case 'RESET':
      return initialState
    default:

      return state
  }
}

export default function Board(props: any) {
  const { waiting, makeAMove, isHost, ws, startTurn, } = useContext(GameContext)
  //const [state, setState] = useState<BoardState>()

  const [state, dispatch] = useReducer(reducer, initialState)

  const [status, setStatus] = useState('')
  const [winner, setWinner] = useState('')
  const [end, setEnd] = useState(false)

  function handleClick(i: number) {
    // if (calculateWinner(sqr) || sqr[i]) {
    //   return;
    // }

    const sqr = state.squares.slice();
    /*
    if the player is not waiting and there is no winner and
    the square is empty 
    */
    if (!waiting && !winner && sqr[i] == "") {
      const player = isHost ? 'X' : 'O'

      console.log(player, "is making a move")

      makeAMove(i, player)

      sqr[i] = player

      dispatch({
        type: 'PLAYER_MOVE',
        payload: {
          Next: !isHost ? 'X' : 'O', squares: sqr
        }
      })
      //setState({ Next: !isHost ? 'X' : 'O', squares: sqr })
    }

  }

  function renderSquare(i: number) {
    return <Square value={state.squares[i]} onClick={() => handleClick(i)} />;
  }

  function reset() {
    ws?.send(JSON.stringify({ type: "reset" }))
  }

  useEffect(() => {
    if (ws) {
      ws.addEventListener('message', event => {
        const message = JSON.parse(event.data);
        console.log({ message })
        const { type, data, player } = message

        switch (type) {
          case 'move':
            dispatch({
              type: 'OP_MOVE',
              payload: { position: data, player }
            })
            startTurn()
            break;
          case 'gameover':
            setWinner(data)
            setEnd(true)
            break
          case 'draw':
            setStatus('Draw')
            setEnd(true)
            break
          case 'reset':
            dispatch({
              type: 'RESET',
              payload: null
            })
            break
          default:
            break;
        }
      })
    }
  }, [])

  useEffect(() => {
    if (winner) {
      //status =
      setStatus('Winner: ' + winner)
    } else {
      console.log(state.Next)
      setStatus('Next player: ' + (state.Next))
    }

  }, [winner]);


  return (
    <div className="game">
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>

      {isHost && <Button variant="contained" disabled={!end} color="secondary" onClick={reset}>
        Restart Game
      </Button>}
    </div>
  );
}

function Square(
  props: PropsWithChildren<{ value: string; onClick: () => void }>,
) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}