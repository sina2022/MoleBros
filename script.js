const heyNavi = new Audio("./Sounds/navi_hey.mp3");
const bgMusic = new Audio("./Sounds/Toddler Band - Godmode.mp3");
const holes = document.querySelectorAll('.boxMole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');

let timeUp = false;
let score = 0;
let lastHole;
let timerId;

function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
        console.log('duplicate hole');
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function peep() {
    const time = 800;
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if (!timeUp) peep();
    }, time);
}

function startGame() {
    document.getElementById("btnStart").disabled = true;
    pointCount.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    timerId = setInterval(countdown, 1000);
    setTimeout(() => timeUp = true, 31000);

}

function whack(e) {
    score++;
    this.parentNode.classList.remove('up');
    pointCount.textContent = score;
}
moles.forEach(mole => mole.addEventListener('click', whack));

var timeLeft = 30;
var elem = document.getElementById('gameTimer');

function countdown() {
    if (timeLeft == -1) {
        clearTimeout(timerId);
        document.getElementById("btnStart").disabled = false;
    } else {
        elem.innerHTML = timeLeft + ' seconds remaining';
        timeLeft--;
    }
}
