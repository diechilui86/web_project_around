export class UserAvatar {
  private imageElement: HTMLImageElement;
  private imageButtonElement: HTMLButtonElement;
  private handleAvatarClick: () => void;

  constructor(imageSelector: string, handleAvatarClick: () => void) {
    this.imageButtonElement = document.querySelector(
      imageSelector,
    ) as HTMLButtonElement;
    this.imageElement = this.imageButtonElement.querySelector(
      ".profile__image",
    ) as HTMLImageElement;
    this.handleAvatarClick = handleAvatarClick;
    this.setEventListeners();
  }

  getAvatarUrl(): string {
    return this.imageElement.src;
  }

  setAvatarUrl(src: string): void {
    this.imageElement.src = src;
  }

  private setEventListeners(): void {
    this.imageButtonElement.addEventListener("click", this.handleAvatarClick);
  }
}
