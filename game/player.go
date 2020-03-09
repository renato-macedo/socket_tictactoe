package game

import (
	"log"
	"strconv"

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

// Reader receive and send messages
func (p *Player) Reader() {

	// close the connection after
	defer func() {
		p.Conn.Close()

	}()

	// start to read messages
	for {

		// new message
		message := map[string]string{}

		err := p.Conn.ReadJSON(&message)
		// log.Println(err)
		if err != nil {
			if p.Game != nil {

				// if the player is the host, tell the guest the host left the game
				if p.ID == p.Game.Host.ID {
					// notify the guest
					if p.Game.Guest != nil {
						p.Game.Guest.Conn.WriteJSON(messages.Default{Type: messages.HOST_LEFT, Data: "Your adversary left the game, You are the host now"})
						p.Game.Host = p.Game.Guest
						p.Game.Guest = nil
					} else {
						// or delete the game if there is no guest
						delete(Games, p.Game.ID)

					}

				} else {
					// otherwise tell the host the guest left
					p.Game.Host.Conn.WriteJSON(messages.Default{Type: messages.GUEST_LEFT, Data: "Your adversary left the game"})
					p.Game.Guest = nil
				}
			}
			break

		}

		switch message["type"] {
		case messages.CREATE:
			nickname := message["nickname"]
			onCreate(p, nickname)
			break

		case messages.JOIN:
			nickname := message["nickname"]
			roomID := message["id"]
			onJoin(p, nickname, roomID)
			break

		case messages.MOVE:
			index, err := strconv.Atoi(message["square"])
			if err != nil {
				log.Printf("error %v", err)
				return
			}
			player := message["player"]
			onMove(p, index, player)
			break
		case messages.RESTART:
			onRestart(p)
			break

		}

	}
}

// Writer sends messages
func (p *Player) Writer() {
	defer func() {
		p.Conn.Close()
	}()
}
