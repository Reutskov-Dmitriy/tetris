const board = document.getElementById('board');
const colors = ['', 'yellow', 'orange', 'red', 'magente', 'blue', 'cyan', 'green'];
const state = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
	[0, 0, 0, 0, 1, 1, 0, 0, 0, 0,],
	[6, 6, 6, 0, 1, 1, 0, 0, 0, 0,],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
]

const brick = {
	state: [
		[0, 0, 2],
		[2, 2, 2],
		[0, 0, 0],
	],
	y: 7,
	x: 3,
}

render()

function render() {
	state.forEach((row, y) => row.forEach((i, x) => {
		board.rows[y].cells[x].className = colors[i]
	}))

	brick.state.forEach((row, y) => row.forEach((i, x) => {
		if (i) board.rows[y + brick.y].cells[x + brick.x].className = colors[i]
	}))
}

