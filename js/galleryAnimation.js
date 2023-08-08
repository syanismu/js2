const carouselToastContainer = document.getElementById("btn-wrap");
const btnCarousel = document.getElementById("btn-carousel");
const btnCarouselPaper = document.querySelector("#btn-wrap > .carousel-paper");

const btnCarouselToast = document.getElementById("carousel-toast");
const carousel = document.getElementById("carousel-wrap");

btnCarousel.addEventListener("click", function () {
  openCarouselToast();
});

btnCarouselToast.addEventListener("click", function () {
  closeCarouselToast();
});

function carouselToastActions() {
  btnCarousel.classList.toggle("collapse");
  btnCarousel.classList.toggle("btn-large");
  btnCarouselPaper.classList.toggle("expand");
}

function openCarouselToast() {
  // Bottom part collapse
  carouselToastActions();

  // Upper part expand
  setTimeout(function () {
    btnCarouselToast.classList.toggle("collapse");
    carouselToastContainer.classList.toggle("moveUp");
    carousel.classList.toggle("moveUp");
  }, 200);
}


function closeCarouselToast() {
  // Bottom part expand
  btnCarouselToast.classList.toggle("collapse");

  // Upper part collapse
  setTimeout(function () {
    carouselToastActions();
    carousel.classList.toggle("moveUp");
    carouselToastContainer.classList.toggle("moveUp");
    
  }, 200);
}

export  {closeCarouselToast};