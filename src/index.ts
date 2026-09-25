import type { CardData } from "./types/types.js";
import { Card } from "./components/Card.js";
import { initialCards } from "./utils/constants.js";
import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage.js";

const cardList = new Section<CardData>(
    {
        items: initialCards,
        renderer: (item) => {
            const card = new Card(item, "#card-template", () => {
              const popupWithImage = new PopupWithImage({name: item.name, link: item.link}, "#image-popup");
              popupWithImage.open();
            });
            const cardElement = card.generateCard();   
            cardList.addItem(cardElement);
        }   
    },
    ".cards__list"
);

cardList.renderItems();


/*

initialCards.forEach(function (card) {
  renderCard(card.name, card.link, cardContainer);
});

profileEditBtn.addEventListener("click", () =>
  handleOpenEditModal(editProfileModal),
);
profileEditCloseBtn.addEventListener("click", () =>
  closeModal(editProfileModal),
);

newCardBtn.addEventListener("click", () => openModal(newCardModal));
newCardCloseBtn.addEventListener("click", () => closeModal(newCardModal));

formElement.addEventListener("submit", handleProfileFormSubmit);
newCardForm.addEventListener("submit", handleCardFormSubmit);



enableValidation(validationConfig);

*/