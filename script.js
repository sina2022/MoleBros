const heyNavi = new Audio('./Sounds/navi_hey.mp3');
const bgMusic = new Audio('./Sounds/Toddler Band - Godmode.mp3');
const holes = document.querySelectorAll('.boxMole');
const scoreDisplay = document.querySelector('#pointCount');
const diglett = document.querySelectorAll('.mole');
const timerDisplay = document.getElementById('gameTimer');

let totalTime = false;
let score = 0;
let lastHole;
let timerId;
let timeLeft;
bgMusic.volume = 0.2;

//Generate a random time from a range from 0.4-1.2s
function randomTime() {
    return Math.round(Math.random() * (1200 - 400) + 400);
}

//Choose a random hole to pop out from
function randomMoleHole(holes) {
    const iHole = Math.floor(Math.random() * holes.length);
    const hole = holes[iHole];
    if (hole === lastHole) {
        return randomMoleHole(holes);
    }
    lastHole = hole;
    return hole;
}

//Make random moles pop up from screen
function popMole() {
    const timeRand = randomTime();
    const hole = randomMoleHole(holes);
    hole.classList.add('popped');
    setTimeout(() => {
        hole.classList.remove('popped');
        if (!totalTime) popMole();
    }, timeRand);
}

//Start Game functionality
function startGame() {
    document.getElementById("btnStart").disabled = true;
    scoreDisplay.textContent = "Score: " + 0;
    totalTime = false;
    score = 0;
    popMole();
    timeLeft = 30;
    timerId = setInterval(countdownTimer, 1000);
    setTimeout(() => totalTime = true, 30000);
    bgMusic.play();
}

//Hit mole once it pops up and add score
function hitMole(e) {
    score++;
    this.parentNode.classList.remove('popped');
    scoreDisplay.textContent = "Score: " + score;
    heyNavi.play();
}

//Count down time and display remaining time
function countdownTimer() {
    if (timeLeft == -1) {
        clearTimeout(timerId);
        document.getElementById("btnStart").disabled = false;
        bgMusic.pause();
    } else {
        timerDisplay.innerHTML = timeLeft + ' seconds remaining';
        timeLeft--;
    }
}

//Event Listeners
diglett.forEach(mole => mole.addEventListener('click', hitMole));

