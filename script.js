const heyNavi = new Audio("/Sounds/navi_hey.mp3");
const bgMusic = new Audio("/Sounds/Toddler Band - Godmode.mp3");
const moleHoles = document.querySelectorAll('.boxMole');
console.log(holes);
const scoreDisplay = document.querySelector('.score');
const moleIMG = document.querySelectorAll('.mole');

let countDown = false;
let score = 0;
let lastHole;

// Choose a random time between 0.5-1.2 seconds
function randomTime() {
    return Math.random() * (1200 - 500) + 500;
}

//Chooses a random mole hole. If it's the same one, it goes through the loop again.
function randomMoleHole(holes) {
    const iHole = Math.floor(Math.random() * holes.length);
    const hole = holes[iHole];
    if (hole === lastHole) {
        return randomMoleHole(holes);
    }
    lastHole = hole;
    return hole;
}

//Makes the mole appear and disappear depending on random time from randomTime
function popMole() {
    const timeRand = randomTime();
    const hitMole = randomMoleHole(moleHoles);
    hitMole.classList.add('popped');
    console.log("hit");
    
    setTimeout(() => {
        hitMole.classList.remove('popped');
        if (!countDown) popMole();
    }, timeRand);
}

//Starts the game with a countdown timer of 30 seconds. 
function playGame() {
    scoreDisplay.textContent = 0;
    countDown = false;
    score = 0;
    popMole();
    setTimeout(() => countDown = true, 30000);
}

//+1 points for each mole that is hit.
function hitMole(e) {
    score++;
    this.parentNode.classList.remove('popped');
    scoreDisplay.textContent = score;
    heyNavi.play();
}

//Event Listeners
moleIMG.forEach(mole => mole.addEventListener('click', hitMole));
