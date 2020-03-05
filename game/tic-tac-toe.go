package game

import (
	"fmt"
	"log"

	"github.com/gofrs/uuid"
	"github.com/renato-macedo/socket-tic-tac-toe/messages"
)

// Games map Database
var Games = make(map[string]*Game)

// Game struct
type Game struct {
	ID    string  `json:"id"`
	Host  *Player `json:"host"`
	Guest *Player `json:"guest"`
}

// CreateGame create a game with a player
func CreateGame(host *Player) string {

	id := uuid.Must(uuid.NewV4()).String()
	game := Game{ID: id, Host: host}
	Games[game.ID] = &game
	log.Println("game created:", game.ID)
	return game.ID
}

// JoinGame join a game
func JoinGame(gameID string, guest *Player) (success bool) {

	gameroom := Games[gameID]
	log.Println("game:", gameroom)
	if gameroom != nil && gameroom.Guest == nil {
		gameroom.Guest = guest
		return true
	}
	log.Println("room is full or do not exist")
	return false

}

// Get return all games Rooms return all active rooms
func Get() []messages.Room {

	rooms := make([]messages.Room, 0)
	if len(Games) > 0 {

		numberOfPlayers := 1
		for key, value := range Games {

			host := value.Host.Nickname
			if value.Guest != nil {
				numberOfPlayers++
			}
			fmt.Println(key, value)
			rooms = append(rooms, messages.Room{ID: key, Title: host + "'s game", NumberOfPlayers: numberOfPlayers})
		}
	}

	return rooms

}
