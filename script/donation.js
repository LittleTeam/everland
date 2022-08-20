const donationForm = document.querySelector('.donation__form');
const donationNavOptions = document.querySelectorAll('.donation-options_content_links .donation-options__radio-input');
const donationFormOptions = document.querySelectorAll('.donation-options_content_sum .donation-options__radio-input');
const donationAnotherOption = donationForm.querySelector('.donation-options__item_content_another .donation-options__radio-input');
const donationAnotherInputLabel = donationForm.querySelector('.donation__text-input-label_content_sum');
const donationAnotherInput = donationAnotherInputLabel.querySelector('input');

donationNavOptions.forEach((opt) => {
  opt.addEventListener('change', () => {
    donationFormOptions.forEach((formOpt) => {
      if (opt.value === formOpt.value) {
        formOpt.checked = 'true';
        const event = new Event('change');
        formOpt.dispatchEvent(event);
      }
    })
  })
})

const unableAnotherInput = () => {
  donationAnotherInputLabel.classList.remove('donation__text-input-label_state_hide');
  donationAnotherInput.setAttribute('required', '');
}

const disableAnotherInput = () => {
  if (!donationAnotherInputLabel.classList.contains('donation__text-input-label_state_hide')) {
    donationAnotherInputLabel.classList.add('donation__text-input-label_state_hide');
    donationAnotherInput.removeAttribute('required');
  }
}

donationFormOptions.forEach((opt) => {
  opt.addEventListener('change', () => {
    if (opt === donationAnotherOption && donationAnotherOption.checked) {
      unableAnotherInput();
    } else {
      disableAnotherInput();
    }
  })
})
