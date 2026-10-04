import { Popup } from "./Popup.js";

type buttonClickedHandler = () => void | Promise<void>;

export class PopupWithConfirmation extends Popup {
    private buttonElement!: HTMLButtonElement;
    private handleButtonClicked: buttonClickedHandler;

    constructor({selector, handleButtonClicked}: {selector: string; handleButtonClicked: buttonClickedHandler}) {
        super(selector);
        this.handleButtonClicked = handleButtonClicked;
        this.buttonElement = this.popupElement.querySelector(".popup__button") as HTMLButtonElement;
    }

    setEventListeners(): void {
        super.setEventListeners();
        this.buttonElement.addEventListener("click", this.handleClick);
    }

    removeEventListeners(): void {
        super.removeEventListeners();
        this.buttonElement.removeEventListener("click", this.handleClick);
    }

    private handleClick =  async (event: MouseEvent): Promise<void> => {
        event.preventDefault();
        await this.handleButtonClicked();
        this.close();
    }
  
}

