import type { CardData } from "../types/types.js";

export class Card {
    private name: string;
    private link: string;
    private isLiked: boolean;
    private id: string;
    private selector: string;
    private element!: HTMLElement;
    private handleCardClick: () => void;
    private handleDeleteClick: (cardId: string, cardElement: HTMLElement) => void;  
    private handleLikeClick: (cardId: string,isLiked: boolean) => Promise<CardData>;

    constructor({name, link, isLiked, _id}: CardData, selector: string, 
        handleCardClick: () => void, 
        handleDeleteClick: (cardId: string, cardElement: HTMLElement) => void, 
        handleLikeClick: (cardId: string, isLiked: boolean) => Promise<CardData>) 
        {
        this.name = name;
        this.link = link;
        this.isLiked = isLiked;
        this.id = _id;
        this.selector = selector;
        this.handleCardClick = handleCardClick;
        this.handleDeleteClick = handleDeleteClick;
        this.handleLikeClick = handleLikeClick;
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
                const updatedCardData = await this.handleLikeClick(this.id, this.isLiked);
                this.isLiked = updatedCardData.isLiked;
                this.updateLikeButton(likeBtn);
            }
            catch (err) {
                console.error("Fallo al cambiar estado de like:", err);
            }
        });

        const deleteBtn = this.element.querySelector(".card__delete-button") as HTMLButtonElement;
        deleteBtn.addEventListener("click", () => this.handleDeleteClick(this.id, this.element));

        const cardImage = this.element.querySelector(".card__image") as HTMLImageElement;
        cardImage.addEventListener("click", () => this.handleCardClick());
    }

}      

