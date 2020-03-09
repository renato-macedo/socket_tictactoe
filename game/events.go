package game

import "github.com/renato-macedo/socket-tic-tac-toe/messages"

func onCreate(p *Player, nickname string) {
	p.Nickname = nickname
	gameID := CreateGame(p)
	p.Conn.WriteJSON(messages.Default{Type: messages.CREATED, Data: gameID})
}

func onJoin(p *Player, nickname, roomID string) {
	// log.Println("player trying to join", nickname)
	p.Nickname = nickname
	success := JoinGame(roomID, p)
	if success == true {

		opponent := Games[roomID].Host

		// tell the guest who is the host
		p.Game.notifyGuest(messages.JOINED, opponent.Nickname)
		//p.Conn.WriteJSON(messages.Default{Type: messages.JOINED, Data: opponent.Nickname})
		// tell the host that a player joined the game
		p.Game.notifyHost(messages.NEW_PLAYER, p.Nickname)
		//opponent.Conn.WriteJSON(messages.Default{Type: messages.NEW_PLAYER, Data: p.Nickname})
	}
}

func onMove(p *Player, index int, playerType string) {

	if playerType == "X" {

		if p.Game.Guest != nil {
			p.Game.Guest.Conn.WriteJSON(messages.Move{Type: messages.MOVE, Position: index, Player: playerType})
		} else {
			p.Game.notifyHost("error", "Wait for another player to join!")

		}

	} else {
		p.Game.Host.Conn.WriteJSON(messages.Move{Type: messages.MOVE, Position: index, Player: playerType})
	}

	hasWinner, draw, winner := p.Game.calculateWinner(index, playerType)

	if draw {
		p.Game.notifyAll(messages.DRAW, "")
	} else if hasWinner {
		p.Game.notifyAll(messages.GAME_OVER, winner)
	}
}
