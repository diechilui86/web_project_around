import { Popup } from "./Popup.js";
export class PopupWithConfirmation extends Popup {
    buttonElement;
    handleButtonClicked;
    constructor({ selector, handleButtonClicked, }) {
        super(selector);
        this.handleButtonClicked = handleButtonClicked;
        this.buttonElement = this.popupElement.querySelector(".popup__button");
    }
    setEventListeners() {
        super.setEventListeners();
        this.buttonElement.addEventListener("click", this.handleClick);
    }
    removeEventListeners() {
        super.removeEventListeners();
        this.buttonElement.removeEventListener("click", this.handleClick);
    }
    handleClick = async (event) => {
        event.preventDefault();
        await this.handleButtonClicked();
        this.close();
    };
}
