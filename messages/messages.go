package messages

// Default message
type Default struct {
	Type string `json:"type"`
	Data string `json:"data"`
}

// CreateRoom message
type CreateRoom struct {
	Type     string `json:"type"`
	Nickname string `json:"nickname"`
}

// JoinRoom message
type JoinRoom struct {
	Type     string `json:"type"`
	Nickname string `json:"nickname"`
	RoomID   string `json:"roomID"`
}

// Move message
type Move struct {
	Type     string `json:"type"`
	Player   string `json:"player"`
	Position int    `json:"position"`
}

// Room data transfer object
type Room struct {
	ID              string `json:"id"`
	Title           string `json:"title"`
	NumberOfPlayers int    `json:"num_players"`
}

const (

	// CREATE user wants to create a room
	CREATE string = "create"

	// CREATED room successfully created event
	CREATED string = "created"

	// JOIN user wants to join a room
	JOIN string = "join"

	// JOINED join room successfully event
	JOINED string = "joined"

	//FULL room is full
	FULL string = "full"
	// NEW_PLAYER a player joined the room
	NEW_PLAYER string = "newplayer"

	// MOVE a player made a move
	MOVE string = "move"

	// GUEST_LEFT guest left the game
	GUEST_LEFT string = "gs_left"

	// HOST_LEFT host left the game
	HOST_LEFT string = "hs_left"
)
