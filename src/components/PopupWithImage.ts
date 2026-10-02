import { Popup } from "./Popup.js";
import type {CardFormData} from "../types/types.js";

export class PopupWithImage extends Popup {
    private name: string;
    private link: string;


  constructor({name, link}: CardFormData, selector: string) {
    super(selector);
    this.name = name;
    this.link = link;
  }

  open(): void {
    super.open();
    const popupImage = this.popupElement.querySelector(".popup__image") as HTMLImageElement;
    const popupCaption = this.popupElement.querySelector(".popup__caption") as HTMLElement;
    
    popupCaption.textContent = this.name;
    popupImage.src = this.link;
    popupImage.alt = this.name;
  }
}

