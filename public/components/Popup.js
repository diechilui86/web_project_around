export class Popup {
    selector;
    popupElement;
    constructor(selector) {
        this.selector = selector;
        this.popupElement = document.querySelector(this.selector);
    }
    open() {
        this.popupElement.classList.add("popup_is-opened");
    }
    close() {
        this.popupElement.classList.remove("popup_is-opened");
    }
    handleEscClose = (event) => {
        if (event.key === "Escape") {
            this.close();
            this.removeEventListeners();
        }
    };
    setEventListeners() {
        document.addEventListener("keydown", this.handleEscClose);
        const closeButton = this.popupElement.querySelector(".popup__close");
        closeButton.addEventListener("click", () => this.close());
        this.popupElement.addEventListener("click", (event) => {
            if (event.target === this.popupElement) {
                this.close();
            }
        });
    }
    removeEventListeners() {
        document.removeEventListener("keydown", this.handleEscClose);
    }
}
