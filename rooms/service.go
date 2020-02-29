package rooms

import (
	"github.com/gofrs/uuid"
	"github.com/gorilla/websocket"
)

// Rooms map
var Rooms = make(map[string][]Client)

// // Room whatever
// type Room struct {
// 	ID      string `json:"id"`
// 	Clients []Client
// }

// Client interface
type Client struct {
	Nickname string
	Conn     *websocket.Conn `json:"-"`
}

// RoomDTO room data transfer object
// type RoomDTO struct {
// 	Rooms []Room `json:"rooms"`
// }

// CreateRoom create a room with a player
func CreateRoom(conn *websocket.Conn, nickname string) string {
	client := Client{Nickname: nickname, Conn: conn}
	clientSlice := make([]Client, 2)
	clientSlice[1] = client
	roomID := uuid.Must(uuid.NewV4()).String()
	Rooms[roomID] = clientSlice
	return roomID
}
