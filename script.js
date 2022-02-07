//Imports and constants
const heyNavi = new Audio("./Sounds/navi_hey.mp3");
const bgMusic = new Audio("./sounds/Toddler Band - Godmode.mp3");
const moleHoles = document.querySelectorAll(".mole");
const totalBoxes = document.querySelectorAll(".ground").length;
const scoreDisplay = document.getElementById("point");

//Initialize variables
let lastMoleHole;
let countDown = false;
let score = 0;

moleHoles.forEach(hole => hole.addEventListener('mousedown', hitMole));

// Choose a random time between 0.25-1.2 seconds
function randomTime() {
    return Math.random() * (1200 - 250) + 250;
}

//Chooses a random mole hole. If it's the same one, it goes through the loop again.
function randomMoleHole(holes) {
    const iHole = Math.floor(Math.random() * totalBoxes);
    const hole = holes[iHole];
    if (lastMoleHole === hole) {
        return randomMoleHole(holes);
    }
    lastMoleHole = hole;
    return hole;
}

//Makes the mole appear and disappear depending on random time from randomTime
function popMole() {
    const randomTime = randomTime();
    const hole = randomMoleHole(holes);
    moleHoles.classList.add("popped");

    setTimeout(() => {
        if (!countDown) popMole();
        moleHoles.classList.remove("popped")
    }, randomTime());
}

//Starts the game with a countdown timer of 30 seconds. 
function gameStart() {
    scoreDisplay.textContent = 0;
    score = 0;
    countDown = false;
    popMole();
    setTimeout(()=> countDown = true, 30000)
}

//+1 points for each mole that is hit.
function hitMole(e) {
    score++;
    moleHoles.classList.remove("popped");
    scoreDisplay.textContent = score;
    heyNavi.play();
}

//Event Listeners
document.getElementById("startGame").addEventListener("click", () => {
    gameStart();
    bgMusic.play();
});