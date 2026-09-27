import { Popup } from "./Popup.js";

type FormSubmit = (formValues: FormValues) => void;

interface FormValues{
  [key: string]: string;
}

export class PopupWithForm extends Popup {
  private formElement!: HTMLFormElement;
  private inputList!: NodeListOf<HTMLInputElement>;
  private handleFormSubmit: FormSubmit;

  constructor({selector, handleFormSubmit}: {selector: string; handleFormSubmit: FormSubmit}) {
    super(selector);
    this.handleFormSubmit = handleFormSubmit;
    this.generateForm();
  }

  private getFormElement(): HTMLFormElement {
    const formElement = this.popupElement.querySelector(".popup__form") as HTMLFormElement;
    
    return formElement;
  }

  private generateForm(): HTMLElement {
    this.formElement = this.getFormElement();
    this.inputList = this.formElement.querySelectorAll(".popup__input");

    return this.formElement;
  }

  setEventListeners(): void {
    super.setEventListeners();
    this.formElement.addEventListener("submit", this.handleSubmit);
  }

  private handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    this.handleFormSubmit(this.getInputValues());
    this.close();
  }

  private getInputValues(): FormValues {
    const formValues: FormValues = {};

    this.inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });

    return formValues;

  }

  close(): void {
    super.close();
    this.formElement.reset();
  } 

}