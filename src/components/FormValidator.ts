import type { ConfigObject } from "../types/types";

export class FormValidator {
    private formElement!: HTMLFormElement;
    private inputsList!: NodeListOf<HTMLInputElement>;
    private submitButton!: HTMLButtonElement;
    private inactiveButtonClass: string;
    private inputErrorClass: string;
    private errorClass: string;
  
    
    constructor({inputSelector, submitButtonSelector, inactiveButtonClass , inputErrorClass, errorClass}:ConfigObject, formElement: HTMLFormElement) {
        this.formElement = formElement;
        this.inputsList = this.formElement.querySelectorAll(inputSelector);
        this.submitButton = this.formElement.querySelector(submitButtonSelector) as HTMLButtonElement;
        this.inactiveButtonClass = inactiveButtonClass;
        this.inputErrorClass = inputErrorClass;
        this.errorClass = errorClass;
    }

    private showInputError( errorElement: HTMLElement, inputElement: HTMLInputElement, errorMessage: string): void { 
        inputElement.classList.add(this.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this.errorClass);
    }

    private hideInputError(errorElement: HTMLElement, inputElement: HTMLInputElement): void {
        inputElement.classList.remove(this.inputErrorClass);
        errorElement.classList.remove(this.errorClass);
        errorElement.textContent = "";
    }   

    private toggleButtonState(): void {
        const allValid = Array.from(this.inputsList).every((input) => input.validity.valid);
        this.submitButton.disabled = !allValid;
        if (!allValid){
            this.submitButton.classList.add(this.inactiveButtonClass);
        }else {
            this.submitButton.classList.remove(this.inactiveButtonClass);
        }
    }

    private getErrorContainer(inputElement: HTMLInputElement): HTMLElement{
        const errorElement = this.formElement.querySelector(`.${inputElement.name}-input-error`) as HTMLElement;
        return errorElement;
    }

    private validateInput(inputElement: HTMLInputElement): void{
        const errorElement = this.getErrorContainer(inputElement);
        if (!inputElement.validity.valid) {
            this.showInputError( errorElement, inputElement, inputElement.validationMessage);
        } else {
            this.hideInputError(errorElement, inputElement);
        }
        this.toggleButtonState();
    }

    private setEventListeners(): void {
        this.inputsList.forEach((input) => {
            input.addEventListener("input", (event: InputEvent) => {
                event.preventDefault();
                this.validateInput(input);
            });
        });
    }

    enableValidation(): void {
        this.setEventListeners();
    }

    resetValidation(): void {
        this.formElement.reset();
        this.inputsList.forEach((input) => { 
            const errorElement = this.getErrorContainer(input);
            this.hideInputError(errorElement, input); 
        });
        this.toggleButtonState();
    }

}


