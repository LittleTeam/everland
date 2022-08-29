const slideProjectTemplate = document.querySelector('#slide-for-project').content;
const buttonPrevSliderPrct = document.querySelector('.slider-project__button_type_prev');
const buttonNextSliderPrct = document.querySelector('.slider-project__button_type_next');

const sliderProjectContainer = document.querySelector('.slider-project');

const createPictureEl = (imgName, imgAlt, imgClass) => {
  return `<picture>
            <source type="image/webp" srcset="images/${imgName}@1x.webp 1x, images/${imgName}@2x.webp 2x">
            <img class=${imgClass} alt="${imgAlt}." src="images/${imgName}@1x.jpg" srcset="images/${imgName}@2x.jpg 2x"/>
          </picture>`;
}

function createSlideProject(item) {
  const slideElement = slideProjectTemplate.querySelector('.card-project').cloneNode(true);

  const elementImageWrapper = slideElement.querySelector('.card-project__img-wrapper');
  const elementHeading = slideElement.querySelector('.card-project__heading');
  const elementText = slideElement.querySelector('.card-project__text');
  const elementLink = slideElement.querySelector('.card-project__button');

  elementImageWrapper.innerHTML = createPictureEl(item.image, item.heading, 'card-project__img')

  elementHeading.textContent = item.heading;
  elementText.textContent = item.text;
  elementLink.setAttribute('href', item.link);

  return slideElement;
}

function addSlideProject (item, container) {
  const slideElement = createSlideProject(item);
  container.append(slideElement);
}

function createInitialSlidesProject(slides) {
  slides.forEach((item) => {
    addSlideProject(item, sliderProjectContainer);
  })
}

createInitialSlidesProject(initialSlidesProject);
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
