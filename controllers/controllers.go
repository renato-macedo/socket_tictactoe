package controllers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
	"github.com/renato-macedo/socket-tic-tac-toe/game"
	"github.com/renato-macedo/socket-tic-tac-toe/messages"
	"github.com/renato-macedo/socket-tic-tac-toe/room"
)

// Error is a commom interface to error responses
type Error struct {
	Status  int    `json:"status"`
	Message string `json:"message"`
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

// Reader handle all websocket connections
func reader(conn *websocket.Conn) {
	for {
		// new message

		message := map[string]string{}
		err := conn.ReadJSON(&message)
		if err != nil {
			log.Printf("error: %v", err)
			// TODO handle this
			break
		}

		fmt.Println("message", message)
		switch message["type"] {

		case "create":
			roomID := room.CreateRoom(conn, message["nickname"])
			conn.WriteJSON(messages.Default{Type: "created", Data: roomID})

		case "join":

			success := room.JoinRoom(conn, message["id"], message["nickname"])
			if success == true {

				opponent := game.Games[message["id"]].Host

				// tell the player who is the host
				conn.WriteJSON(messages.Default{Type: "joined", Data: opponent.Nickname})

				// tell the host that a player joined the game
				opponent.Conn.WriteJSON(messages.Default{Type: "newplayer", Data: message["nickname"]})
			}

		}

	}
}

// WsController handle all websocket requests
func WsController(w http.ResponseWriter, r *http.Request) {

	if websocket.IsWebSocketUpgrade(r) != true {
		fmt.Fprintf(w, "Dude, you are using http...")
		return
	}
	upgrader.CheckOrigin = func(r *http.Request) bool { return true }

	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
	}

	go reader(ws)
}

// HTTPController  well, handle all request to the /rooms endpoint
func HTTPController(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")

	switch r.Method {
	case "GET":
		roomSlice := room.GetRooms()
		fmt.Println("rooms: ", roomSlice)
		jsResp, err := json.Marshal(roomSlice)
		if err != nil {
			panic(err)
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(jsResp)

	default:

		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}
