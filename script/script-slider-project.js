const buttonPrevSliderPrct = document.querySelector('.slider-project__button_type_prev');
const buttonNextSliderPrct = document.querySelector('.slider-project__button_type_next');
const slidesSpecPrjct = document.querySelectorAll('.card-project');

let slideSpecPrjctInd = 1;
showSlideSpecPrjct(slideSpecPrjctInd);

function showNextSlideSpecPrjct() {
  showSlideSpecPrjct(slideSpecPrjctInd += 1);
}

function showPrevSlideSpecPrjct() {
  showSlideSpecPrjct(slideSpecPrjctInd -= 1);
}

 function hideSlideSpecPrjct() {
  slidesSpecPrjct.forEach((item) => {
    if (item.classList.contains('card-project_visible')) {
      item.classList.remove('card-project_visible');
    }
  });
 }

function showSlideSpecPrjct(n) {
  if (n > slidesSpecPrjct.length) {
    slideSpecPrjctInd = 1;
  }

  if (n < 1) {
    slideSpecPrjctInd = slidesSpecPrjct.length;
  }

  hideSlideSpecPrjct();

  slidesSpecPrjct[slideSpecPrjctInd - 1].classList.add('card-project_visible');
}

buttonPrevSliderPrct.addEventListener('click', showPrevSlideSpecPrjct);
buttonNextSliderPrct.addEventListener('click', showNextSlideSpecPrjct);
