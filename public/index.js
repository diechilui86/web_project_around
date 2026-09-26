import { Card } from "./components/Card.js";
import { initialCards, profileInputDescription, profileInputName, newCardBtn, profileEditBtn } from "./utils/constants.js";
import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { UserInfo } from "./components/UserInfo.js";
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
const user = new UserInfo({ nameSelector: ".profile__title", jobSelector: ".profile__description" });
const profileForm = new PopupWithForm({ selector: "#edit-popup", handleFormSubmit: (formValues) => {
        user.setUserInfo({ name: formValues.name, job: formValues.description });
    } });
newCardBtn.addEventListener("click", () => { newCardForm.open(); });
profileEditBtn.addEventListener("click", () => {
    const userData = user.getUserInfo();
    profileInputName.value = userData.name;
    profileInputDescription.value = userData.job;
    profileForm.open();
});
