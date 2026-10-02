import { Card } from "./Card.js";
import { UserInfo } from "./UserInfo.js";
import { initialCards, profileInputDescription, profileInputName, newCardBtn, profileEditBtn } from "../utils/constants.js";
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
}
