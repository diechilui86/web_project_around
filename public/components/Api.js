export class Api {
    baseUrl;
    headers;
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }
    async checkResponse(res) {
        if (res.ok) {
            return await res.json();
        }
        throw new Error(`Error: ${res.status}`);
    }
    async getUserInfo() {
        const res = await fetch(`${this.baseUrl}/users/me`, {
            method: "GET",
            headers: this.headers
        });
        return await this.checkResponse(res);
    }
    async getInitialCards() {
        const res = await fetch(`${this.baseUrl}/cards`, {
            method: "GET",
            headers: this.headers
        });
        return await this.checkResponse(res);
    }
    async editProfile(userData) {
        const res = await fetch(`${this.baseUrl}/users/me`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({
                name: userData.name,
                about: userData.job
            })
        });
        return await this.checkResponse(res);
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
        return await this.checkResponse(res);
    }
    async updateAvatar(avatarUrl) {
        const res = await fetch(`${this.baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({
                avatar: avatarUrl
            })
        });
        return await this.checkResponse(res);
    }
    async toggleLike(cardId, isLiked) {
        const res = await fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
            method: isLiked ? "DELETE" : "PUT",
            headers: this.headers,
        });
        return await this.checkResponse(res);
    }
    async deleteCard(cardId) {
        const res = await fetch(`${this.baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this.headers,
        });
        return await this.checkResponse(res);
    }
}
