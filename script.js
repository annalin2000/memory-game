const cards = document.querySelectorAll(".card");

function flipCard(e) {
  console.log(e.target);
}

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});
