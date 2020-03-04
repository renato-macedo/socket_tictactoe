package room

import (
	"fmt"
	"log"

	"github.com/gorilla/websocket"
	"github.com/renato-macedo/socket-tic-tac-toe/game"
)

// Room struct
type Room struct {
	ID    string `json:"id"`
	Host  string `json:"host"`
	Guest string `json:"guest"`
}

// GetRooms return all active rooms
func GetRooms() []Room {

	rooms := make([]Room, 0)
	if len(game.Games) > 0 {

		var guest string
		for key, value := range game.Games {
			host := value.Host.Nickname
			if value.Guest != nil {
				guest = value.Guest.Nickname
			}
			fmt.Println(key, value)
			rooms = append(rooms, Room{ID: key, Host: host, Guest: guest})
		}
	}

	return rooms

}

// CreateRoom create a room with a player
func CreateRoom(conn *websocket.Conn, hostNickname string) string {
	// create player

	host := game.NewPlayer(conn, hostNickname)

	g := game.NewGame(host)

	game.Games[g.ID] = g

	return g.ID
}

// JoinRoom join a room
func JoinRoom(conn *websocket.Conn, roomID, guestNickname string) bool {

	gameroom := game.Games[roomID]

	if gameroom.Guest == nil {

		guest := game.NewPlayer(conn, guestNickname)
		gameroom.Guest = guest
		return true
	}

	log.Println("room is full")
	return false

}
