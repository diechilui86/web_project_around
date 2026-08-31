function showInputError(form, inputElement, errorMessage) {
  const errorElement = form.querySelector(`.${inputElement.name}-input-error`);
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input-error_active");
}

function hideInputError(form, inputElement) {
  const errorElement = form.querySelector(`.${inputElement.name}-input-error`);
  inputElement.classList.remove("popup__input_type_error");
  errorElement.classList.remove("popup__input-error_active");
  errorElement.textContent = "";
}

function toggleButtonState(inputs, submitButton) {
  const allValid = Array.from(inputs).every((input) => input.validity.valid);
  submitButton.disabled = !allValid;
}

function setEventListeners(form) {
  const inputs = form.querySelectorAll(".popup__input");
  const submitButton = form.querySelector(".popup__button");
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      if (!input.validity.valid) {
        showInputError(form, input, input.validationMessage);
      } else {
        hideInputError(form, input);
      }
      toggleButtonState(inputs, submitButton);
    });
  });
}

function resetValidation(form) {
  const inputs = form.querySelectorAll(".popup__input");
  const submitButton = form.querySelector(".popup__button");

  inputs.forEach((input) => {
    hideInputError(form, input);
  });
  form.reset();
  submitButton.disabled = true;
}

export { setEventListeners, resetValidation };
