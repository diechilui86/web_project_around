export class Card {
    name;
    link;
    isLiked;
    id;
    selector;
    element;
    handleCardClick;
    handleDeleteClick;
    handleLikeClick;
    constructor({ name, link, isLiked, _id }, selector, handleCardClick, handleDeleteClick, handleLikeClick) {
        this.name = name;
        this.link = link;
        this.isLiked = isLiked;
        this.id = _id;
        this.selector = selector;
        this.handleCardClick = handleCardClick;
        this.handleDeleteClick = handleDeleteClick;
        this.handleLikeClick = handleLikeClick;
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
    updateLikeButton(likeBtn) {
        if (this.isLiked) {
            likeBtn.classList.add("card__like-button_is-active");
        }
        else {
            likeBtn.classList.remove("card__like-button_is-active");
        }
    }
    setEventListeners() {
        const likeBtn = this.element.querySelector(".card__like-button");
        this.updateLikeButton(likeBtn);
        likeBtn.addEventListener("click", async () => {
            try {
                const updatedCardData = await this.handleLikeClick(this.id, this.isLiked);
                this.isLiked = updatedCardData.isLiked;
                this.updateLikeButton(likeBtn);
            }
            catch (err) {
                console.error("Fallo al cambiar estado de like:", err);
            }
        });
        const deleteBtn = this.element.querySelector(".card__delete-button");
        deleteBtn.addEventListener("click", () => this.handleDeleteClick(this.id, this.element));
        const cardImage = this.element.querySelector(".card__image");
        cardImage.addEventListener("click", () => this.handleCardClick());
    }
}
