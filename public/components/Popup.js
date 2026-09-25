export class Popup {
    selector;
    popupElement;
    constructor(selector) {
        this.selector = selector;
        this.popupElement = document.querySelector(this.selector);
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
            console.log("Popup closed with Escape key");
        }
    };
    setEventListeners() {
        document.addEventListener("keydown", this.handleEscClose);
        const closeButton = this.popupElement.querySelector(".popup__close");
        closeButton.addEventListener("click", () => this.close());
        this.popupElement.addEventListener("click", (event) => {
            if (event.target === this.popupElement) {
                this.close();
                console.log("Popup closed by clicking outside the content area");
            }
        });
    }
    removeEventListeners() {
        document.removeEventListener("keydown", this.handleEscClose);
    }
}
/*

function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeWithEsc);
  modal.addEventListener("click", closeWithClickOutside);
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeWithEsc);
  modal.removeEventListener("click", closeWithClickOutside);
  const form = modal.querySelector("form");

  if (form) {
    resetValidation(validationConfig, form);
  }
}

function closeWithClickOutside(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

*/ 
