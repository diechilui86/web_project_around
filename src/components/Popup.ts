
export abstract class Popup {
  protected selector: string;
  protected popupElement: HTMLElement;

  constructor(selector: string) {
    this.selector = selector;
    this.popupElement = document.querySelector(this.selector) as HTMLElement;
  }
  
  open(): void { 
    this.popupElement.classList.add("popup_is-opened");
  }
  close(): void {
    this.popupElement.classList.remove("popup_is-opened");
  }

  private handleEscClose = (event: KeyboardEvent): void => {
    if (event.key === "Escape") {
      this.close();
      this.removeEventListeners();
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