const optionsSlider = document.querySelector('.options-slider');
const optionsSliderContainer = optionsSlider.querySelector('.options-slider__container');
const optionsSliderWrapper = optionsSlider.querySelector('.options-slider__wrapper');
const optionsSliderBtnPrev = optionsSlider.querySelector('.options-slider__btn_type_prev');
const optionsSliderBtnNext = optionsSlider.querySelector('.options-slider__btn_type_next');
const optionsSlides = optionsSlider.querySelectorAll('.options-slider__slide');
const breakpointDt = window.matchMedia('(min-width: 1280px)');
const breakpointTb = window.matchMedia('(min-width: 768px)');

const optionsSliderSettings = {
  direction: 'vertical',
  slidesPerView: 3,
  gap: 16,

  breakpoints: {
    '768': {
      direction: 'horizontal',
      gap: 16,
    },
    '1280': {
      direction: 'horizontal',
      gap: 5,
    }
  }
}

const optionsSliderState = {
  initialSettings: {},
  currentSettings: {},
  slideWidth: '',
  containerWidth: '',
  wrapperWidth: '',
  wrapperRightStop: '',
  wrapperBottomStop: '',
  wrapperOffset: 0,
}

const defineContainerWidth = () => {
  optionsSliderContainer.style.width = '';
  optionsSliderContainer.style.flexShrink = '';

  let containerWidth = Math.round(optionsSliderContainer.clientWidth);

  if (optionsSliderState.currentSettings.direction === 'horizontal') {
    optionsSliderContainer.style.width = containerWidth + 'px';
    optionsSliderContainer.style.flexShrink = '0';
  }

  optionsSliderState.containerWidth = containerWidth;
}

const setWrapperStopPoints = () => {
  if (optionsSliderState.currentSettings.direction === 'horizontal') {
    optionsSliderState.wrapperRightStop = optionsSliderWrapper.scrollWidth - optionsSliderContainer.clientWidth;
  } else {
    optionsSliderState.wrapperBottomStop = optionsSliderWrapper.scrollHeight - optionsSliderContainer.clientHeight;
  }
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
  console.log(optionsSliderState.currentSettings.direction);
  if (optionsSliderState.currentSettings.slidesPerView === 'auto' || optionsSliderState.currentSettings.direction === 'vertical') {
    optionsSliderState.slideWidth = '';

    optionsSlides.forEach((slide) => {
      slide.style.width = '';
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

  if (optionsSliderState.currentSettings.direction === 'horizontal') {
    const newWrapperOffset = optionsSliderState.wrapperOffset - optionsSliderState.slideWidth - optionsSliderState.currentSettings.gap;



    optionsSliderWrapper.style.transform = `translateX(${newWrapperOffset}px)`;
    optionsSliderState.wrapperOffset = newWrapperOffset;



    setTimeout(() => {
      console.log(optionsSlides[optionsSlides.length - 1].getBoundingClientRect().right);
      console.log(optionsSliderContainer.getBoundingClientRect().right);
      if (optionsSlides[optionsSlides.length - 1].getBoundingClientRect().right <= optionsSliderContainer.getBoundingClientRect().right) {
        optionsSliderBtnNext.classList.add('options-slider__btn_hide');
      }
    }, 310);
  }

})

optionsSliderBtnPrev.addEventListener('click', (evt) => {
  evt.preventDefault();
  optionsSliderBtnNext.classList.remove('options-slider__btn_hide');

  if (optionsSliderState.currentSettings.direction === 'horizontal') {
    let newWrapperOffset = optionsSliderState.wrapperOffset + optionsSliderState.slideWidth + optionsSliderState.currentSettings.gap;
    if (newWrapperOffset >= 0) {
      newWrapperOffset = 0; // на всякий случай, если где-то затесались доли пикселей
      optionsSliderBtnPrev.classList.add('options-slider__btn_hide');
    }

    optionsSliderWrapper.style.transform = `translateX(${newWrapperOffset}px)`;
    optionsSliderState.wrapperOffset = newWrapperOffset;
  }
})


const setupOptionsSlider = () => {
  setInitialSliderSettings();
  setCurrentSettings();
  setOptionsSliderStyles();
  setWrapperStopPoints();
}

window.addEventListener('load', () => {
  setupOptionsSlider();
})

window.addEventListener('resize', () => {
  if (breakpointTb.matches) {
    resetOptionsSliderStyles();
  }
  setupOptionsSlider();
})

breakpointTb.addEventListener('change', (evt) => {
  if (!evt.matches) {
    resetOptionsSliderStyles();
    setupOptionsSlider();
  }
})
