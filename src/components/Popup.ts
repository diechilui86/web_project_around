
export abstract class Popup {
  protected selector: string;
  protected popupElement: HTMLElement;
  private closeButton: HTMLButtonElement;

  constructor(selector: string) {
    this.selector = selector;
    this.popupElement = document.querySelector(this.selector) as HTMLElement;
    this.closeButton = this.popupElement.querySelector(".popup__close") as HTMLButtonElement;
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
    }
  }

  private handleCloseClick = (): void => {
    this.close()
  }

  private handleOverlayClick = (event: MouseEvent): void => {
      if (event.target === this.popupElement) {
        this.close();
      }
  }

  setEventListeners(): void {
    document.addEventListener("keydown", this.handleEscClose);
    this.closeButton.addEventListener("click", this.handleCloseClick);
    this.popupElement.addEventListener("click", this.handleOverlayClick);
  }

  removeEventListeners(): void {
    document.removeEventListener("keydown", this.handleEscClose);
    this.closeButton.removeEventListener("click", this.handleCloseClick);
    this.popupElement.removeEventListener("click", this.handleOverlayClick);
  }
}