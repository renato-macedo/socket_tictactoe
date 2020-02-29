package socket

import (
	"fmt"
	"log"
	"net/http"

	"github.com/renato-macedo/socket-tic-tac-toe/rooms"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

// WebSocketHandler handle request to the ws endpoint
func WebSocketHandler(w http.ResponseWriter, r *http.Request) {

	if websocket.IsWebSocketUpgrade(r) != true {
		fmt.Fprintf(w, "Dude, you are using http...")
		return
	}
	upgrader.CheckOrigin = func(r *http.Request) bool { return true }

	ws, err := upgrader.Upgrade(w, r, nil)

	if err != nil {
		log.Println(err)
	}

	reader(ws)

}

func reader(conn *websocket.Conn) {
	for {
		var msg Message

		err := conn.ReadJSON(&msg)
		if err != nil {
			log.Printf("error: %v", err)
			// TODO handle this
			break
		}

		if msg.Type == "create" {
			roomID := rooms.CreateRoom(conn, msg.Payload)
			conn.WriteJSON(Message{Type: "Created", Payload: roomID})
		}

	}
}
