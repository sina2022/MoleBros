//Imports and DOM constants
const heyNavi = new Audio('./Sounds/navi_hey.mp3');
const bgMusic = new Audio('./Sounds/Toddler Band - Godmode.mp3');
const holes = document.querySelectorAll('.boxMole');
const scoreDisplay = document.querySelector('#pointCount');
const diglett = document.querySelectorAll('.mole');
const timerDisplay = document.getElementById('gameTimer');
const startButton = document.getElementById("startGame");

//Initialize variables and settings
let lastHole, timerId, timeLeft;
let totalTime = false;
let score = 0;
let highScore = 0;
let clicked = false;
bgMusic.volume = 0.2;

alert("Instructions: Click on the moles that pop up to get a point!");

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
    if (!clicked) {
        clicked = true;
        startButton.textContent = "Good Luck";
        scoreDisplay.textContent = "Score: " + 0;
        totalTime = false;
        timeLeft = 30;
        score = 0;

        popMole();
        timerId = setInterval(countdownTimer, 1000);
        setTimeout(() => totalTime = true, 30000);
        bgMusic.play();
    }
}

//Hit mole once it pops up and add score
function hitMole(event) {
    score++;
    this.parentNode.classList.remove('popped');
    scoreDisplay.textContent = "Score: " + score;
    heyNavi.play();
}

//Count down time and display remaining time
function countdownTimer() {
    if (timeLeft == -1) {
        clearTimeout(timerId);
        bgMusic.pause();
        clicked = false;
        startButton.textContent = "Start";
        timerDisplay.textContent = "Timer";

        let finalScore = score;
        if (highScore < finalScore) {
            highScore = finalScore;
        }
        document.getElementById("highScore").textContent = "Highscore: " + highScore;
    } else {
        timerDisplay.textContent = timeLeft + 's';
        timeLeft--;
    }
}

//Event Listeners
diglett.forEach(mole => mole.addEventListener('mousedown', hitMole));


//variable used to toggle between light and dark mode
let toggle = false;

//darkmode
function darkMode() {
    document.getElementById("btnTheme").style.backgroundImage = "url('Photos/lightmode.png')";
    document.getElementsByTagName("header")[0].style.border = "1px solid black";
    document.getElementsByTagName("footer")[0].style.border = "1px solid black";
    document.getElementsByTagName("main")[0].style.border = "1px solid black";
    $(".boxMole").css("border", "1px solid black");
    $("#pointCount").css("border", "1px solid black");
    $("#gameTimer").css("border", "1px solid black");
    $("#highScore").css("border", "1px solid black");
    $("#startGame").css("border", "1px solid black");
    document.getElementsByTagName("header")[0].style.backgroundColor = "#4e4e4e";
    document.getElementsByTagName("header")[0].style.color = "#ffffff";
    document.getElementsByTagName("main")[0].style.backgroundColor = "#686868";
    document.getElementsByTagName("footer")[0].style.backgroundColor = "#4e4e4e";
    document.getElementsByTagName("footer")[0].style.color = "#ffffff";
    document.getElementById("pointCount").style.backgroundColor = "#686868";
    document.getElementById("highScore").style.backgroundColor = "#686868";
    document.getElementById("gameTimer").style.backgroundColor = "#686868";
    document.getElementById("startGame").style.backgroundColor = "#686868";
    document.getElementById("startGame").style.color = "#05c405";

    toggle = true;
}

//lightmode
function lightMode() {
    document.getElementById("btnTheme").style.backgroundImage = "url('Photos/darkmode.png')";
    let styled = document.querySelectorAll("*[style]");
    for (i = 0; i < styled.length; i++) {
        styled[i].removeAttribute("style");
    }

    toggle = false;
}

//functio to toggle between modes
function drkModeToggle() {
    toggle ? lightMode() : darkMode();
}