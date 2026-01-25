const cards = document.querySelectorAll(".card");

const time = document.querySelector(".stats__time");
const levelText = document.querySelector(".stats__level");
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

let level = 1;
const totalLevels = 5;

const startTime = 30;
const decreaseBy = 5;
const minTime = 10;

let timeLeft = startTime;
let timer = null;
let gameStarted = false;

function getTimeForLevel(lvl) {
  return Math.max(startTime - (lvl - 1) * decreaseBy, minTime);
}

function updateLevelText() {
  if (level === totalLevels) {
    levelText.textContent = "Final";
  } else {
    levelText.textContent = `${level}/${totalLevels}`;
  }
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
  gameStarted = false;

  stopTimer();
  resetTurn();

  timeLeft = getTimeForLevel(level);
  time.textContent = timeLeft;
  updateLevelText();

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

  showMessage(`🎉 Level ${level} Completed!`, "Next Level");
}

function loseGame() {
  stopTimer();
  disableDeck = true;

  loseSound.currentTime = 0;
  loseSound.play();

  showMessage("⏰ Time’s Up!", "Retry Level");
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

  if (!cardOne) {
    cardOne = clickedCard;
    return;
  }

  cardTwo = clickedCard;
  disableDeck = true;

  const img1 = cardOne.querySelector("img").src;
  const img2 = cardTwo.querySelector("img").src;

  checkMatch(img1, img2);
}

function checkMatch(img1, img2) {
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
  }, 380);
}

cards.forEach((card) => {
  card.addEventListener("pointerdown", flipCard);
});

restartBtn.addEventListener("click", () => {
  restartLevel(1);
});

messageBtn.addEventListener("click", () => {
  if (
    level === totalLevels &&
    !messageBtn.textContent.toLowerCase().includes("retry")
  ) {
    restartLevel(1);
  } else if (messageBtn.textContent.toLowerCase().includes("retry")) {
    restartLevel(level);
  } else {
    restartLevel(Math.min(level + 1, totalLevels));
  }
});

restartLevel(1);
