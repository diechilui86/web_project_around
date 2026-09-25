
export abstract class Popup {
  protected selector: string;
  private popupElement: HTMLElement;

  constructor(selector: string) {
    this.selector = selector;
    this.popupElement = document.querySelector(this.selector) as HTMLElement;
  }
  
  open(): void { 
    this.popupElement.classList.add("popup_is-opened");
    this.setEventListeners();
  }
  close(): void {
    this.popupElement.classList.remove("popup_is-opened");
    this.removeEventListeners();
  }

  private handleEscClose = (event: KeyboardEvent): void => {
    if (event.key === "Escape") {
      this.close();
      console.log("Popup closed with Escape key");
    }
  }

  setEventListeners(): void {
    document.addEventListener("keydown", this.handleEscClose);
    
    const closeButton = this.popupElement.querySelector(".popup__close") as HTMLButtonElement;
    closeButton.addEventListener("click", () => this.close());
    
    this.popupElement.addEventListener("click", (event: MouseEvent) => {
      if (event.target === this.popupElement) {
        this.close();
      }
    });
  }

  removeEventListeners(): void {
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