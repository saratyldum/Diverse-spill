const squares = document.querySelectorAll('.square');
const mole = document.querySelector('.mole');
const timeLeft = document.querySelector('#time-left');
const score = document.querySelector('#score');
const button = document.querySelector('button')

button.addEventListener('click', moveMole)

let result = 0;
let hitPosition;
let currentTime = 10;
let timerID = null;
let countDownTimerID;


function randomeSquare() {
	squares.forEach(square => {
		square.classList.remove('mole')
	})

	let randomSquare = squares[Math.floor(Math.random() * 9)];
	randomSquare.classList.add('mole');

	hitPosition = randomSquare.id;
}

squares.forEach(square => {
	square.addEventListener('mousedown', () => {
		if(square.id == hitPosition) {
			result++
			score.textContent = result;
			hitPosition = null;
		}
	})
})

function moveMole() {
	timerID = setInterval(randomeSquare, 500)
	countDownTimerID = setInterval(countDown, 1000)
}

function countDown() {
	currentTime--;
	timeLeft.textContent = currentTime;

	if(currentTime === 0 ){
		clearInterval(countDownTimerID);
		clearInterval(timerID);
		alert('GAME OVER! Your final score is ' + result)
	}
}