package game

import (
	"github.com/gofrs/uuid"
	"github.com/gorilla/websocket"
)

// Games map Database
var Games = make(map[string]*Game)

// Game struct
type Game struct {
	ID    string  `json:"id"`
	Host  *Player `json:"host"`
	Guest *Player `json:"guest"`
}

// Player struc
type Player struct {
	ID       string
	Nickname string
	Conn     *websocket.Conn `json:"-"`
}

// NewGame create a new game with a given host player
func NewGame(host *Player) *Game {
	id := uuid.Must(uuid.NewV4()).String()
	game := &Game{ID: id, Host: host}

	return game

}

// NewPlayer creates a player with a given nickname
func NewPlayer(conn *websocket.Conn, nickname string) *Player {

	id := uuid.Must(uuid.NewV4()).String()
	player := &Player{ID: id, Conn: conn, Nickname: nickname}

	return player
}

// CalculateWinner tells who won the game
func CalculateWinner(squares []string) (hasWinner bool, winner string) {
	lines := [8][3]int{
		{0, 1, 2},
		{3, 4, 5},
		{6, 7, 8},
		{0, 3, 6},
		{1, 4, 7},
		{2, 5, 8},
		{0, 4, 8},
		{2, 4, 6},
	}

	for _, value := range lines {
		a := value[0]
		b := value[1]
		c := value[2]

		if squares[a] == squares[b] && squares[a] == squares[c] {
			return true, squares[a]
		}
	}

	return false, ""
}
