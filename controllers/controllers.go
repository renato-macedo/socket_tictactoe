package controllers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
	"github.com/renato-macedo/socket-tic-tac-toe/game"
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
		fmt.Fprintf(w, "It was not possible use WebSocket")
		return
	}

	client := game.NewPlayer(ws)

	go client.Reader()
}

// HTTPController  well, handle all request to the /rooms endpoint
func HTTPController(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")

	switch r.Method {
	case "GET":

		rooms := game.Get()

		jsResp, err := json.Marshal(rooms)
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

// Aux controller delete later
func Aux(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")

	switch r.Method {
	case "GET":

		rooms := game.Aux()

		jsResp, err := json.Marshal(rooms)
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
