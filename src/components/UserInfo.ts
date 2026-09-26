import type { UserData } from "../types/types.js";

export class UserInfo {
  private nameElement: HTMLElement;
  private jobElement: HTMLElement;
  

  constructor({nameSelector, jobSelector}:{nameSelector:string, jobSelector:string}){
    this.nameElement = document.querySelector(nameSelector) as HTMLElement;
    this.jobElement = document.querySelector(jobSelector) as HTMLElement;
    
  }

  getUserInfo(): UserData {
    const userInfo: UserData ={
      name: this.nameElement.textContent ?? "",
      job: this.jobElement.textContent ?? ""
    };

    return userInfo;
  }

  setUserInfo(userData:UserData):void{
    this.nameElement.textContent = userData.name;
    this.jobElement.textContent = userData.job;
  }
}

