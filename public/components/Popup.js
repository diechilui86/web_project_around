export class Popup {
    selector;
    popupElement;
    closeButton;
    constructor(selector) {
        this.selector = selector;
        this.popupElement = document.querySelector(this.selector);
        this.closeButton = this.popupElement.querySelector(".popup__close");
    }
    open() {
        this.popupElement.classList.add("popup_is-opened");
        this.setEventListeners();
    }
    close() {
        this.popupElement.classList.remove("popup_is-opened");
        this.removeEventListeners();
    }
    handleEscClose = (event) => {
        if (event.key === "Escape") {
            this.close();
        }
    };
    handleCloseClick = () => {
        this.close();
    };
    handleOverlayClick = (event) => {
        if (event.target === this.popupElement) {
            this.close();
        }
    };
    setEventListeners() {
        document.addEventListener("keydown", this.handleEscClose);
        this.closeButton.addEventListener("click", this.handleCloseClick);
        this.popupElement.addEventListener("click", this.handleOverlayClick);
    }
    removeEventListeners() {
        document.removeEventListener("keydown", this.handleEscClose);
        this.closeButton.removeEventListener("click", this.handleCloseClick);
        this.popupElement.removeEventListener("click", this.handleOverlayClick);
    }
}
