export class UserInfo {
    name;
    description;
    constructor({ name, description }) {
        this.name = name;
        this.description = description;
    }
    getUserInfo() {
        //return userInfo;
    }
    setUserInfo() {
    }
}
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

function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeWithEsc);
  modal.addEventListener("click", closeWithClickOutside);
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeWithEsc);
  modal.removeEventListener("click", closeWithClickOutside);
  const form = modal.querySelector("form");

  if (form) {
    resetValidation(validationConfig, form);
  }
}

function fillProfileForm() {
  profileInputName.value = profileName.textContent;
  profileInputDescription.value = profileDescription.textContent;
}

function handleOpenEditModal(modal) {
  fillProfileForm();
  openModal(modal);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileInputName.value;
  profileDescription.textContent = profileInputDescription.value;
  closeModal(editProfileModal);
}

profileEditBtn.addEventListener("click", () =>
  handleOpenEditModal(editProfileModal),
);
profileEditCloseBtn.addEventListener("click", () =>
  closeModal(editProfileModal),
);




*/ 
