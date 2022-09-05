const donationForm = document.querySelector('.donation__form');
const donationNavOptions = document.querySelectorAll('.donation-options_content_links .donation-options__radio-input');
const donationFormOptions = document.querySelectorAll('.donation-options_content_sum .donation-options__radio-input');
const donationAnotherOption = donationForm.querySelector('.donation-options__item_content_another .donation-options__radio-input');
const donationAnotherInputLabel = donationForm.querySelector('.donation__text-input-label_content_sum');
const donationAnotherInput = donationAnotherInputLabel.querySelector('input');

const checkRelatedOption = (radio) => {
  radio.checked = 'true';
  const event = new Event('change');
  radio.dispatchEvent(event);
}

const disableAnotherInput = () => {
  if (!donationAnotherInputLabel.classList.contains('donation__text-input-label_state_hide')) {
    donationAnotherInputLabel.classList.add('donation__text-input-label_state_hide');
    donationAnotherInput.removeAttribute('required');
  }
}

const unableAnotherInput = () => {
  donationAnotherInputLabel.classList.remove('donation__text-input-label_state_hide');
  donationAnotherInput.setAttribute('required', '');
}

donationNavOptions.forEach((opt) => {
  opt.addEventListener('change', () => {
    donationFormOptions.forEach((formOpt) => {
      if (opt.value === formOpt.value && !formOpt.checked) {
        checkRelatedOption(formOpt);
      }
    })
  })
})

donationFormOptions.forEach((formOpt) => {
  formOpt.addEventListener('change', () => {
    donationNavOptions.forEach((opt) => {
      if (formOpt.value === opt.value && !opt.checked) {
        checkRelatedOption(opt);
      }
    })

    if (formOpt === donationAnotherOption && donationAnotherOption.checked) {
      unableAnotherInput();
    } else {
      disableAnotherInput();
    }
  })
})
