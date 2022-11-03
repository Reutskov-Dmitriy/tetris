const board = document.querySelector('.tetris__board');
const inputLevel = document.querySelector('.tetris__level');
const inputLines = document.querySelector('.tetris__lines');
const inputScore = document.querySelector('.tetris__score');
const down = document.getElementById('down');
const left = document.getElementById('left');
const right = document.getElementById('right');
const rotateRight = document.getElementById('rotate');
const btnStart = document.querySelector('.tetris__start');
const btnPause = document.querySelector('.tetris__pause');
let amountLine;
let level = 1;
let lines = 0;
let score = 0;
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
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
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

btnStart.onclick = start;

function start() {
	inputLevel.innerHTML = level;
	tick();
	render();
}

function pause() {

}

onkeydown = (e) => {
	if (e.key === 'ArrowLeft') tryMove(-1, 0);
	else if (e.key === 'ArrowRight') tryMove(1, 0);
	else if (e.key === 'ArrowDown') tryMove(0, 1);
	else if (e.key === ' ' || e.key === 'ArrowUp') tryRotate();

}

left.onclick = () => {
	tryMove(-1, 0);
}
right.onclick = () => {
	tryMove(1, 0);
}

rotateRight.onclick = () => {
	tryRotate();
}

down.onclick = () => {
	tryMove(0, 1);
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
		finishGame(state);
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

function finishGame(arr) {
	if (arr[0].some(x => x > 0)) {
		return alert('Game Over')

	}
}

function cleanLine(arr) {
	amountLine = 0;
	for (let i = arr.length - 1; i >= 0; i--) {

		if (arr[i].every(x => x > 0)) {
			arr.splice(i, 1) && arr.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
			amountLine += 1;
			i = arr.length;
			sumLines(amountLine)
		}
	}
	countingScore();
	render()


}
function sumLines(num) {
	inputLines.innerHTML = lines += num;
}

function countingScore() {
	if (amountLine === 1) {
		inputScore.innerHTML = score += 100;
	}
	else if (amountLine === 2) {
		inputScore.innerHTML = `${score += 300}`

	}
	else if (amountLine === 3) {
		inputScore.innerHTML = `${score += 700}`
	}
	else if (amountLine === 4) {
		inputScore.innerHTML = `${score += 1500}`
	}
}