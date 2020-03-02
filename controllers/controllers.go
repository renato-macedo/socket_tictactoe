package controllers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
	"github.com/renato-macedo/socket-tic-tac-toe/room"
	"github.com/renato-macedo/socket-tic-tac-toe/socket"
)

// Error is a commom interface to error responses
type Error struct {
	Status  int    `json:"status"`
	Message string `json:"message"`
}

// Reader handle all websocket connections
func reader(conn *websocket.Conn) {
	for {
		// new message
		var msg socket.Message
		err := conn.ReadJSON(&msg)
		if err != nil {
			log.Printf("error: %v", err)
			// TODO handle this
			break
		}

		switch msg.Type {
		case "create":
			payload := room.CreateRoom(conn, msg.Data.Nickname)
			conn.WriteJSON(socket.Message{Type: "created", Data: payload})

		case "join":
			fmt.Println("data:", msg.Data)
			success := room.JoinRoom(conn, msg.Data)
			if success == true {
				opponent := room.Rooms[msg.Data.RoomID][0]
				conn.WriteJSON(socket.Message{Type: "joined", Data: socket.Payload{Nickname: opponent.Nickname, RoomID: msg.Data.RoomID}})

				fmt.Println(room.Rooms)

				fmt.Println("opponent", opponent)
				opponent.Conn.WriteJSON(socket.Message{Type: "newplayer", Data: msg.Data})
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
	socket.Upgrader.CheckOrigin = func(r *http.Request) bool { return true }

	ws, err := socket.Upgrader.Upgrade(w, r, nil)

	if err != nil {
		log.Println(err)
	}

	reader(ws)
}

// HTTPController  well, handle all request to the /rooms endpoint
func HTTPController(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")

	switch r.Method {
	case "GET":
		roomSlice := room.GetRooms()

		jsResp, err := json.Marshal(roomSlice)
		if err != nil {
			panic(err)
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(jsResp)

	default:
		e := Error{http.StatusBadRequest, "Invalid Method"}
		jsResp, err := json.Marshal(e)
		if err != nil {
			panic(err)
		}
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		w.Write(jsResp)
	}
}
