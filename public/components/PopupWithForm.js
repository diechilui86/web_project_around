import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    formElement;
    inputList;
    handleFormSubmit;
    constructor({ selector, handleFormSubmit }) {
        super(selector);
        this.handleFormSubmit = handleFormSubmit;
        this.generateForm();
    }
    getFormElement() {
        const formElement = this.popupElement.querySelector(".popup__form");
        return formElement;
    }
    generateForm() {
        this.formElement = this.getFormElement();
        this.inputList = this.formElement.querySelectorAll(".popup__input");
        this.setEventListeners();
        return this.formElement;
    }
    setEventListeners() {
        super.setEventListeners();
        this.formElement.addEventListener("submit", this.handleSubmit);
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.handleFormSubmit(this.getInputValues());
        this.close();
    };
    getInputValues() {
        const formValues = {};
        this.inputList.forEach((input) => {
            formValues[input.name] = input.value;
        });
        return formValues;
    }
    close() {
        super.close();
        this.formElement.reset();
    }
}
