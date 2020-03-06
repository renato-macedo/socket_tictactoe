package game

import (
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
		log.Printf("%v", p.Game)
		err := p.Conn.ReadJSON(&message)
		log.Println(err)
		if err != nil {
			log.Printf("hmmmm: %v", err)
			log.Printf("player: %v game: %v \n", p.Nickname, p.Game)

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
			p.Nickname = nickname
			gameID := CreateGame(p)
			p.Conn.WriteJSON(messages.Default{Type: messages.CREATED, Data: gameID})

		case messages.JOIN:
			nickname := message["nickname"]
			log.Println("player trying to join", nickname)
			p.Nickname = nickname
			success := JoinGame(message["id"], p)
			if success == true {

				opponent := Games[message["id"]].Host

				// tell the player who is the host
				p.Conn.WriteJSON(messages.Default{Type: messages.JOINED, Data: opponent.Nickname})
				// tell the host that a player joined the game
				opponent.Conn.WriteJSON(messages.Default{Type: messages.NEW_PLAYER, Data: p.Nickname})
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
