function scrollAppear() {
  var introText = document.querySelector(".intro-text");
  var introImg = document.querySelector(".castle");

  var introPosition = introText.getBoundingClientRect().top;

  var screenPosition = window.innerHeight * 0.8;
  var screenPosition2 = window.innerHeight * 0.5;

  if (introPosition < screenPosition) {
    introText.classList.add("intro-appear");
  }
  if (introPosition < screenPosition2) {
    introImg.classList.add("castle-appear");
  }
}

window.addEventListener("scroll", scrollAppear);

// ----------- Game Modal --------------------------- //

// Get modal element
var overlayOpen = document.getElementsByClassName("overlay-text")[0];
var modal = document.getElementById("simpleModal");
// Get open modal button
var modalBtn = document.getElementById("modalBtn");
// Get close button
var closeBtn = document.getElementsByClassName("closeBtn")[0];

// Listen for open click
modalBtn.addEventListener("click", openModal);
// Listen for close click
closeBtn.addEventListener("click", closeModal);
//Listen for outside click
window.addEventListener("click", outsideClick);

// Function to open modal
function openModal() {
  overlayOpen.style.display = "flex";

  modal.style.display = "block";
  audioMusic.startMusic();
}

// Function to close modal
function closeModal() {
  audioReset.startReset();
  audioMusic.stopMusic();
  modal.style.display = "none";
}

// Function to close modal if outside click
function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = "none";
    audioMusic.stopMusic();
  }
}

// ------ Rock, Paper, and Scissors -------------- //

//Overlay
const overlayClose = document.getElementsByClassName("overlay-text")[0];

overlayClose.addEventListener("click", () => {
  audioReset.startReset();
  overlayClose.style.display = "none";
});

// scoreboard
let userScore = 0;
let computerScore = 0;
let up = true;
let down = true;
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");
const scoreBoard_div = document.querySelector(".score-board");
const result_p = document.querySelector(".result");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("s");

function getComputerChoice() {
  const choices = ["r", "p", "s"];
  const randomNumber = Math.floor(Math.random() * 3);
  return choices[randomNumber];
}

// if userscore = 0 then up = true && down = true

function win(userChoice, computerChoice) {
  const userChoice_div = document.getElementById(userChoice);
  if (up == true) {
    userScore++;
    if (userScore == 5) {
      up = false;
      down = false;
      // Victory

      if (userScore == 5) {
        audioVictory.startVictory();
      }
      // NOTES:
    }
  }
  userScore_span.innerHTML = userScore;
  computerScore_span.innerHTML = computerScore;
  result_p.innerHTML = "You Win!";
  userChoice_div.classList.add("green-glow");
  setTimeout(function() {
    userChoice_div.classList.remove("green-glow");
  }, 300);

  // audio
  audioCorrect.startCorrect();
}

function lose(userChoice, computerChoice) {
  const userChoice_div = document.getElementById(userChoice);
  if (down == true) {
    computerScore++;
    if (computerScore == 5) {
      down = false;
      up = false;
    }
  }
  userScore_span.innerHTML = userScore;
  computerScore_span.innerHTML = computerScore;
  result_p.innerHTML = "You Lose!";
  userChoice_div.classList.add("red-glow");
  setTimeout(function() {
    userChoice_div.classList.remove("red-glow");
  }, 300);

  // audio
  audioWrong.startWrong();
}

function draw(userChoice, computerChoice) {
  const userChoice_div = document.getElementById(userChoice);
  result_p.innerHTML = "Draw!";
  userChoice_div.classList.add("gray-glow");
  setTimeout(function() {
    userChoice_div.classList.remove("gray-glow");
  }, 300);

  //audio
  audioDraw.startDraw();
}

function game(userChoice) {
  const computerChoice = getComputerChoice();
  switch (userChoice + computerChoice) {
    case "rs":
    case "sp":
    case "pr":
      win(userChoice, computerChoice);
      break;
    case "rp":
    case "sr":
    case "ps":
      lose(userChoice, computerChoice);
      break;
    case "rr":
    case "pp":
    case "ss":
      draw(userChoice, computerChoice);
  }
}

function main() {
  rock_div.addEventListener("click", function() {
    game("r"); // you are calling this function
  });

  paper_div.addEventListener("click", function() {
    game("p");
  });

  scissors_div.addEventListener("click", function() {
    game("s");
  });
}
main();

// Hover Choices
function hover() {
  rock_div.addEventListener("mouseover", () => {
    audioHover.startHover();
  });

  paper_div.addEventListener("mouseover", () => {
    audioHover.startHover();
  });

  scissors_div.addEventListener("mouseover", () => {
    audioHover.startHover();
  });
}
hover();

// Reset button NOTES:
const resetButton = document.getElementById("reset");

resetButton.addEventListener("click", resetClear);

function resetClear() {
  // REVIEW: do not need to invoke this function because of the addEventListener()
  userScore_span.innerHTML = 0;
  computerScore_span.innerHTML = 0;

  if (userScore || computerScore > 0) {
    userScore = 0;
    computerScore = 0;
  }
  up = true;
  down = true;
  audioReset.startReset();
}

// Sounds Rock, Paper, Scissors
class AudioController {
  constructor() {
    this.music = new Audio("sounds/bgmusic.mp3");
    this.reset = new Audio("sounds/poke_hover.wav");
    this.correct = new Audio("sounds/correct.mp3");
    this.wrong = new Audio("sounds/wrong.mp3");
    this.draw = new Audio("sounds/draw.wav");
    this.hover = new Audio("sounds/chick_hover.wav");
    this.victory = new Audio("sounds/victory.wav");

    this.music.loop = true;

    this.music.volume = 0.08;
    this.correct.volume = 0.2;
    this.wrong.volume = 0.8;
    this.victory.volume = 0.1;
  }
  // Start
  startMusic() {
    this.music.play();
  }
  startReset() {
    this.reset.play();
  }
  startCorrect() {
    this.correct.play();
  }
  startWrong() {
    this.wrong.play();
  }
  startDraw() {
    this.draw.play();
  }
  startHover() {
    this.hover.play();
  }

  startVictory() {
    this.victory.play();
  }

  // Stop
  stopMusic() {
    this.music.pause();
    this.music.currentTime = 0;
  }
}

let audioMusic = new AudioController();
let audioHover = new AudioController();
let audioReset = new AudioController();
let audioCorrect = new AudioController();
let audioWrong = new AudioController();
let audioDraw = new AudioController();
let audioVictory = new AudioController();
