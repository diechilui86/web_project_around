import type { UserFormData, UserData } from "../types/types.js";

export class UserInfo {
  private nameElement: HTMLElement;
  private jobElement: HTMLElement;
  private _id: string;

  constructor({
    nameSelector,
    jobSelector,
  }: {
    nameSelector: string;
    jobSelector: string;
  }) {
    this.nameElement = document.querySelector(nameSelector) as HTMLElement;
    this.jobElement = document.querySelector(jobSelector) as HTMLElement;
    this._id = "";
  }

  getUserInfo(): UserFormData {
    const userInfo: UserFormData = {
      name: this.nameElement.textContent ?? "",
      job: this.jobElement.textContent ?? "",
    };

    return userInfo;
  }

  setUserInfo(userData: UserData): void {
    this.nameElement.textContent = userData.name;
    this.jobElement.textContent = userData.about;
    this._id = userData._id;
  }

  getUserId(): string {
    return this._id;
  }
}
