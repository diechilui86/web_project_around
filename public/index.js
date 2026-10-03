import { Card } from "./components/Card.js";
import { profileInputDescription, profileInputName, newCardBtn, profileEditBtn, defaultFormConfig, api } from "./utils/constants.js";
import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { UserInfo } from "./components/UserInfo.js";
import { FormValidator } from "./components/FormValidator.js";
const openImagePopup = (cardFormData) => {
    const popupWithImage = new PopupWithImage(cardFormData, "#image-popup");
    popupWithImage.open();
};
const cardList = new Section({
    items: [],
    renderer: (item) => renderCard(item, cardList)
}, ".cards__list");
const newCardPopup = new PopupWithForm({ selector: "#new-card-popup", handleFormSubmit: (formValues) => {
        const cardFormData = {
            name: formValues["place-name"],
            link: formValues.link
        };
        handleNewCard(cardFormData);
    } });
const user = new UserInfo({ nameSelector: ".profile__title", jobSelector: ".profile__description" });
const profilePopup = new PopupWithForm({ selector: "#edit-popup", handleFormSubmit: (formValues) => {
        user.setUserInfo({ name: formValues.name, job: formValues.description });
        api.editProfile({ name: formValues.name, job: formValues.description });
    } });
newCardBtn.addEventListener("click", () => {
    cardFormValidator.resetValidation();
    newCardPopup.open();
});
profileEditBtn.addEventListener("click", () => {
    profileFormValidator.resetValidation();
    const userData = user.getUserInfo();
    profileInputName.value = userData.name;
    profileInputDescription.value = userData.job;
    profilePopup.open();
});
const editProfileForm = document.querySelector("#edit-profile-form");
const profileFormValidator = new FormValidator(defaultFormConfig, editProfileForm);
profileFormValidator.enableValidation();
const newCardForm = document.querySelector("#new-card-form");
const cardFormValidator = new FormValidator(defaultFormConfig, newCardForm);
cardFormValidator.enableValidation();
/////////nuevo codigo de api////////
async function loadInitialData() {
    try {
        const [userData, initialCards] = await Promise.all([
            api.getUserInfo(),
            api.getInitialCards()
        ]);
        user.setUserInfo({ name: userData.name, job: userData.about });
        initialCards.forEach((item) => {
            renderCard(item, cardList);
        });
    }
    catch (err) {
        console.error("Fallo al cargar datos iniciales:", err);
    }
}
loadInitialData();
function renderCard(cardData, section) {
    const card = new Card(cardData, "#card-template", () => openImagePopup(cardData));
    const cardElement = card.generateCard();
    section.addItem(cardElement);
}
async function handleNewCard(cardFormData) {
    try {
        const newCardData = await api.createCard(cardFormData);
        renderCard(newCardData, cardList);
    }
    catch (err) {
        console.error("Fallo al crear tarjeta:", err);
    }
}
