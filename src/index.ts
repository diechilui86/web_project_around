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

const cardList = new Section<CardData>(
    {
        items: initialCards,
        renderer: (item) => {
            const card = new Card(item, "#card-template", () => {
              const popupWithImage = new PopupWithImage({name: item.name, link: item.link}, "#image-popup");
              popupWithImage.open();
              popupWithImage.setEventListeners();
            });
            const cardElement = card.generateCard();   
            cardList.addItem(cardElement);
        }   
    },
    ".cards__list"
);

cardList.renderItems();

const newCardPopup = new PopupWithForm({selector: "#new-card-popup", handleFormSubmit: (formValues) => {
    const newCard = new Card({name: formValues["place-name"], link: formValues.link},"#card-template", ()=>{
      const popupWithImage = new PopupWithImage({name: formValues["place-name"], link: formValues.link}, "#image-popup");
      popupWithImage.open();
      popupWithImage.setEventListeners();
    });
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
  newCardPopup.setEventListeners();
});

profileEditBtn.addEventListener("click", () =>{
  profileFormValidator.resetValidation();
  const userData = user.getUserInfo();
  profileInputName.value = userData.name;
  profileInputDescription.value = userData.job;
  profilePopup.open();
  profilePopup.setEventListeners();
});

const editProfileForm = document.querySelector("#edit-profile-form") as HTMLFormElement;

const profileFormValidator = new FormValidator(defaultFormConfig,editProfileForm);
profileFormValidator.enableValidation();

const newCardForm = document.querySelector("#new-card-form") as HTMLFormElement;
const cardFormValidator = new FormValidator( defaultFormConfig, newCardForm );
cardFormValidator.enableValidation();