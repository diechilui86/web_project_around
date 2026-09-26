export class FormValidator {
    formElement;
    inputList;
    submitButton;
    inactiveButtonClass;
    inputErrorClass;
    errorClass;
    constructor({ inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }, formElement) {
        this.formElement = formElement;
        this.inputList = this.formElement.querySelectorAll(inputSelector);
        this.submitButton = this.formElement.querySelector(submitButtonSelector);
        this.inactiveButtonClass = inactiveButtonClass;
        this.inputErrorClass = inputErrorClass;
        this.errorClass = errorClass;
    }
    showInputError(errorElement, inputElement, errorMessage) {
        inputElement.classList.add(this.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this.errorClass);
    }
    hideInputError(errorElement, inputElement) {
        inputElement.classList.remove(this.inputErrorClass);
        errorElement.classList.remove(this.errorClass);
        errorElement.textContent = "";
    }
    toggleButtonState() {
        const allValid = Array.from(this.inputList).every((input) => input.validity.valid);
        this.submitButton.disabled = !allValid;
        if (!allValid) {
            this.submitButton.classList.add(this.inactiveButtonClass);
        }
        else {
            this.submitButton.classList.remove(this.inactiveButtonClass);
        }
    }
    getErrorContainer(inputElement) {
        const errorElement = document.querySelector(`.${inputElement.name}-input-error`);
        return errorElement;
    }
    validateInput(inputElement) {
        const errorElement = this.getErrorContainer(inputElement);
        if (!inputElement.validity.valid) {
            this.showInputError(errorElement, inputElement, inputElement.validationMessage);
        }
        else {
            this.hideInputError(errorElement, inputElement);
        }
        this.toggleButtonState();
    }
    setEventListeners() {
        this.inputList.forEach((input) => {
            input.addEventListener("input", (event) => {
                event.preventDefault();
                this.validateInput(input);
            });
        });
    }
    enableValidation() {
        this.setEventListeners();
    }
    resetValidation() {
        this.formElement.reset();
        this.inputList.forEach((input) => {
            const errorElement = this.getErrorContainer(input);
            this.hideInputError(errorElement, input);
        });
        this.submitButton.disabled = true;
        this.submitButton.classList.add(this.inactiveButtonClass);
    }
}
