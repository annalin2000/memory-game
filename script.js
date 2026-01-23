const cards = document.querySelectorAll(".card");

function flipCard(e) {
  e.currentTarget.classList.toggle("flip");
}

cards.forEach((card) => card.addEventListener("click", flipCard));
