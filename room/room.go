package room

import (
	"fmt"
	"log"

	"github.com/gofrs/uuid"
	"github.com/gorilla/websocket"
	"github.com/renato-macedo/socket-tic-tac-toe/socket"
)

// Rooms map Database
var Rooms = make(map[string][]Player)

// Room struct
type Room struct {
	ID      string   `json:"id"`
	Players []Player `json:"players"`
}

// Player struc
type Player struct {
	ID       string
	Nickname string
	Conn     *websocket.Conn `json:"-"`
}

// GetRooms return all active rooms
func GetRooms() []Room {

	roomSlice := make([]Room, 0)
	if len(Rooms) > 0 {
		for key, value := range Rooms {

			roomSlice = append(roomSlice, Room{ID: key, Players: value})
		}
	}

	return roomSlice

}

// CreateRoom create a room with a player
func CreateRoom(conn *websocket.Conn, nickname string) socket.Payload {
	// create player
	p := Player{Nickname: nickname, Conn: conn}

	// add player to a slice
	players := make([]Player, 1)
	players[0] = p

	// create room ID
	roomID := uuid.Must(uuid.NewV4()).String()

	// add players to the room
	Rooms[roomID] = players

	// return info
	return socket.Payload{Nickname: nickname, RoomID: roomID}
}

// JoinRoom join a room
func JoinRoom(conn *websocket.Conn, data socket.Payload) bool {

	fmt.Println("data: ", data)
	players := Rooms[data.RoomID]
	fmt.Println(players)
	if len(players) == 1 {
		player := Player{Nickname: data.Nickname, Conn: conn}
		players = append(players, player)
		Rooms[data.RoomID] = players
		return true
	}
	log.Println("room is full")
	return false

}
