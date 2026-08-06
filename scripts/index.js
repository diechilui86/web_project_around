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
const cardContainer = document.querySelector(".cards__list");
const newCardBtn = profileSection.querySelector(".profile__add-button");
const newCardModal = document.querySelector("#new-card-popup");
const newCardCloseBtn = newCardModal.querySelector(".popup__close");
let newCardForm = newCardModal.querySelector("#new-card-form");
const newCardInputName = newCardModal.querySelector(
  ".popup__input_type_card-name",
);
const newCardInputLink = newCardModal.querySelector(".popup__input_type_url");

const imageModal = document.querySelector("#image-popup");
let imageModalImage = imageModal.querySelector(".popup__image");
let imageModalCaption = imageModal.querySelector(".popup__caption");
const imageModalCloseBtn = imageModal.querySelector(".popup__close");

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

function getCardElement(
  name = "Sin Titulo",
  link = "../images/placeholder.jpg",
) {
  const cardElement = document
    .querySelector("#card-template")
    .content.querySelector(".card")
    .cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  const likeBtn = cardElement.querySelector(".card__like-button");
  likeBtn.addEventListener("click", () =>
    likeBtn.classList.toggle("card__like-button_is-active"),
  );

  const deleteBtn = cardElement.querySelector(".card__delete-button");
  deleteBtn.addEventListener("click", () => cardElement.remove());

  cardImage.addEventListener("click", () => {
    imageModalImage.src = link;
    imageModalImage.alt = name;
    imageModalCaption.textContent = name;
    openModal(imageModal);
  });

  return cardElement;
}

function renderCard(name, link, container) {
  const card = getCardElement(name, link);
  container.prepend(card);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderCard(newCardInputName.value, newCardInputLink.value, cardContainer);
  closeModal(newCardModal);
  newCardForm.reset();
}

initialCards.forEach(function (card) {
  renderCard(card.name, card.link, cardContainer);
});

profileEditBtn.addEventListener("click", () =>
  handleOpenEditModal(editProfileModal),
);

profileEditCloseBtn.addEventListener("click", () =>
  closeModal(editProfileModal),
);

formElement.addEventListener("submit", handleProfileFormSubmit);

newCardBtn.addEventListener("click", () => openModal(newCardModal));
newCardCloseBtn.addEventListener("click", () => closeModal(newCardModal));

newCardForm.addEventListener("submit", handleCardFormSubmit);

imageModalCloseBtn.addEventListener("click", () => closeModal(imageModal));
