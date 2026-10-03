import { Card } from "./Card.js";
import { UserInfo } from "./UserInfo.js";
export class Api {
    baseUrl;
    headers;
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }
    async getUserInfo() {
        const res = await fetch(`${this.baseUrl}/users/me`, {
            method: "GET",
            headers: this.headers
        });
        if (res.ok) {
            return await res.json();
        }
        throw new Error(`${res.status}`);
    }
    async getInitialCards() {
        const res = await fetch(`${this.baseUrl}/cards`, {
            method: "GET",
            headers: this.headers
        });
        if (res.ok) {
            return await res.json();
        }
        throw new Error(`${res.status}`);
    }
    async editProfile(userData) {
        try {
            const res = await fetch(`${this.baseUrl}/users/me`, {
                method: "PATCH",
                headers: this.headers,
                body: JSON.stringify({
                    name: userData.name,
                    about: userData.job
                })
            });
        }
        catch (err) {
            console.error("Fallo al actualiza perfil:", err);
        }
    }
    async createCard(newCardData) {
        const res = await fetch(`${this.baseUrl}/cards`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({
                name: newCardData.name,
                link: newCardData.link
            }),
        });
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
    async deleteCard(cardId) {
        try {
            const res = await fetch(`${this.baseUrl}/cards/${cardId}`, {
                method: "DELETE",
                headers: this.headers,
            });
        }
        catch (err) {
            console.error("Fallo al eliminar tarjeta:", err);
        }
    }
}
