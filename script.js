const cards = document.querySelectorAll(".card");

const time = document.querySelector(".stats__time");
const flip = document.querySelector(".stats__flips");

const message = document.querySelector(".message");
const messageText = document.querySelector(".message__text");
const messageBtn = document.querySelector(".message__button");

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

function winGame() {
  stopTimer();
  disableDeck = true;

  showMessage(`🎉 you won level ${level}!`, "ok");
}

function loseGame() {
  stopTimer();
  disableDeck = true;

  showMessage("⏰ time’s up! you lost", "ok");
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
    cardOne.classList.add("matched");
    cardTwo.classList.add("matched");

    matchedCount += 2;
    resetTurn();

    if (matchedCount === cards.length) {
      winGame();
    }
    return;
  }

  cardOne.classList.add("shake");
  cardTwo.classList.add("shake");

  setTimeout(() => {
    cardOne.classList.remove("shake", "flip");
    cardTwo.classList.remove("shake", "flip");
    resetTurn();
  }, 700);
}

cards.forEach((card) => card.addEventListener("click", flipCard));

messageBtn.addEventListener("click", () => {
  hideMessage();
});
