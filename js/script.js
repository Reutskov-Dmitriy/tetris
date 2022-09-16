const board = document.querySelector('.tetris__board');
const line = document.querySelector('.tetris__lines');
const score = document.querySelector('.tetris__score');

const colors = ['', 'yellow', 'orange', 'red', 'magenta', 'blue', 'cyan', 'green'];
const bricks = [
	{
		state: [
			[6, 6, 6, 6],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		],
		y: 0,
		x: 3,
	},

	{
		state: [
			[5, 0, 0],
			[5, 5, 5],
			[0, 0, 0],
		],
		y: 0,
		x: 4,
	},

	{
		state: [
			[0, 0, 2],
			[2, 2, 2],
			[0, 0, 0],
		],
		y: 0,
		x: 3,
	},

	{
		state: [
			[1, 1],
			[1, 1],
		],
		y: 0,
		x: 4,
	},

	{
		state: [
			[0, 7, 7],
			[7, 7, 0],
			[0, 0, 0],
		],
		y: 0,
		x: 3,
	},

	{
		state: [
			[0, 4, 0],
			[4, 4, 4],
			[0, 0, 0],
		],
		y: 0,
		x: 4,
	},

	{
		state: [
			[3, 3, 0],
			[0, 3, 3],
			[0, 0, 0],
		],
		y: 0,
		x: 4,
	},
];

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
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
	[1, 1, 0, 1, 1, 1, 1, 1, 1, 1,],
]

const brick = {
	state: [
		[0, 0, 2],
		[2, 2, 2],
		[0, 0, 0],
	],
	y: 0,
	x: 4,
}


tick()

render()

onkeydown = (e) => {
	if (e.key === 'ArrowLeft') tryMove(-1, 0);
	else if (e.key === 'ArrowRight') tryMove(1, 0);
	else if (e.key === 'ArrowDown') tryMove(0, 1);
	else if (e.key === ' ' || e.key === 'ArrowUp') tryRotate();

}

function render() {
	state.forEach((row, y) => row.forEach((i, x) => {
		board.rows[y].cells[x].className = colors[i]
	}))

	brick.state.forEach((row, y) => row.forEach((i, x) => {
		if (i) board.rows[y + brick.y].cells[x + brick.x].className = colors[i]
	}))

}

function tick() {
	brick.y++;

	if (doesCollide()) {
		brick.y--;
		stopBrick();
		cleanLine(state);
		// finishGame();
		getNewBrick();
	}
	render();
	setTimeout(tick, 1000);
}

function doesCollide() {
	return brick.state.some((row, y) => row.some((i, x) => {
		return i && state[y + brick.y]?.[x + brick.x];
	})) || brick.state.some((row, y) => row.some((i, x) => {
		return i &&
			(y + brick.y < 0 || y + brick.y > 19 || x + brick.x < 0 || x + brick.x > 9);
	}));
}

function move(x, y) {
	brick.x += x;
	brick.y += y;
}

function tryMove(x, y) {
	move(x, y);
	if (doesCollide()) move(-x, -y);
	render();
}

function stopBrick() {
	brick.state.forEach((row, y) => row.forEach((i, x) => {
		if (i) state[y + brick.y][x + brick.x] = i;
	}))
}

function getNewBrick() {
	Object.assign(brick, bricks[random(bricks.length)])

}

function random(num) {
	return Math.floor(Math.random() * num);
}

function rotate() {
	brick.state = rotateArr(brick.state);
}


function tryRotate() {
	const previousState = brick.state;
	rotate();
	if (doesCollide()) brick.state = previousState;
	render();
}

function rotateArr(arr) {
	const newArr = [];

	for (let i = 0; i < arr.length; i++) {
		newArr.push([])

		for (let j = 0; j < arr[i].length; j++) {
			newArr[i][j] = arr[arr[i].length - 1 - j][i]
		}
	}

	return newArr
}

// function finishGame() {

// 	{
// 		return alert('Game Over')

// 	}
// }

function cleanLine(arr) {

	for (let i = arr.length - 1; i >= 0; i--) {
		const newArr = [];

		for (let j = 0; j < arr[i].length; j++) {
			if (arr[i][j] > 0) {
				newArr.push(arr[i][j])
			}
		}

		if (newArr.length == arr[0].length) {
			arr[i].splice(0, arr[i].length) && arr.filter(x => x !== []) && arr.unshift()
			render()
		}

	}

}

