import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
    name;
    link;
    constructor({ name, link }, selector) {
        super(selector);
        this.name = name;
        this.link = link;
    }
    open() {
        super.open();
        const popupImage = document.querySelector(".popup__image");
        const popupCaption = document.querySelector(".popup__caption");
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
