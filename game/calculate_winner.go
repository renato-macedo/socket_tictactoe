package game

// CalculateWinner tells who won the game
func (g *Game) calculateWinner(index int, XO string) (hasWinner bool, draw bool, winner string, sqr [3]int) {

	g.SQUARES[index] = XO

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
		// log.Printf("%v: %v %v: %v %v: %v", a, g.SQUARES[a], b, g.SQUARES[b], c, g.SQUARES[c])
		if g.SQUARES[a] != "" && g.SQUARES[a] == g.SQUARES[b] && g.SQUARES[a] == g.SQUARES[c] {

			return true, false, g.SQUARES[a], [3]int{a, b, c}
		}
	}

	return false, g.checkDraw(), "", [3]int{}
}

func (g *Game) checkDraw() bool {
	for _, value := range g.SQUARES {
		if value == "" {
			return false
		}
	}
	return true
}
