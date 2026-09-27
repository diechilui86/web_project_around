import type { CardData } from "./types/types.js";
import { Card } from "./components/Card.js";
import { initialCards, 
  profileInputDescription, 
  profileInputName, 
  newCardBtn,
  profileEditBtn,
  defaultFormConfig } from "./utils/constants.js";
import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { UserInfo } from "./components/UserInfo.js";
import { FormValidator } from "./components/FormValidator.js";

const openImagePopup = (cardData: CardData): void => {
  const popupWithImage = new PopupWithImage( cardData, "#image-popup");
  popupWithImage.open();
};

const cardList = new Section<CardData>(
    {
        items: initialCards,
        renderer: (item) => {
            const card = new Card(item, "#card-template", () => openImagePopup(item));
            const cardElement = card.generateCard();   
            cardList.addItem(cardElement);
        }   
    },
    ".cards__list"
);

cardList.renderItems();

const newCardPopup = new PopupWithForm({selector: "#new-card-popup", handleFormSubmit: (formValues) => {
  const cardData: CardData = {
    name:formValues["place-name"],
    link: formValues.link
  }
  const newCard = new Card( cardData, "#card-template", ()=> openImagePopup(cardData));
  const cardElement = newCard.generateCard();   
  cardList.addItem(cardElement);
}});

const user = new UserInfo({nameSelector:".profile__title" ,jobSelector:".profile__description"});

const profilePopup = new PopupWithForm({selector:"#edit-popup",handleFormSubmit:(formValues) => {
  user.setUserInfo({name:formValues.name,job:formValues.description});
}});

newCardBtn.addEventListener("click", () =>{ 
  cardFormValidator.resetValidation();
  newCardPopup.open(); 
});

profileEditBtn.addEventListener("click", () =>{
  profileFormValidator.resetValidation();
  const userData = user.getUserInfo();
  profileInputName.value = userData.name;
  profileInputDescription.value = userData.job;
  profilePopup.open();
});

const editProfileForm = document.querySelector("#edit-profile-form") as HTMLFormElement;

const profileFormValidator = new FormValidator(defaultFormConfig,editProfileForm);
profileFormValidator.enableValidation();

const newCardForm = document.querySelector("#new-card-form") as HTMLFormElement;
const cardFormValidator = new FormValidator( defaultFormConfig, newCardForm );
cardFormValidator.enableValidation();