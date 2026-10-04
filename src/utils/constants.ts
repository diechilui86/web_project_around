import type { ConfigObject } from "../types/types.js";
import { Api } from "../components/Api.js";

export const defaultFormConfig: ConfigObject = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

export const profileInputName = document.querySelector(
  ".popup__input_type_name",
) as HTMLInputElement;
export const profileInputDescription = document.querySelector(
  ".popup__input_type_description",
) as HTMLInputElement;
export const avatarInputUrl = document.querySelector(
  ".popup__input_avatar-url",
) as HTMLInputElement;
export const newCardBtn = document.querySelector(
  ".profile__add-button",
) as HTMLButtonElement;
export const profileEditBtn = document.querySelector(
  ".profile__edit-button",
) as HTMLButtonElement;
export const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "95e73e25-ad72-41b0-8aef-314b7db440e0",
    "Content-Type": "application/json",
  },
});
