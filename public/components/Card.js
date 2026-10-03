import { PopupWithConfirmation } from "./PopupWithConfirmation.js";
import { api } from "../utils/constants.js";
export class Card {
    name;
    link;
    isLiked;
    id;
    selector;
    element;
    handleCardClick;
    constructor({ name, link, isLiked, _id }, selector, handleCardClick) {
        this.name = name;
        this.link = link;
        this.isLiked = isLiked;
        this.id = _id;
        this.selector = selector;
        this.handleCardClick = handleCardClick;
    }
    getTemplate() {
        const cardTemplate = document.querySelector(this.selector);
        const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);
        return cardElement;
    }
    generateCard() {
        this.element = this.getTemplate();
        this.setEventListeners();
        const cardTitle = this.element.querySelector(".card__title");
        const cardImage = this.element.querySelector(".card__image");
        cardTitle.textContent = this.name;
        cardImage.src = this.link;
        cardImage.alt = this.name;
        return this.element;
    }
    setEventListeners() {
        const likeBtn = this.element.querySelector(".card__like-button");
        likeBtn.addEventListener("click", () => {
            likeBtn.classList.toggle("card__like-button_is-active");
            console.log(this.isLiked);
        });
        const deleteBtn = this.element.querySelector(".card__delete-button");
        deleteBtn.addEventListener("click", () => {
            const popupWithConfirmation = new PopupWithConfirmation({ selector: "#confirm-popup", handleButtonClicked: () => {
                    api.deleteCard(this.id);
                    this.element.remove();
                } });
            popupWithConfirmation.open();
        });
        const cardImage = this.element.querySelector(".card__image");
        cardImage.addEventListener("click", () => {
            this.handleCardClick();
        });
    }
}
