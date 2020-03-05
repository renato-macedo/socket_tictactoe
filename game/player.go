package game

import (
	"fmt"
	"log"

	"github.com/gofrs/uuid"
	"github.com/gorilla/websocket"

	"github.com/renato-macedo/socket-tic-tac-toe/messages"
)

// Player struc
type Player struct {
	ID       string `json:"playerID"`
	Nickname string
	Conn     *websocket.Conn `json:"-"`
	Game     *Game           `json:"-"`
}

// NewPlayer creates a player with a given nickname
func NewPlayer(conn *websocket.Conn) *Player {

	id := uuid.Must(uuid.NewV4()).String()
	player := &Player{ID: id, Conn: conn}

	return player
}

// Reader reads messages
func (p *Player) Reader() {
	log.Println("starting to read")
	defer func() {
		p.Conn.Close()
	}()
	for {

		// new message
		message := map[string]string{}
		err := p.Conn.ReadJSON(&message)
		if err != nil {
			// log.Printf("error: %v", err)

			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("error: %v", err)
			}
			break

		}

		fmt.Println("message", message)
		switch message["type"] {

		case "create":
			nickname := message["nickname"]
			p.Nickname = nickname
			gameID := CreateGame(p)
			p.Conn.WriteJSON(messages.Default{Type: "created", Data: gameID})

		case "join":
			nickname := message["nickname"]
			log.Println("player trying to join", nickname)
			p.Nickname = nickname
			success := JoinGame(message["id"], p)
			if success == true {

				opponent := Games[message["id"]].Host

				// tell the player who is the host
				p.Conn.WriteJSON(messages.Default{Type: "joined", Data: opponent.Nickname})
				// tell the host that a player joined the game
				opponent.Conn.WriteJSON(messages.Default{Type: "newplayer", Data: p.Nickname})
			}

		}

	}
}

// Writer sends messages
func (p *Player) Writer() {
	defer func() {
		p.Conn.Close()
	}()
}
