const optionsSlider = document.querySelector('.options-slider');
const optionsSliderContainer = optionsSlider.querySelector('.options-slider__container');
const optionsSliderWrapper = optionsSlider.querySelector('.options-slider__wrapper');
const optionsSliderBtnPrev = optionsSlider.querySelector('.options-slider__btn_type_prev');
const optionsSliderBtnNext = optionsSlider.querySelector('.options-slider__btn_type_next');
const optionsSlides = optionsSlider.querySelectorAll('.options-slider__slide');

const optionsSliderSettings = {
  direction: 'vertical',
  slidesPerView: 'auto',
  gap: 16,

  breakpoints: {
    '768': {
      direction: 'horizontal',
      slidesPerView: 3,
      gap: 16,
    },
    '1280': {
      direction: 'horizontal',
      gap: 5,
    }
  }
}

const optionsSliderState = {
  initialSettings: {
    direction: 'horizontal',
    slidesPerView: 1,
  },
  currentSettings: {},
  slideWidth: '',
  slideHeight: '',
  containerWidth: '',
  wrapperWidth: '',
  wrapperOffset: 0,
  currentSlideIndex: 0,
}

const isOptionsSliderHorizontal = () => {
  return (optionsSliderState.currentSettings.direction === 'horizontal');
}

const isOptionsSliderVertical = () => {
  return optionsSliderState.currentSettings.direction === 'vertical';
}

const resetOptionsSliderContainerStyles = () => {
  optionsSliderContainer.style.width = '';
  optionsSliderContainer.style.flexShrink = '';
}

const defineContainerWidth = () => {
  resetOptionsSliderContainerStyles();

  const containerWidth = Math.round(optionsSliderContainer.clientWidth); // чтобы избежать половинчатых пикселей, которые скрывают границы слайдов
  optionsSliderContainer.style.width = containerWidth + 'px';
  optionsSliderContainer.style.flexShrink = '0';
  optionsSliderState.containerWidth = containerWidth;
}

const calculateOptionsSlideWidth = () => {
  return (optionsSliderState.containerWidth - ((optionsSliderState.currentSettings.slidesPerView - 1) * optionsSliderState.currentSettings.gap)) / optionsSliderState.currentSettings.slidesPerView;
}

const setInitialSliderSettings = () => {
  optionsSliderState.initialSettings = Object.assign(optionsSliderState.initialSettings, optionsSliderSettings);
  delete optionsSliderState.initialSettings.breakpoints;
}

const setCurrentSettings = () => {
  optionsSliderState.currentSettings = {};
  optionsSliderState.currentSettings = Object.assign({}, optionsSliderState.initialSettings);

  if (optionsSliderSettings.breakpoints) {

    const breakpointKeys = Object.keys(optionsSliderSettings.breakpoints).sort((a, b) => {
      return parseInt(a, 10) - parseInt(b, 10);
    })

    breakpointKeys.forEach((bp) => {
      if (window.matchMedia(`(min-width: ${bp}px)`).matches) {
        optionsSliderState.currentSettings = Object.assign(optionsSliderState.currentSettings, optionsSliderSettings.breakpoints[bp]);
      }
    })
  }
}

const setSlidesWidth = () => {
  if (optionsSliderState.currentSettings.slidesPerView === 'auto' || isOptionsSliderVertical()) {
    resetSlidesStyles();
  } else {
    optionsSliderState.slideWidth = calculateOptionsSlideWidth();
    optionsSlides.forEach((slide) => {
      slide.style.width = optionsSliderState.slideWidth + 'px';
    })
  }
}

const resetSlidesStyles = () => {
  optionsSliderState.slideWidth = '';
  optionsSliderState.slideHeight = '';
  resetOptionsSliderContainerStyles();

  optionsSlides.forEach((slide) => {
    slide.style.width = '';
    slide.style.height = '';
  })
}

const resetOptionsSliderStyles = () => {
  optionsSliderWrapper.style.transform = '';
  optionsSliderWrapper.style.gap = '';
  optionsSliderState.wrapperOffset = 0;
  optionsSliderState.currentSlideIndex = 0;
  resetSlidesStyles();
  hideOptionsSliderBtn(optionsSliderBtnPrev);
  showOptionsSliderBtn(optionsSliderBtnNext);
}

const setOptionsSliderStyles = () => {
  if (isOptionsSliderHorizontal()) {
    defineContainerWidth();
    setSlidesWidth();
  }

  optionsSliderWrapper.style.gap = optionsSliderState.currentSettings.gap + 'px';
}

const hideOptionsSliderBtn = (btn) => {
  if (!btn.classList.contains('options-slider__btn_hide')) {
    btn.classList.add('options-slider__btn_hide');
  }
  btn.setAttribute('aria-hidden', 'true');
}

const showOptionsSliderBtn = (btn) => {
  btn.classList.remove('options-slider__btn_hide');
  btn.setAttribute('aria-hidden', 'false');
}

const setupOptionsSlider = () => {
  setCurrentSettings();
  setOptionsSliderStyles();
}

const slideForward = (targetSlideIndex) => {
  let newWrapperOffset;

  if (isOptionsSliderHorizontal()) {
    newWrapperOffset = optionsSliderState.wrapperOffset - Math.abs(optionsSlides[optionsSliderState.currentSlideIndex].offsetLeft - optionsSlides[targetSlideIndex].offsetLeft);
    optionsSliderWrapper.style.transform = `translateX(${newWrapperOffset}px)`;

    if ((optionsSliderContainer.clientWidth + Math.abs(newWrapperOffset)) >= optionsSliderWrapper.scrollWidth) {
      hideOptionsSliderBtn(optionsSliderBtnNext);
    }
  }

  if (isOptionsSliderVertical()) {
    newWrapperOffset = optionsSliderState.wrapperOffset - Math.abs(optionsSlides[optionsSliderState.currentSlideIndex].offsetTop - optionsSlides[targetSlideIndex].offsetTop);
    optionsSliderWrapper.style.transform = `translateY(${newWrapperOffset}px)`;

    if ((optionsSliderContainer.clientHeight + Math.abs(newWrapperOffset)) >= optionsSliderWrapper.scrollHeight) {
      hideOptionsSliderBtn(optionsSliderBtnNext);
    }
  }

  optionsSliderState.currentSlideIndex = targetSlideIndex;
  optionsSliderState.wrapperOffset = newWrapperOffset;
}

const slideBackwards = (targetSlideIndex) => {
  const currentSlide = optionsSlides[optionsSliderState.currentSlideIndex];
  const prevSlide = optionsSlides[targetSlideIndex];
  let newWrapperOffset;

  if (isOptionsSliderHorizontal()) {
    newWrapperOffset = optionsSliderState.wrapperOffset + (currentSlide.offsetLeft + currentSlide.offsetWidth) - (prevSlide.offsetLeft + prevSlide.offsetWidth);
    optionsSliderWrapper.style.transform = `translateX(${newWrapperOffset}px)`;
  }

  if (isOptionsSliderVertical()) {
    newWrapperOffset = optionsSliderState.wrapperOffset + (currentSlide.offsetTop + currentSlide.offsetHeight) - (prevSlide.offsetTop + prevSlide.offsetHeight);
    optionsSliderWrapper.style.transform = `translateY(${newWrapperOffset}px)`;
  }

  if (newWrapperOffset >= 0) {
    newWrapperOffset = 0; // на всякий случай, если где-то затесались доли пикселей
    hideOptionsSliderBtn(optionsSliderBtnPrev);
  }

  optionsSliderState.currentSlideIndex = targetSlideIndex;
  optionsSliderState.wrapperOffset = newWrapperOffset;
}

optionsSliderBtnNext.addEventListener('click', (evt) => {
  evt.preventDefault();
  showOptionsSliderBtn(optionsSliderBtnPrev);
  const nextSlideIndex = optionsSliderState.currentSlideIndex + 1;

  if (nextSlideIndex < optionsSlides.length) {
    slideForward(nextSlideIndex);
  }
})

optionsSliderBtnPrev.addEventListener('click', (evt) => {
  evt.preventDefault();
  showOptionsSliderBtn(optionsSliderBtnNext);
  const prevSlideIndex = optionsSliderState.currentSlideIndex - 1;

  if (prevSlideIndex >= 0) {
    slideBackwards(prevSlideIndex);
  }
})

window.addEventListener('load', () => {
  setInitialSliderSettings();
  setupOptionsSlider();
})

window.addEventListener('resize', () => {
  resetOptionsSliderStyles();
  setupOptionsSlider();
})
