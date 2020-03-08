package game

import "github.com/renato-macedo/socket-tic-tac-toe/messages"

func (g *Game) notifyHost(t, data string) {
	g.Host.Conn.WriteJSON(messages.Default{Type: t, Data: data})
}
func (g *Game) notifyGuest(t, data string) {
	g.Guest.Conn.WriteJSON(messages.Default{Type: t, Data: data})
}
func (g *Game) notifyAll(t, data string) {
	g.Host.Conn.WriteJSON(messages.Default{Type: t, Data: data})
	g.Guest.Conn.WriteJSON(messages.Default{Type: t, Data: data})
}
