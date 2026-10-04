import type { CardFormData, UserData, ApiOptions, UserFormData, CardData } from "../types/types.ts";

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

  async editProfile(userData:UserFormData): Promise<UserData>  {
    const res:Response = await fetch(`${this.baseUrl}/users/me`, {
      method:"PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.job
      })
    });
    if (res.ok) {
      return await res.json();
    } 
    throw new Error(`${res.status}`);
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

  async updateAvatar(avatarUrl: string): Promise<UserData>  { 
    const res:Response = await fetch(`${this.baseUrl}/users/me/avatar`, {
      method:"PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatarUrl
      })
    });
    if (res.ok) {
      return await res.json();
    } 
    throw new Error(`${res.status}`);
  }

  async toggleLike(cardId: string, isLiked: boolean): Promise<CardData> {
    const res:Response = await fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this.headers,
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error(`${res.status}`);
  }

  async deleteCard(cardId: string): Promise<void> {
    const res:Response = await fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    });
    if (res.ok) {
      return await res.json();
    } 
    throw new Error(`${res.status}`);
  }
}

