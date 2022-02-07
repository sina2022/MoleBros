const holes = document.querySelectorAll('.boxMole');
console.log(holes);
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let timeUp = false;
let score = 0;
let lastHole;

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
    pointCount.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 15000)
}

function whack(e) {
    if (!e.isTrusted) return;
    score++;
    this.parentNode.classList.remove('up');
    pointCount.textContent = score;
}
moles.forEach(mole => mole.addEventListener('click', whack));