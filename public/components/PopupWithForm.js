import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    formElement;
    inputsList;
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
        this.inputsList = this.formElement.querySelectorAll(".popup__input");
        return this.formElement;
    }
    setEventListeners() {
        super.setEventListeners();
        this.formElement.addEventListener("submit", this.handleSubmit);
    }
    removeEventListeners() {
        super.removeEventListeners();
        this.formElement.removeEventListener("submit", this.handleSubmit);
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        await this.handleFormSubmit(this.getInputValues());
        this.close();
    };
    getInputValues() {
        const formValues = {};
        this.inputsList.forEach((input) => {
            formValues[input.name] = input.value;
        });
        return formValues;
    }
    close() {
        super.close();
        this.formElement.reset();
    }
}
