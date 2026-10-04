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

  async editProfile(userData:UserFormData, buttonElement: HTMLButtonElement): Promise<void>  {
    try {
      this.renderSavingState(true, buttonElement, "Guardar");
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
    }finally {
      this.renderSavingState(false, buttonElement, "Guardar");
    }
  } 

  async createCard(newCardData: CardFormData, buttonElement: HTMLButtonElement): Promise<CardData> {
    try{
      this.renderSavingState(true, buttonElement, "Crear");
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
    } catch (err) {
        console.error("Fallo al crear tarjeta:", err);
        throw err;
    }  finally {
      this.renderSavingState(false, buttonElement, "Crear");
    } 
  }

  async toggleLike(cardId: string, isLiked: boolean): Promise<CardData> {
    if (isLiked) {
      const res:Response = await fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: this.headers,
      });
      return await res.json();
    } else {
      const res:Response = await fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: this.headers,
      });
      return await res.json();
    } 
  }

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

  async updateAvatar(avatarUrl: string, buttonElement: HTMLButtonElement): Promise<void>  {
    try {
      this.renderSavingState(true, buttonElement, "Guardar");
      const res:Response = await fetch(`${this.baseUrl}/users/me/avatar`, {
        method:"PATCH",
        headers: this.headers,
        body: JSON.stringify({
          avatar: avatarUrl
        })
      });
    } catch (err) {
      console.error("Fallo al actualiza avatar:", err);
    }finally {
      this.renderSavingState(false, buttonElement, "Guardar");
    }
  } 

  private renderSavingState(isSaving: boolean, buttonElement: HTMLButtonElement, originalText: string): void { 
    if (isSaving) {
      buttonElement.textContent = "Guardando...";
    } else {
      buttonElement.textContent = originalText;
    }
  } 
  
}

