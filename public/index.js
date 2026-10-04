import { Card } from "./components/Card.js";
import { profileInputDescription, profileInputName, newCardBtn, profileEditBtn, defaultFormConfig, api, avatarInputUrl } from "./utils/constants.js";
import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { UserInfo } from "./components/UserInfo.js";
import { FormValidator } from "./components/FormValidator.js";
import { UserAvatar } from "./components/UserAvatar.js";
const user = new UserInfo({ nameSelector: ".profile__title", jobSelector: ".profile__description" });
const cardList = new Section({
    items: [],
    renderer: (item) => renderCard(item, cardList)
}, ".cards__list");
const openImagePopup = (cardFormData) => {
    const popupWithImage = new PopupWithImage(cardFormData, "#image-popup");
    popupWithImage.open();
};
const profilePopup = new PopupWithForm({ selector: "#edit-popup", handleFormSubmit: async (formValues) => {
        user.setUserInfo({ name: formValues.name, job: formValues.description });
        await api.editProfile({ name: formValues.name, job: formValues.description }, profilePopup.popupButtonElement);
    } });
const newCardPopup = new PopupWithForm({ selector: "#new-card-popup", handleFormSubmit: async (formValues) => {
        const cardFormData = {
            name: formValues["place-name"],
            link: formValues.link
        };
        const newCardData = await api.createCard(cardFormData, newCardPopup.popupButtonElement);
        renderCard(newCardData, cardList);
    } });
const newAvatarPopup = new PopupWithForm({ selector: "#avatar-popup", handleFormSubmit: async (formValues) => {
        await api.updateAvatar(formValues.link, newAvatarPopup.popupButtonElement);
        avatar.setAvatarUrl(formValues.link);
    } });
profileEditBtn.addEventListener("click", () => {
    profileFormValidator.resetValidation();
    const userData = user.getUserInfo();
    profileInputName.value = userData.name;
    profileInputDescription.value = userData.job;
    profilePopup.open();
});
newCardBtn.addEventListener("click", () => {
    cardFormValidator.resetValidation();
    newCardPopup.open();
});
const avatar = new UserAvatar(".profile__image-button", () => {
    avatarFormValidator.resetValidation();
    avatarInputUrl.value = avatar.getAvatarUrl();
    newAvatarPopup.open();
});
const editProfileForm = document.querySelector("#edit-profile-form");
const profileFormValidator = new FormValidator(defaultFormConfig, editProfileForm);
profileFormValidator.enableValidation();
const newCardForm = document.querySelector("#new-card-form");
const cardFormValidator = new FormValidator(defaultFormConfig, newCardForm);
cardFormValidator.enableValidation();
const avatarForm = document.querySelector("#avatar-form");
const avatarFormValidator = new FormValidator(defaultFormConfig, avatarForm);
avatarFormValidator.enableValidation();
async function loadInitialData() {
    try {
        const [userData, initialCards] = await Promise.all([
            api.getUserInfo(),
            api.getInitialCards()
        ]);
        user.setUserInfo({ name: userData.name, job: userData.about });
        avatar.setAvatarUrl(userData.avatar);
        initialCards.forEach((item) => {
            renderCard(item, cardList);
        });
    }
    catch (err) {
        console.error("Fallo al cargar datos iniciales:", err);
    }
}
function renderCard(cardData, section) {
    const card = new Card(cardData, "#card-template", () => openImagePopup(cardData));
    const cardElement = card.generateCard();
    section.addItem(cardElement);
}
loadInitialData();
