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

const defineContainerWidth = () => {
  optionsSliderContainer.style.width = '';
  optionsSliderContainer.style.flexShrink = '';

  let containerWidth = Math.round(optionsSliderContainer.clientWidth); // чтобы избежать половинчатых пикселей, которые скрывают границы слайдов

  if (optionsSliderState.currentSettings.direction === 'horizontal') {
    optionsSliderContainer.style.width = containerWidth + 'px';
    optionsSliderContainer.style.flexShrink = '0';
  }

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
        for (let key in optionsSliderSettings.breakpoints[bp]) {
          let value = optionsSliderSettings.breakpoints[bp][key];
          if (!optionsSliderState.currentSettings[key] || optionsSliderState.currentSettings[key] !== value) {
            optionsSliderState.currentSettings[key] = value;
          }
        }
      }
    })
  }
}

const setSlidesWidth = () => {
  if (optionsSliderState.currentSettings.slidesPerView === 'auto' || optionsSliderState.currentSettings.direction === 'vertical') {
    optionsSliderState.slideWidth = '';
    optionsSliderState.slideHeight = '';

    optionsSlides.forEach((slide) => {
      slide.style.width = '';
      slide.style.height = '';
    })
  } else {
    optionsSliderState.slideWidth = calculateOptionsSlideWidth();
    optionsSlides.forEach((slide) => {
      slide.style.width = optionsSliderState.slideWidth + 'px';
    })
  }
}

const resetOptionsSliderStyles = () => {
  console.log('reset');
  optionsSliderWrapper.style.transform = '';
  optionsSliderState.wrapperOffset = 0;
  optionsSliderState.currentSlideIndex = 0;

  if (!optionsSliderBtnPrev.classList.contains('options-slider__btn_hide')) {
    optionsSliderBtnPrev.classList.add('options-slider__btn_hide');
  }
  optionsSliderBtnNext.classList.remove('options-slider__btn_hide');
}

const setOptionsSliderStyles = () => {
  defineContainerWidth();
  const keys = Object.keys(optionsSliderState.currentSettings);
  keys.forEach((key) => {
    switch (key) {
      case 'slidesPerView':
        setSlidesWidth();
        break;
      // case 'direction':
      //   resetOptionsSliderStyles();
    }
  })

  optionsSliderWrapper.style.gap = optionsSliderState.currentSettings.gap + 'px';
}

optionsSliderBtnNext.addEventListener('click', (evt) => {
  evt.preventDefault();

  optionsSliderBtnPrev.classList.remove('options-slider__btn_hide');

  const nextSlideIndex = optionsSliderState.currentSlideIndex + 1;
  let newWrapperOffset;

  if (nextSlideIndex < optionsSlides.length) {
    if (optionsSliderState.currentSettings.direction === 'horizontal') {
      // const newWrapperOffset = optionsSliderState.wrapperOffset - optionsSliderState.slideWidth - optionsSliderState.currentSettings.gap;
      newWrapperOffset = optionsSliderState.wrapperOffset - Math.abs(optionsSlides[optionsSliderState.currentSlideIndex].offsetLeft - optionsSlides[nextSlideIndex].offsetLeft);
      optionsSliderWrapper.style.transform = `translateX(${newWrapperOffset}px)`;

      if ((optionsSliderContainer.clientWidth + Math.abs(newWrapperOffset)) >= optionsSliderWrapper.scrollWidth) {
        optionsSliderBtnNext.classList.add('options-slider__btn_hide');
      }
    }

    if (optionsSliderState.currentSettings.direction === 'vertical') {
      newWrapperOffset = optionsSliderState.wrapperOffset - Math.abs(optionsSlides[optionsSliderState.currentSlideIndex].offsetTop - optionsSlides[nextSlideIndex].offsetTop);
      optionsSliderWrapper.style.transform = `translateY(${newWrapperOffset}px)`;

      if ((optionsSliderContainer.clientHeight + Math.abs(newWrapperOffset)) >= optionsSliderWrapper.scrollHeight) {
        optionsSliderBtnNext.classList.add('options-slider__btn_hide');
      }
    }

    optionsSliderState.currentSlideIndex = nextSlideIndex;
    optionsSliderState.wrapperOffset = newWrapperOffset;
  }
})

optionsSliderBtnPrev.addEventListener('click', (evt) => {
  evt.preventDefault();
  optionsSliderBtnNext.classList.remove('options-slider__btn_hide');

  const prevSlideIndex = optionsSliderState.currentSlideIndex - 1;
  let newWrapperOffset;

  if (prevSlideIndex >= 0) {
    const currentSlide = optionsSlides[optionsSliderState.currentSlideIndex]
    const prevSlide = optionsSlides[prevSlideIndex];

    if (optionsSliderState.currentSettings.direction === 'horizontal') {
      newWrapperOffset = optionsSliderState.wrapperOffset + (currentSlide.offsetLeft + currentSlide.offsetWidth) - (prevSlide.offsetLeft + prevSlide.offsetWidth);
      optionsSliderWrapper.style.transform = `translateX(${newWrapperOffset}px)`;
    }

    if (optionsSliderState.currentSettings.direction === 'vertical') {
      newWrapperOffset = optionsSliderState.wrapperOffset + (currentSlide.offsetTop + currentSlide.offsetHeight) - (prevSlide.offsetTop + prevSlide.offsetHeight);
      optionsSliderWrapper.style.transform = `translateY(${newWrapperOffset}px)`;
    }

    if (newWrapperOffset >= 0) {
      newWrapperOffset = 0; // на всякий случай, если где-то затесались доли пикселей
      optionsSliderBtnPrev.classList.add('options-slider__btn_hide');
    }

    optionsSliderState.currentSlideIndex = prevSlideIndex;
    optionsSliderState.wrapperOffset = newWrapperOffset;
  }
})

const setupOptionsSlider = () => {
  setCurrentSettings();
  setOptionsSliderStyles();
}

window.addEventListener('load', () => {
  setInitialSliderSettings();
  setupOptionsSlider();
})

window.addEventListener('resize', () => {
  resetOptionsSliderStyles();
  setupOptionsSlider();
})
