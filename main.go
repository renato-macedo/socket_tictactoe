package main

import (
	"log"
	"net/http"

	"github.com/renato-macedo/socket-tic-tac-toe/controllers"
)

func main() {

	initRoutes()
	log.Println("http server started on :3000")
	log.Fatal(http.ListenAndServe(":3000", nil))
}

func initRoutes() {
	fs := http.FileServer(http.Dir("./web/dist"))
	http.Handle("/", fs)

	http.HandleFunc("/ws", controllers.WsController)
	http.HandleFunc("/rooms", controllers.HTTPController)

}
