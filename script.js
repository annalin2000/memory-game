const cards = document.querySelectorAll(".card");

let cardOne = null;
let cardTwo = null;
let disableDeck = false;

function resetTurn() {
  cardOne = null;
  cardTwo = null;
  disableDeck = false;
}

function flipCard(e) {
  const clicked = e.currentTarget;

  if (disableDeck) return;
  if (clicked === cardOne) return;
  if (clicked.classList.contains("matched")) return;

  clicked.classList.add("flip");

  if (!cardOne) {
    cardOne = clicked;
    return;
  }

  cardTwo = clicked;
  disableDeck = true;

  const img1 = cardOne.querySelector("img").src;
  const img2 = cardTwo.querySelector("img").src;

  if (img1 === img2) {
    cardOne.classList.add("matched");
    cardTwo.classList.add("matched");
    resetTurn();
  } else {
    setTimeout(() => {
      cardOne.classList.remove("flip");
      cardTwo.classList.remove("flip");
      resetTurn();
    }, 700);
  }
}

cards.forEach((card) => card.addEventListener("click", flipCard));
