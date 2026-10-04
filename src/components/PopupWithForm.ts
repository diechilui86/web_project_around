import { Popup } from "./Popup.js";

type FormSubmit = (formValues: FormValues) => void | Promise<void>;

interface FormValues {
  [key: string]: string;
}

export class PopupWithForm extends Popup {
  private formElement!: HTMLFormElement;
  private inputsList!: NodeListOf<HTMLInputElement>;
  private handleFormSubmit: FormSubmit;

  constructor({
    selector,
    handleFormSubmit,
  }: {
    selector: string;
    handleFormSubmit: FormSubmit;
  }) {
    super(selector);
    this.handleFormSubmit = handleFormSubmit;
    this.generateForm();
  }

  private getFormElement(): HTMLFormElement {
    const formElement = this.popupElement.querySelector(
      ".popup__form",
    ) as HTMLFormElement;

    return formElement;
  }

  private generateForm(): HTMLElement {
    this.formElement = this.getFormElement();
    this.inputsList = this.formElement.querySelectorAll(".popup__input");

    return this.formElement;
  }

  setEventListeners(): void {
    super.setEventListeners();
    this.formElement.addEventListener("submit", this.handleSubmit);
  }

  removeEventListeners(): void {
    super.removeEventListeners();
    this.formElement.removeEventListener("submit", this.handleSubmit);
  }

  private handleSubmit = async (event: SubmitEvent): Promise<void> => {
    event.preventDefault();
    await this.handleFormSubmit(this.getInputValues());
    this.close();
  };

  private getInputValues(): FormValues {
    const formValues: FormValues = {};

    this.inputsList.forEach((input) => {
      formValues[input.name] = input.value;
    });

    return formValues;
  }

  close(): void {
    super.close();
    this.formElement.reset();
  }
}
