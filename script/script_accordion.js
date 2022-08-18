// находим все заголовки и все кнопки карточки акккордиона
const butItems = document.querySelectorAll(".accordion__button");
const subItems = document.querySelectorAll(".accordion__subtitle");
// проходим по 2 массивам и вешаем слушатель клика
butItems.forEach((item) => {
    item.addEventListener("click", subHandler);
});
subItems.forEach((item) => {
    item.addEventListener("click", subHandler);
});
// функции обработчики событий
function subHandler(evt) {
    evt.preventDefault();
    let currentIcon;
    if (evt.target.classList.contains('accordion__subtitle')) {
        currentIcon = evt.target.nextElementSibling;
    }
    else currentIcon = evt.target;
    let currentCard = evt.target.closest(".accordion__item");
    let currentContent = currentCard.querySelector("#content");
    currentIcon.classList.toggle("accordion__button_active");
    currentContent.classList.toggle("accordion__text_disabled");
}
