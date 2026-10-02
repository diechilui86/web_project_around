import type { CardFormData, CardData } from "./types/types.js";
import { Card } from "./components/Card.js";
import { 
  profileInputDescription, 
  profileInputName, 
  newCardBtn,
  profileEditBtn,
  defaultFormConfig 
} from "./utils/constants.js";
import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { UserInfo } from "./components/UserInfo.js";
import { FormValidator } from "./components/FormValidator.js";
import { Api } from "./components/Api.js";

const openImagePopup = (cardFormData: CardFormData): void => {
  const popupWithImage = new PopupWithImage( cardFormData, "#image-popup");
  popupWithImage.open();
};

const newCardPopup = new PopupWithForm({selector: "#new-card-popup", handleFormSubmit: (formValues) => {
  const cardFormData: CardFormData = {
    name:formValues["place-name"],
    link: formValues.link
  }
  const newCard = new Card( cardFormData, "#card-template", ()=> openImagePopup(cardFormData));
  const cardElement = newCard.generateCard();   
  //cardList.addItem(cardElement);
}});

const user = new UserInfo({nameSelector:".profile__title" ,jobSelector:".profile__description"});

const profilePopup = new PopupWithForm({selector:"#edit-popup",handleFormSubmit:(formValues) => {
  //user.setUserInfo({name:formValues.name,job:formValues.description});
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

//nuevo codigo de api

const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "95e73e25-ad72-41b0-8aef-314b7db440e0",
    "Content-Type": "application/json"
  }
});

async function loadInitialData(): Promise<void>  {
  try {
    const [userData, initialCards] = await Promise.all([
      api.getUserInfo(),
      api.getInitialCards()
    ]);
    // Aquí usas ambos resultados para renderizar la página
    user.setUserInfo({name:userData.name,job:userData.about});
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
  } catch (err) {
    console.error("Fallo al cargar datos iniciales:", err);
  }
}

loadInitialData();


