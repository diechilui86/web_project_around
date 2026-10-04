import type { UserFormData } from "../types/types.js";

export class UserInfo {
  private nameElement: HTMLElement;
  private jobElement: HTMLElement;

  constructor({
    nameSelector,
    jobSelector,
  }: {
    nameSelector: string;
    jobSelector: string;
  }) {
    this.nameElement = document.querySelector(nameSelector) as HTMLElement;
    this.jobElement = document.querySelector(jobSelector) as HTMLElement;
  }

  getUserInfo(): UserFormData {
    const userInfo: UserFormData = {
      name: this.nameElement.textContent ?? "",
      job: this.jobElement.textContent ?? "",
    };

    return userInfo;
  }

  setUserInfo(userData: UserFormData): void {
    this.nameElement.textContent = userData.name;
    this.jobElement.textContent = userData.job;
  }
}
