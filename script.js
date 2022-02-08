const heyNavi = new Audio('./Sounds/navi_hey.mp3');
const bgMusic = new Audio('./Sounds/Toddler Band - Godmode.mp3');
const holes = document.querySelectorAll('.boxMole');
const scoreDisplay = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');

let timeUp = false;
let score = 0;
let lastHole;
let timerId;
let timeLeft;

function randomTime() {
    return Math.round(Math.random() * (1200 - 400) + 400);
}
function randomMoleHole(holes) {
    const iHole = Math.floor(Math.random() * holes.length);
    const hole = holes[iHole];
    if (hole === lastHole) {
        return randomMoleHole(holes);
    }
    lastHole = hole;
    return hole;
}

function popMole() {
    const time = randomTime();
    const hole = randomMoleHole(holes);
    hole.classList.add('popped');
    setTimeout(() => {
        hole.classList.remove('popped');
        if (!timeUp) popMole();
    }, time);
}

function startGame() {
    document.getElementById("btnStart").disabled = true;
    scoreDisplay.textContent = 0;
    timeUp = false;
    score = 0;
    popMole();
    timeLeft = 5;
    timerId = setInterval(countdown, 1000);
    setTimeout(() => timeUp = true, 30000);

}

function hitMole(e) {
    score++;
    this.parentNode.classList.remove('popped');
    scoreDisplay.textContent = score;
    heyNavi.play();
}

moles.forEach(mole => mole.addEventListener('click', hitMole));


let elem = document.getElementById('gameTimer');

function countdown() {
    if (timeLeft == -1) {
        clearTimeout(timerId);
        document.getElementById("btnStart").disabled = false;
    } else {
        elem.innerHTML = timeLeft + ' seconds remaining';
        timeLeft--;
    }
}