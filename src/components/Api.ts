import type { CardFormData, UserData, ApiOptions, UserFormData, CardData } from "../types/types.ts";
import { Card } from "./Card.js";
import { UserInfo } from "./UserInfo.js";

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
    const res:Response = await fetch(`${this.baseUrl}/cards`, {
      method:"GET",
      headers: this.headers
    });
    if (res.ok) {
      return await res.json();
    } 
    throw new Error(`${res.status}`);
  }

  async editProfile(userData:UserFormData): Promise<void>  {
    try {
      const res:Response = await fetch(`${this.baseUrl}/users/me`, {
        method:"PATCH",
        headers: this.headers,
        body: JSON.stringify({
          name: userData.name,
          about: userData.job
        })
      });
    } catch (err) {
      console.error("Fallo al actualiza perfil:", err);
    }
  } 

  async createCard(newCardData: CardFormData): Promise<CardData> {
      const res:Response = await fetch(`${this.baseUrl}/cards`, {
          method: "POST",
          headers: this.headers,
          body: JSON.stringify({
            name: newCardData.name,
            link: newCardData.link
          }),
        },
      );
      if (res.ok) {
        return await res.json();
      } 
      throw new Error(`${res.status}`);
  }

  // async toggleLike(cardId: string, isLiked: boolean): Promise<void> {
  //   try {
  //     const res:Response = await fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
  //       method: "PATCH",
  //       headers: this.headers,

  //     });
  //   } catch (err) {
  //     console.error("Fallo al cambiar estado de like:", err);
  //   }
  // }

  async deleteCard(cardId: string): Promise<void> {
    try {
      const res:Response = await fetch(`${this.baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: this.headers,
      });
    } catch (err) {
      console.error("Fallo al eliminar tarjeta:", err);
    }
  }

  
}

