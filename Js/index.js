const parent_box = document.getElementById("parent_box");
const box_card = document.querySelectorAll(".box_card");
const btn_random = document.getElementById("btn_random");
const countMove = document.querySelectorAll(".countMove");
const time = document.querySelectorAll(".time");
const panel_results = document.getElementById("panel_results");
let ArrayPoke = [];
let ArrayCard = [];
let Move = 0;
let movecorrect = 0;
let minute = 0;
let seconds = 0;

container.addEventListener("click", (e) => {
  if (movecorrect === 9) {
    setTimeout(() => {
      panel_results.classList.remove("hidden");
    }, 1500);
  }
  if (ArrayCard.length === 1) {
    countMove[0].textContent = Move += 1;
  }
  FlipCard(e);
});

const FlipCard = (e) => {
  let value = e.target.classList.contains("front");
  if (value) {
    e.target.parentElement.classList.add("flip");
    let BoxCard = e.target.parentElement;
    let image =
      e.target.parentElement.children[1].children[0].getAttribute("src");
    ArrayPoke.push(image);
    ArrayCard.push(BoxCard);
    VerificationArrayPoke();
  }
};

const VerificationArrayPoke = () => {
  if (ArrayPoke.length > 1) {
    if (ArrayPoke[0] === ArrayPoke[1]) {
      ArrayPoke = [];
      ArrayCard = [];
      movecorrect++;
      console.log(movecorrect);
    } else {
      CleanItems();
    }
  }
};

const CleanItems = () => {
  setTimeout(() => {
    ArrayCard[0].classList.remove("flip");
    ArrayCard[1].classList.remove("flip");
    ArrayPoke = [];
    ArrayCard = [];
  }, 750);
};

const ramdon = () => {
  for (let index = parent_box.children.length; index >= 0; index--) {
    parent_box.appendChild(parent_box.children[(Math.random() * index) | 0]);
  }
  panel_results.classList.add("hidden");
};

ramdon();

btn_random.addEventListener("click", () => {
  ramdon();
  for (let index of box_card) {
    index.classList.remove("flip");
  }
  timrun();
  minute=0;
  seconds=0;
  Move=0;
});

function timrun(){
  const temporizador = setInterval(() => {
   
    seconds++;
  
    time[1].textContent = seconds;
  
    if (seconds === 60) {
      minute++;
      seconds = 0;
      time[0].textContent = minute;
    }
  
    if (movecorrect === 9) {
      clearInterval(temporizador);
      movecorrect = 0;
      panel_results.classList.remove("hidden");
      countMove[1].textContent = Move ;
      time[2].textContent = `en ${minute} minuto y ${seconds} segundos!!`;

    }
  }, 1000);
}

timrun();

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
