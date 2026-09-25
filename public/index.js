import { Card } from "./components/Card.js";
import { initialCards } from "./utils/constants.js";
import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item, "#card-template", () => {
            const popupWithImage = new PopupWithImage({ name: item.name, link: item.link }, "#image-popup");
            popupWithImage.open();
            popupWithImage.setEventListeners();
        });
        const cardElement = card.generateCard();
        cardList.addItem(cardElement);
    }
}, ".cards__list");
cardList.renderItems();
const newCardForm = new PopupWithForm({ selector: "#new-card-popup", handleFormSubmit: (formValues) => {
        const newCard = new Card({ name: formValues["place-name"], link: formValues.link }, "#card-template", () => {
            const popupWithImage = new PopupWithImage({ name: formValues["place-name"], link: formValues.link }, "#image-popup");
            popupWithImage.open();
            popupWithImage.setEventListeners();
        });
        const cardElement = newCard.generateCard();
        cardList.addItem(cardElement);
    } });
const newCardBtn = document.querySelector(".profile__add-button");
newCardBtn.addEventListener("click", () => { newCardForm.open(); });
