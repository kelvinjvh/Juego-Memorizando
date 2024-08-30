// Variables para elementos del DOM
const panelStart = document.getElementById("panelStart");
const cardGrid = document.getElementById("card-grid");
const cards = document.querySelectorAll(".card");
const btnRestart = document.getElementById("btn-restart");
const movementCounter = document.querySelectorAll(".movementCounter");
const minutesDisplay = document.querySelector(".minutes");
const secondsDisplay = document.querySelectorAll(".seconds");
const resultsPanel = document.getElementById("results-panel");

let matchedPairs = 0;
let selectedCards = [];
let selectedImages = [];
let moveCount = 0;
let minutes = 0;
let seconds = 0;
let StartTime = false;

// Evento principal para voltear las cartas
document.addEventListener("click", (e) => {
  flipCard(e);
  hiddenpanelStart(e)
});

function hiddenpanelStart(e){
  console.log(e.target.classList[0]==="btnStart")
  if(e.target.classList[0]==="btnStart"){
    panelStart.classList.add("hidden");
    startTimer();
  }
}
// Función para voltear cartas
function flipCard(e) {
  const isFront = e.target.classList.contains("card-front");
  if (isFront) {
    e.target.parentElement.classList.add("flipped");
    const currentCard = e.target.parentElement;
    const imgSrc = currentCard.querySelector("img").getAttribute("src");

    selectedCards.push(currentCard);
    selectedImages.push(imgSrc);
    if (selectedCards.length > 1) {
      movementCounter[0].textContent = ++moveCount;
      movementCounter[1].textContent = `Hicistes ${moveCount} movimientos`;
    }
    checkMatch();
  }
}

// Verificar si las dos cartas seleccionadas son iguales
function checkMatch() {
  if (selectedImages.length === 2) {
    if (selectedImages[0] === selectedImages[1]) {
      resetSelection();
      matchedPairs++;
      if (matchedPairs === 9) {
        setTimeout(() => {
          resultsPanel.classList.remove("hidden");
        }, 1500);
      }
    } else {
      setTimeout(unflipCards, 750);
    }
  }
}

// Desvoltear las cartas si no coinciden
function unflipCards() {
  selectedCards.forEach((card) => card.classList.remove("flipped"));
  resetSelection();
}

// Reiniciar la selección de cartas
function resetSelection() {
  selectedCards = [];
  selectedImages = [];
}

// Función para reordenar las cartas
function shuffleCards() {
  for (let i = cardGrid.children.length; i >= 0; i--) {
    cardGrid.appendChild(cardGrid.children[(Math.random() * i) | 0]);
  }
  resultsPanel.classList.add("hidden");
}

// Evento para reiniciar el juego
btnRestart.addEventListener("click", () => {
  shuffleCards();
  cards.forEach((card) => card.classList.remove("flipped"));
  resetGame();
  startTimer();
  moveCount = 0;
});

// Función para reiniciar el juego
function resetGame() {
  minutes = 0;
  seconds = 0;
  matchedPairs = 0;
  secondsDisplay[0].textContent = seconds;
  minutesDisplay.textContent=minutes
  movementCounter.forEach((counter) => (counter.textContent = 0));
}

// Función para controlar el temporizador
function startTimer() {


  const timerInterval = setInterval(() => {
    seconds++;
    secondsDisplay[0].textContent = seconds;
    minutesDisplay.textContent=minutes
    if (seconds === 60) {
      minutes++;
      seconds = 0;
      minutesDisplay[0].textContent = minutes;
    }

    if (matchedPairs === 9) {
      clearInterval(timerInterval);
      resultsPanel.classList.remove("hidden");
      document.querySelector(
        ".final-time"
      ).textContent = `En ${minutes} minutos y ${seconds} segundos!`;
    }
  }, 1000);
}

shuffleCards();


