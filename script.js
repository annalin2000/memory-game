const cards = document.querySelectorAll(".card");

let lastCard = null;

function flipCard(e) {
  const clicked = e.currentTarget;

  if (clicked === lastCard) return;

  clicked.classList.toggle("flip");
  lastCard = clicked;
}

cards.forEach((card) => card.addEventListener("click", flipCard));
