export const defaultFormConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__input-error_active",
};
export const initialCards = [
    {
        name: "Valle de Yosemite",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
    },
    {
        name: "Lago Louise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
    },
    {
        name: "Montañas Calvas",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
    },
    {
        name: "Latemar",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
    },
    {
        name: "Parque Nacional de la Vanoise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
    },
    {
        name: "Lago di Braies",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
    },
];
export const profileInputName = document.querySelector(".popup__input_type_name");
export const profileInputDescription = document.querySelector(".popup__input_type_description");
export const newCardBtn = document.querySelector(".profile__add-button");
export const profileEditBtn = document.querySelector(".profile__edit-button");
/*

const profileSection = document.querySelector(".profile");
const profileEditBtn = profileSection.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-popup");
const profileEditCloseBtn = editProfileModal.querySelector(".popup__close");
const profileInputName = editProfileModal.querySelector(
  ".popup__input_type_name",
);
const profileInputDescription = editProfileModal.querySelector(
  ".popup__input_type_description",
);
const profileName = profileSection.querySelector(".profile__title");
const profileDescription = profileSection.querySelector(
  ".profile__description",
);
const formElement = editProfileModal.querySelector("#edit-profile-form");
const cardContainer = document.querySelector(".cards__list");
const newCardBtn = profileSection.querySelector(".profile__add-button");
const newCardModal = document.querySelector("#new-card-popup");
const newCardCloseBtn = newCardModal.querySelector(".popup__close");
const newCardForm = newCardModal.querySelector("#new-card-form");
const newCardInputName = newCardModal.querySelector(
  ".popup__input_type_card-name",
);
const newCardInputLink = newCardModal.querySelector(".popup__input_type_url");



const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

*/ 
