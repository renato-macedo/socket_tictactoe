import React, { useState, useEffect, useContext, useReducer, Reducer } from 'react';
import GameContext from '../context/GameContext';
import Square from './Square';
import Button from '@material-ui/core/Button';
import { BoardState, initReducer } from './BoardReducer'


const initialState: BoardState = { squares: Array(9).fill(''), Next: 'X', winner: '', end: false, status: '', highlighted: [] }

const reducer = initReducer(initialState)


export default function Board({ setAlert }: { setAlert: (alert: string) => void }) {
  const { isPlayerTurn, makeAMove, isHost, ws, setTurn, newPlayer, removePlayer, opponent, nickname } = useContext(GameContext)


  const [state, dispatch] = useReducer(reducer, initialState)

  function handleClick(i: number) {
    const sqr = state.squares.slice();
    /*
    if the player is not waiting and there is no winner and
    the square is empty 
    */
    if (isPlayerTurn && !state.winner && sqr[i] == "") {

      const player = isHost ? 'X' : 'O'

      makeAMove(i, player)

      sqr[i] = player

      dispatch({
        type: 'PLAYER_MOVE',
        payload: {
          Next: isHost ? 'O' : 'X', squares: sqr
        }
      })
    }

  }

  function renderSquare(i: number) {
    if (state.highlighted.includes(i)) {
      const { winner } = state
      let color: string
      if (winner == "X" && isHost) {
        color = "#28a745"
      } else if (winner == "O" && isHost) {
        color = "#dc3545"
      } else if (winner == "X" && !isHost) {
        color = "#dc3545"
      } else { // winner == "O" && !isHost
        color = "#28a745"
      }
      return <Square color={color} value={state.squares[i]} onClick={() => handleClick(i)} />;
    }
    return <Square value={state.squares[i]} onClick={() => handleClick(i)} />;


  }

  function restart() {
    ws?.send(JSON.stringify({ type: "restart" }))
  }

  useEffect(() => {
    if (ws) {
      ws.addEventListener('message', event => {
        const message = JSON.parse(event.data);

        const { type, data, player } = message

        switch (type) {
          case 'move':
            dispatch({
              type: 'OP_MOVE',
              payload: { position: data, player, Next: !isHost ? 'O' : 'X' }
            })
            setTurn(true)
            break;
          case 'gameover':
            dispatch({
              type: "GAME_OVER",
              payload: { winner: player, highlighted: data }
            })
            break
          case 'draw':
            dispatch({
              type: 'DRAW',
              payload: null
            })
            break
          case 'restart':
            isHost ? setTurn(true) : setTurn(false)
            dispatch({
              type: 'RESTART',
              payload: null
            })
            break
          case 'newplayer':
            newPlayer(data);
            setAlert('New Player joined the room');
            break;
          case 'gs_left':
          case 'hs_left':
            removePlayer()
            setAlert(data)
            restart()
            dispatch({
              type: 'RESTART',
              payload: null
            })
            break
        }
      })
    }
  }, [])

  useEffect(() => {

    dispatch({
      type: "UPDATE_STATUS",
      payload: state.winner ? `Winner: ${state.winner}` : `Next player: ${state.Next}`,
    })

  }, [state.winner, isPlayerTurn]);


  return (
    <div className="game">
      <div className="board">
        <div className="status">{state.status}</div>
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
      </div>
      {isHost && <Button variant="contained" disabled={!state.end} color="secondary" onClick={restart}>
        Restart Game
      </Button>}
    </div>
  );
}

