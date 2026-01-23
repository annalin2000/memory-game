const cards = document.querySelectorAll(".card");

const time = document.querySelector(".stats__time");
const flip = document.querySelector(".stats__flips");
const restartBtn = document.querySelector(".stats__restart");

const message = document.querySelector(".message");
const messageText = document.querySelector(".message__text");
const messageBtn = document.querySelector(".message__button");

const matchSound = new Audio("sounds/matchSound.mp3");
const wrongSound = new Audio("sounds/wrongSound.mp3");
const winSound = new Audio("sounds/winSound.mp3");
const loseSound = new Audio("sounds/loseSound.mp3");

matchSound.volume = 1;
wrongSound.volume = 0.8;
winSound.volume = 1;
loseSound.volume = 1;

let cardOne = null;
let cardTwo = null;
let disableDeck = false;
let matchedCount = 0;

let flips = 0;
let level = 1;

const startTime = 30;
const decreaseBy = 5;
const minTime = 10;

let timeLeft = startTime;
let timer = null;
let gameStarted = false;

function getTimeForLevel(lvl) {
  return Math.max(startTime - (lvl - 1) * decreaseBy, minTime);
}

function startTimer() {
  if (timer) return;

  timer = setInterval(() => {
    timeLeft--;
    time.textContent = timeLeft;

    if (timeLeft <= 0) {
      loseGame();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
  timer = null;
}

function showMessage(text, buttonText) {
  messageText.textContent = text;
  messageBtn.textContent = buttonText;
  message.classList.remove("message--hidden");
}

function hideMessage() {
  message.classList.add("message--hidden");
}

function resetTurn() {
  cardOne = null;
  cardTwo = null;
  disableDeck = false;
}

function shuffleCards() {
  const order = [...Array(cards.length).keys()];

  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }

  cards.forEach((card, index) => {
    card.style.order = order[index];
  });
}

function restartLevel(lvl) {
  level = lvl;
  matchedCount = 0;
  flips = 0;
  gameStarted = false;

  stopTimer();
  resetTurn();

  timeLeft = getTimeForLevel(level);
  time.textContent = timeLeft;
  flip.textContent = flips;

  hideMessage();
  shuffleCards();

  cards.forEach((card) => {
    card.classList.remove("flip", "shake", "matched");
  });
}

function winGame() {
  stopTimer();
  disableDeck = true;

  winSound.currentTime = 0;
  winSound.play();

  showMessage(`🎉 You Won Level ${level}!`, "Next Level");
}

function loseGame() {
  stopTimer();
  disableDeck = true;

  loseSound.currentTime = 0;
  loseSound.play();

  showMessage("⏰ Time’s Up! You Lost", "Retry Level");
}

function flipCard(e) {
  const clickedCard = e.currentTarget;

  if (disableDeck) return;
  if (clickedCard === cardOne) return;
  if (clickedCard.classList.contains("matched")) return;

  if (!gameStarted) {
    gameStarted = true;
    startTimer();
  }

  clickedCard.classList.add("flip");
  flips++;
  flip.textContent = flips;

  if (!cardOne) {
    cardOne = clickedCard;
    return;
  }

  cardTwo = clickedCard;
  disableDeck = true;

  const img1 = cardOne.querySelector("img").src;
  const img2 = cardTwo.querySelector("img").src;

  matchCards(img1, img2);
}

function matchCards(img1, img2) {
  if (img1 === img2) {
    matchSound.currentTime = 0;
    matchSound.play();

    cardOne.classList.add("matched");
    cardTwo.classList.add("matched");

    matchedCount += 2;
    resetTurn();

    if (matchedCount === cards.length) {
      winGame();
    }
    return;
  }

  wrongSound.currentTime = 0;
  wrongSound.play();

  cardOne.classList.add("shake");
  cardTwo.classList.add("shake");

  setTimeout(() => {
    cardOne.classList.remove("shake", "flip");
    cardTwo.classList.remove("shake", "flip");
    resetTurn();
  }, 700);
}

cards.forEach((card) => card.addEventListener("click", flipCard));

restartBtn.addEventListener("click", () => {
  restartLevel(1);
});

messageBtn.addEventListener("click", () => {
  const label = messageBtn.textContent.toLowerCase();

  if (label.includes("retry")) {
    restartLevel(level);
  } else {
    restartLevel(level + 1);
  }
});

restartLevel(1);
