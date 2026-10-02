import type { CardFormData, UserData, ApiOptions, UserFormData, CardData } from "../types/types.ts";
import { Card } from "./Card.js";
import { UserInfo } from "./UserInfo.js";
import { initialCards, profileInputDescription, profileInputName, newCardBtn, profileEditBtn } from "../utils/constants.js";

export class Api {

  private baseUrl:string;
  private headers: Record<string,string>;

  constructor({baseUrl, headers}:ApiOptions) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  
  }

  async getUserInfo(): Promise<UserData> {
    const res:Response = await fetch(`${this.baseUrl}/users/me`, {
      method:"GET",
      headers: this.headers
    });
    if(res.ok){
      return await res.json();
    }
    throw new Error(`${res.status}`);  
  }

  async getInitialCards(): Promise<CardData[]> {
    const res = await fetch(`${this.baseUrl}/cards`, {
      method:"GET",
      headers: this.headers
    });
    if (res.ok) {
      return await res.json();
    } 
    throw new Error(`${res.status}`);
  }
}

