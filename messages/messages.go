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
