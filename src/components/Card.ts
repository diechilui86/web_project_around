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

    private updateLikeButton (likeBtn: HTMLButtonElement){
        if(this.isLiked){
            likeBtn.classList.add("card__like-button_is-active");
        }else{
            likeBtn.classList.remove("card__like-button_is-active");
        }
    }

    private setEventListeners(): void {
        const likeBtn = this.element.querySelector(".card__like-button") as HTMLButtonElement;
        this.updateLikeButton(likeBtn);
        likeBtn.addEventListener("click", async () => {
            try{
                const cardLike = await api.toggleLike(this.id, this.isLiked);
                this.isLiked = cardLike.isLiked;
                this.updateLikeButton(likeBtn);
            }
            catch (err) {
                console.error("Fallo al cambiar estado de like:", err);
            }
        });

        const deleteBtn = this.element.querySelector(".card__delete-button") as HTMLButtonElement;
        deleteBtn.addEventListener("click", () => {
            const popupWithConfirmation = new PopupWithConfirmation({selector: "#confirm-popup", handleButtonClicked: async () => {
                try{
                    await api.deleteCard(this.id);
                    this.element.remove()
                }
                catch (err) {
                    console.error("Fallo al eliminar tarjeta:", err);
                }   
            }});
            popupWithConfirmation.open();
        });

        const cardImage = this.element.querySelector(".card__image") as HTMLImageElement;
        cardImage.addEventListener("click", () => {
            this.handleCardClick();
        });
    }

}      

