import { Card } from "./components/Card.js";
import { profileInputDescription, profileInputName, newCardBtn, profileEditBtn, defaultFormConfig, api, avatarInputUrl, } from "./utils/constants.js";
import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { UserInfo } from "./components/UserInfo.js";
import { FormValidator } from "./components/FormValidator.js";
import { UserAvatar } from "./components/UserAvatar.js";
import { PopupWithConfirmation } from "./components/PopupWithConfirmation.js";
const user = new UserInfo({
    nameSelector: ".profile__title",
    jobSelector: ".profile__description",
});
const cardList = new Section({
    items: [],
    renderer: (item) => renderCard(item, cardList),
}, ".cards__list");
const openImagePopup = (cardFormData) => {
    const popupWithImage = new PopupWithImage(cardFormData, "#image-popup");
    popupWithImage.open();
};
const openConfirmationPopup = (cardId, cardElement) => {
    const popupWithConfirmation = new PopupWithConfirmation({
        selector: "#confirm-popup",
        handleButtonClicked: async () => {
            try {
                await api.deleteCard(cardId);
                cardElement.remove();
            }
            catch (err) {
                console.error("Fallo al eliminar tarjeta:", err);
            }
        },
    });
    popupWithConfirmation.open();
};
const profilePopup = new PopupWithForm({
    selector: "#edit-popup",
    handleFormSubmit: async (formValues) => {
        try {
            renderSavingState(true, profilePopup.popupButtonElement, "Guardar");
            const userData = await api.editProfile({
                name: formValues.name,
                job: formValues.description,
            });
            user.setUserInfo({ name: userData.name, job: userData.about });
        }
        catch (err) {
            console.error("Fallo al actualiza perfil:", err);
        }
        finally {
            renderSavingState(false, profilePopup.popupButtonElement, "Guardar");
        }
    },
});
const newCardPopup = new PopupWithForm({
    selector: "#new-card-popup",
    handleFormSubmit: async (formValues) => {
        try {
            renderSavingState(true, newCardPopup.popupButtonElement, "Crear");
            const cardFormData = {
                name: formValues["place-name"],
                link: formValues.link,
            };
            const newCardData = await api.createCard(cardFormData);
            renderCard(newCardData, cardList);
        }
        catch (err) {
            console.error("Fallo al crear tarjeta:", err);
        }
        finally {
            renderSavingState(false, newCardPopup.popupButtonElement, "Crear");
        }
    },
});
const newAvatarPopup = new PopupWithForm({
    selector: "#avatar-popup",
    handleFormSubmit: async (formValues) => {
        try {
            renderSavingState(true, newAvatarPopup.popupButtonElement, "Guardar");
            const userData = await api.updateAvatar(formValues.link);
            avatar.setAvatarUrl(userData.avatar);
        }
        catch (err) {
            console.error("Fallo al actualiza avatar:", err);
        }
        finally {
            renderSavingState(false, newAvatarPopup.popupButtonElement, "Guardar");
        }
    },
});
profileEditBtn.addEventListener("click", () => {
    profileFormValidator.resetValidation();
    const userData = user.getUserInfo();
    profileInputName.value = userData.name;
    profileInputDescription.value = userData.job;
    profileFormValidator.updateButtonState();
    profilePopup.open();
});
newCardBtn.addEventListener("click", () => {
    cardFormValidator.resetValidation();
    newCardPopup.open();
});
const avatar = new UserAvatar(".profile__image-button", () => {
    avatarFormValidator.resetValidation();
    avatarInputUrl.value = avatar.getAvatarUrl();
    avatarFormValidator.updateButtonState();
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
            api.getInitialCards(),
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
    const card = new Card(cardData, "#card-template", () => openImagePopup(cardData), (cardId, cardElement) => openConfirmationPopup(cardId, cardElement), (cardId, isLiked) => api.toggleLike(cardId, isLiked));
    const cardElement = card.generateCard();
    section.addItem(cardElement);
}
function renderSavingState(isSaving, buttonElement, originalText) {
    if (isSaving) {
        buttonElement.textContent = "Guardando...";
    }
    else {
        buttonElement.textContent = originalText;
    }
}
loadInitialData();
