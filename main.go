package main

import (
	"log"
	"net/http"

	"github.com/renato-macedo/socket-tic-tac-toe/rooms"

	"github.com/renato-macedo/socket-tic-tac-toe/socket"
)

func main() {

	initRoutes()
	log.Println("http server started on :3000")
	log.Fatal(http.ListenAndServe(":3000", nil))
}

func initRoutes() {
	fs := http.FileServer(http.Dir("./client/dist"))
	http.Handle("/", fs)

	http.HandleFunc("/ws", socket.WebSocketHandler)
	http.HandleFunc("/rooms", rooms.EndpointHandler)
}
