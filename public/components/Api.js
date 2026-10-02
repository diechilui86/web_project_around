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
        const res = await fetch(`${this.baseUrl}/users/me`, {
            method: "PATCH",
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
}
