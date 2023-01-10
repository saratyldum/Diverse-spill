const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#score');
const blockWidth = 100;
const blockHeight = 20;
const boardWidth = 560;
const boardHeight = 300;
const ballDiameter = 20;
let timerID;
let xDirection = 2;
let yDirection = 2;
let score = 0

const userStart = [230, 10];
let currentPosition = userStart;

const ballStart = [270, 40];
let ballCurrentPosition = ballStart;

///create block
class Block {
	constructor(xAxis, yAxis) {
		this.bottomLeft = [xAxis, yAxis]
		this.bottomRight = [xAxis + blockWidth, yAxis]
		this.topLeft = [xAxis, yAxis + blockHeight]
		this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
	}
}

//all my blocks
const blocks = [
	new Block(10,270),
	new Block(120,270),
	new Block(230,270),
	new Block(340,270),
	new Block(450,270),

	new Block(10,240),
	new Block(120,240),
	new Block(230,240),
	new Block(340,240),
	new Block(450,240),

	new Block(10,210),
	new Block(120,210),
	new Block(230,210),
	new Block(340,210),
	new Block(450,210),
]

console.log(blocks[0]);

//drav all my black 
function addBlocks() {
	for (let index = 0; index < blocks.length; index++) {
		const block = document.createElement('div');
		block.classList.add('block');
		block.style.left = blocks[index].bottomLeft[0] + 'px';
		block.style.bottom = blocks[index].bottomLeft[1] + 'px';
		grid.appendChild(block);	
	}
}

addBlocks();

//add user
const user = document.createElement('div');
user.classList.add('user');
drawUser();
grid.appendChild(user);

//draw the user
function drawUser() {
	user.style.left = currentPosition[0] + 'px'
	user.style.bottom = currentPosition[1] + 'px'
}

//draw the ball
function drawBall() {
	ball.style.left = ballCurrentPosition[0] + 'px'
	ball.style.bottom = ballCurrentPosition[1] + 'px'
}

//move user
function moveUser(e) {
	switch(e.key) {
		case 'ArrowLeft':
			if (currentPosition[0] > 0) {
				currentPosition[0] -= 10;
				drawUser();
			}
			break;
		case 'ArrowRight':
			if (currentPosition[0] < boardWidth - blockWidth) {
				currentPosition[0] += 10;
				drawUser()
			}
			break;
	}
}

document.addEventListener('keydown', moveUser);

//add ball
const ball = document.createElement('div');
ball.classList.add('ball');
drawBall();
grid.appendChild(ball);

//move the ball
function moveBall() {
	ballCurrentPosition[0] += xDirection;
	ballCurrentPosition[1] += yDirection;
	drawBall();
	checkForCollisions();
}

timerID = setInterval(moveBall, 20);

//check for collisions
function checkForCollisions() {
	//check for block collisions
	for (let index = 0; index < blocks.length; index++) {
		if (
			(ballCurrentPosition[0] > blocks[index].bottomLeft[0] && ballCurrentPosition[0] < blocks[index].bottomRight[0]) &&
			((ballCurrentPosition[1] + ballDiameter) > blocks[index].bottomLeft[1] && ballCurrentPosition[1] < blocks[index].topLeft[1])
		) {
			const allBlocks = Array.from(document.querySelectorAll('.block'));
			allBlocks[index].classList.remove('block');
			blocks.splice(index, 1);
			changeDirection();
			score++
			scoreDisplay.innerHTML = score;

			//ckeck for win
			if (blocks.length === 0) {
				scoreDisplay.innerHTML = 'You win';
				clearInterval(timerID);
				document.removeEventListener('keydown', moveUser)
			}
		}
	}

	//check for wall collisions
	if (
		ballCurrentPosition[0] >= (boardWidth - ballDiameter) || 
		ballCurrentPosition[1] >= (boardHeight - ballDiameter) ||
		ballCurrentPosition[0] <= 0) {
		changeDirection();
	}

	//ckeck for user colliosiond
	if(
		(ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth) &&
		(ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockHeight)
		) {
			changeDirection();
		}

	//check for game over
	if (ballCurrentPosition[1] <= 0) {
		clearInterval(timerID)
		scoreDisplay.innerHTML = 'You Lose';
		document.removeEventListener('keydown', moveUser)
	}
}

function changeDirection() {
	if(xDirection === 2 && yDirection === 2) {
		yDirection = -2
		return
	} else if(xDirection === 2 && yDirection === -2) {
		xDirection = -2;
		return
	} else if(xDirection === -2 && yDirection === -2) {
		yDirection =2;
		return
	} else if(xDirection === -2 && yDirection === 2) {
		xDirection = 2;
		return
	}
}