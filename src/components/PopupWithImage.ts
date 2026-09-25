import { Popup } from "./Popup.js";
import type {CardData} from "../types/types.js";

export class PopupWithImage extends Popup {
    private name: string;
    private link: string;


  constructor({name, link}: CardData, selector: string) {
    super(selector);
    this.name = name;
    this.link = link;
  }

  open(): void {
    super.open();
    const popupImage = document.querySelector(".popup__image") as HTMLImageElement;
    const popupCaption = document.querySelector(".popup__caption") as HTMLElement;
    
    popupCaption.textContent = this.name;
    popupImage.src = this.link;
    popupImage.alt = this.name;
  }
}



/*
const imageModal = document.querySelector("#image-popup");
const imageModalImage = imageModal.querySelector(".popup__image");
const imageModalCaption = imageModal.querySelector(".popup__caption");
const imageModalCloseBtn = imageModal.querySelector(".popup__close");

cardImage.addEventListener("click", () => {
            imageModalImage.src = link;
            imageModalImage.alt = name;
            imageModalCaption.textContent = name;
            openModal(imageModal);
        });



*/