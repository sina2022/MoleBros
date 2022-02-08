const holes = document.querySelectorAll('.boxMole');
console.log(holes);
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let timeUp = false;
let score = 0;
let lastHole;
let timerId;
let timeLeft;

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
    hole.classList.add('popped');
    setTimeout(() => {
        hole.classList.remove('popped');
        if (!timeUp) peep();
    }, time);
}

function startGame() {
    document.getElementById("btnStart").disabled = true;
    pointCount.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    timeLeft = 5;
    timerId = setInterval(countdown, 1000);
    setTimeout(() => timeUp = true, 5000);

}

function whack(e) {
    score++;
    this.parentNode.classList.remove('popped');
    pointCount.textContent = score;
}
moles.forEach(mole => mole.addEventListener('click', whack));


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