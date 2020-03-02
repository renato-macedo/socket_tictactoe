package socket

import "github.com/gorilla/websocket"

// Message interface
type Message struct {
	Type string  `json:"type"`
	Data Payload `json:"data"`
}

// Payload asasa
type Payload struct {
	Nickname string `json:"nickname"`
	RoomID   string `json:"roomID"`
}

// Upgrader definition
var Upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}
