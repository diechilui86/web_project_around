export class Card {
    name;
    link;
    selector;
    element;
    handleCardClick;
    constructor({ name, link }, selector, handleCardClick) {
        this.name = name;
        this.link = link;
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
        likeBtn.addEventListener("click", () => likeBtn.classList.toggle("card__like-button_is-active"));
        const deleteBtn = this.element.querySelector(".card__delete-button");
        deleteBtn.addEventListener("click", () => this.element.remove());
        const cardImage = this.element.querySelector(".card__image");
        cardImage.addEventListener("click", () => {
            this.handleCardClick();
        });
    }
}
