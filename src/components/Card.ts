import type { CardData } from "../types/types.js";
import {PopupWithConfirmation} from "./PopupWithConfirmation.js";
import {api} from "../utils/constants.js";

export class Card {
    private name: string;
    private link: string;
    private isLiked: boolean;
    private id: string;
    private selector: string;
    private element!: HTMLElement;
    private handleCardClick: () => void;

    constructor({name, link, isLiked, _id}: CardData, selector: string, handleCardClick: () => void) {
        this.name = name;
        this.link = link;
        this.isLiked = isLiked;
        this.id = _id;
        this.selector = selector;
        this.handleCardClick = handleCardClick;
    }

    private getTemplate(): HTMLElement {
        const cardTemplate = document.querySelector(this.selector) as HTMLTemplateElement;
        const cardElement = cardTemplate.content.querySelector(".card")!.cloneNode(true) as HTMLElement;

        return cardElement;
    }

    generateCard(): HTMLElement {
        this.element = this.getTemplate();
        this.setEventListeners();

        const cardTitle = this.element.querySelector(".card__title") as HTMLElement;
        const cardImage = this.element.querySelector(".card__image") as HTMLImageElement;

        cardTitle.textContent = this.name;
        cardImage.src = this.link;
        cardImage.alt = this.name;

        return this.element;
    }

    private setEventListeners(): void {
        const likeBtn = this.element.querySelector(".card__like-button") as HTMLButtonElement;
        likeBtn.addEventListener("click", () => {
            likeBtn.classList.toggle("card__like-button_is-active")
            console.log(this.isLiked);
        });

        const deleteBtn = this.element.querySelector(".card__delete-button") as HTMLButtonElement;
        deleteBtn.addEventListener("click", () => {
            const popupWithConfirmation = new PopupWithConfirmation({selector: "#confirm-popup", handleButtonClicked: () => {
                api.deleteCard(this.id);
                this.element.remove()
            }});
            popupWithConfirmation.open();
        });

        const cardImage = this.element.querySelector(".card__image") as HTMLImageElement;
        cardImage.addEventListener("click", () => {
            this.handleCardClick();
        });
    }

}      

