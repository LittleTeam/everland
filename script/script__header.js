//Шторка меню

const header = document.querySelector(".header");
const subMenuHidden = document.querySelector(".sub-menu_hidden");
const subMenuBtn = document.querySelector("#menuBtn");
const subMenu = document.querySelector(".sub-menu");
const MenuIcon = document.querySelector(".header__menu-icon");
const column = document.querySelectorAll(".sub-menu__column-links");
const columnIcon = document.querySelectorAll(".sub-menu__title-icon");

const toggleMenu = function () {
  subMenuHidden.classList.toggle("sub-menu_hidden");
  MenuIcon.classList.toggle("header__menu-icon_close");
  column.forEach((e) => e.classList.add("sub-menu__column-links_hide"));
  columnIcon.forEach((e) => e.classList.remove("sub-menu__title-icon_hide"));
};

subMenuBtn.addEventListener("click", function (e) {
  e.stopPropagation();
  toggleMenu();
});

subMenuBtn.addEventListener("mouseover", function (e) {
  e.stopPropagation();
  subMenuHidden.classList.remove("sub-menu_hidden");
  MenuIcon.classList.add("header__menu-icon_close");
});

document.addEventListener("mouseover", function (e) {
  const target = e.target;
  const its_menu = target === subMenu || subMenu.contains(target);
  const its_btnMenu = target === header || header.contains(target);
  const menu_is_active = !subMenu.classList.contains("sub-menu_hidden");

  if (!its_menu && !its_btnMenu && menu_is_active) {
    toggleMenu();
  }
});

//Аккорденон мобилный

const titleBtns = document.querySelectorAll(".sub-menu__title");

function click() {
  titleBtns.forEach(() => this.parentElement.nextElementSibling.classList.toggle("sub-menu__column-links_hide"));
  titleBtns.forEach(() => this.nextElementSibling.classList.toggle("sub-menu__title-icon_hide"));
  console.log(this);
}

titleBtns.forEach((e) => {
  e.addEventListener("click", click);
});

// Слайдер с анимациями

const items = document.querySelectorAll(".about__slider-item");
const btnPrev = document.querySelector(".about__switcher-button_prev");
const btnNext = document.querySelector(".about__switcher-button_next");
// счетчик
let btnPagination = document.querySelector(".about__switcher-text");
let savedIndex = 0;

function printPagination() {
  btnPagination.textContent = `${savedIndex + 1}/${items.length}`;
}

function calcSlideNext() {
  savedIndex = savedIndex += 1;
  savedIndex = items.length === savedIndex ? 0 : savedIndex;
  items.forEach((el) => el.classList.remove("about__slider-item_next"));
  items.forEach((el) => el.classList.remove("about__switcher-button_prev"));
  items[savedIndex].classList.add("about__slider-item_next");
}

function calcSlidePrev() {
  savedIndex = savedIndex -= 1;
  savedIndex = savedIndex < 0 ? items.length - 1 : savedIndex;
  items.forEach((el) => el.classList.remove("about__switcher-button_prev"));
  items.forEach((el) => el.classList.remove("about__slider-item_next"));
  items[savedIndex].classList.add("about__switcher-button_prev");
}

const clickSliderHandlerNext = () => {
  calcSlideNext();
  printPagination();
};

const clickSliderHandlerPrev = () => {
  calcSlidePrev();
  printPagination();
};

btnPrev.addEventListener("click", clickSliderHandlerPrev);
btnNext.addEventListener("click", clickSliderHandlerNext);

//СЛАЙДЕР БЕЗ АНИМАЦИИ

/*

const items = document.querySelectorAll('.about__slider-item');
const btnPrev = document.querySelector('#btnPrev');
const btnNext = document.querySelector('#btnNext');
let btnPagination =  document.querySelector('#pagination');
let savedIndex = 0;

const clickSliderHandler = (operation) => {

  !function calcSlide() {
    savedIndex = operation === 'plus' ? savedIndex += 1 : savedIndex -= 1;
    savedIndex = items.length === savedIndex ? 0 : savedIndex;
    savedIndex = savedIndex < 0 ? items.length - 1 : savedIndex;
    items.forEach(el => el.classList.remove('block'));
    items[savedIndex].classList.add('block');

  }();

  !function printPagination() {
    btnPagination.textContent = `${savedIndex + 1}/${items.length}`;
  }();
};

btnNext.addEventListener('click', () => {clickSliderHandler('plus')});
btnPrev.addEventListener('click', clickSliderHandler);

*/
