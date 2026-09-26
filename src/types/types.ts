export interface CardData {
    name: string;
    link: string;
}

export interface UserData {
  name: string;
  job: string;
}

export interface ConfigObject {
    inputSelector: string,
    submitButtonSelector: string,
    inactiveButtonClass: string,
    inputErrorClass: string,
    errorClass: string,
}