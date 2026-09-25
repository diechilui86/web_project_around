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
        const popupImage = this.popupElement.querySelector(".popup__image");
        const popupCaption = this.popupElement.querySelector(".popup__caption");
        popupCaption.textContent = this.name;
        popupImage.src = this.link;
        popupImage.alt = this.name;
    }
}
