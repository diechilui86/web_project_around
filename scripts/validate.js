function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach((form) => {
    const inputs = form.querySelectorAll(config.inputSelector);
    const submitButton = form.querySelector(config.submitButtonSelector);
    setEventListeners(config, inputs, submitButton);
  });
}

function showInputError(config, inputElement, errorMessage) {
  const errorElement = document.querySelector(
    `.${inputElement.name}-input-error`,
  );
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

function hideInputError(config, inputElement) {
  const errorElement = document.querySelector(
    `.${inputElement.name}-input-error`,
  );
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
}

function toggleButtonState(inputs, submitButton) {
  const allValid = Array.from(inputs).every((input) => input.validity.valid);
  submitButton.disabled = !allValid;
}

function setEventListeners(config, inputs, submitButton) {
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      if (!input.validity.valid) {
        showInputError(config, input, input.validationMessage);
      } else {
        hideInputError(config, input);
      }
      toggleButtonState(inputs, submitButton);
    });
  });
}

function resetValidation(config, form) {
  form.reset();

  const inputs = form.querySelectorAll(config.inputSelector);
  const submitButton = form.querySelector(config.submitButtonSelector);

  inputs.forEach((input) => {
    hideInputError(config, input);
  });

  submitButton.disabled = true;
}

export { enableValidation, resetValidation };
