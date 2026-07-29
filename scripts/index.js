let initialCards = [
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

initialCards.forEach(function (card) {
  console.log(card.name);
});

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
let profileName = profileSection.querySelector(".profile__title");
let profileDescription = profileSection.querySelector(".profile__description");

let formElement = editProfileModal.querySelector("#edit-profile-form");

profileEditBtn.addEventListener("click", () =>
  handleOpenEditModal(editProfileModal),
);

profileEditCloseBtn.addEventListener("click", () =>
  closeModal(editProfileModal),
);

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
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

formElement.addEventListener("submit", handleProfileFormSubmit);
