package game

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
