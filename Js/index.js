// Variables para elementos del DOM
const cardGrid = document.getElementById("card-grid");
const cards = document.querySelectorAll(".card");
const btnRestart = document.getElementById("btn-restart");
const movementCounter = document.querySelectorAll(".movementCounter");
const minutesDisplay = document.querySelectorAll(".minutes");
const secondsDisplay = document.querySelectorAll(".seconds");
const resultsPanel = document.getElementById("results-panel");

let matchedPairs = 0;
let selectedCards = [];
let selectedImages = [];
let moveCount = 0;
let minutes = 0;
let seconds = 0;

// Evento principal para voltear las cartas
cardGrid.addEventListener("click", (e) => {
  if (matchedPairs === 9) {
    setTimeout(() => {
      resultsPanel.classList.remove("hidden");
    }, 1500);
  }

  flipCard(e);
});

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
      moveCounter[0].textContent = ++moveCount;
    }
  
    checkMatch();
  }
}

// Verificar si las dos cartas seleccionadas son iguales
function checkMatch() {
  if (selectedImages.length === 2) {
    if (selectedImages[0] === selectedImages[1]) {
      matchedPairs++;
      resetSelection();
    } else {
      setTimeout(unflipCards, 750);
    }
  }
}

// Desvoltear las cartas si no coinciden
function unflipCards() {
  selectedCards.forEach(card => card.classList.remove("flipped"));
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
  cards.forEach(card => card.classList.remove("flipped"));
  startTimer();
  resetGame();
});

// Función para reiniciar el juego
function resetGame() {
  minutes = 0;
  seconds = 0;
  moveCount = 0;
  matchedPairs = 0;
  moveCounter.forEach(counter => counter.textContent = moveCount);
}

// Función para controlar el temporizador
function startTimer() {
  const timerInterval = setInterval(() => {
    seconds++;
    secondsDisplay[0].textContent = seconds;

    if (seconds === 60) {
      minutes++;
      seconds = 0;
      minutesDisplay[0].textContent = minutes;
    }

    if (matchedPairs === 9) {
      clearInterval(timerInterval);
      resultsPanel.classList.remove("hidden");
      moveCounter[1].textContent = moveCount;
      document.querySelector(".final-time").textContent = 
        `in ${minutes} minutes and ${seconds} seconds!`;
    }
  }, 1000);
}

shuffleCards();


/* const file = document.getElementById("file")
const img = document.getElementById("img")

file.addEventListener("change",(e)=>{
  console.log("Que Fue :S")
  let archivo = e.target.files[0];
  let reader = new FileReader();

  reader.onload = function(e){
    let image = e.target.result;
    img.src=image
    
  }
  reader.readAsDataURL(archivo)
}) */
