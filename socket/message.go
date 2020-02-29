package socket

// Message interface
type Message struct {
	Type    string `json:"type"`
	Payload string `json:"payload"`
}
