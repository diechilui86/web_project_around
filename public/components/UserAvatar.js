export class UserAvatar {
    imageElement;
    imageButtonElement;
    handleAvatarClick;
    constructor(imageSelector, handleAvatarClick) {
        this.imageButtonElement = document.querySelector(imageSelector);
        this.imageElement = this.imageButtonElement.querySelector(".profile__image");
        this.handleAvatarClick = handleAvatarClick;
        this.setEventListeners();
    }
    getAvatarUrl() {
        return this.imageElement.src;
    }
    setAvatarUrl(src) {
        this.imageElement.src = src;
    }
    setEventListeners() {
        this.imageButtonElement.addEventListener("click", this.handleAvatarClick);
    }
}
