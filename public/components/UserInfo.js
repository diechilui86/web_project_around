export class UserInfo {
    nameElement;
    jobElement;
    _id;
    constructor({ nameSelector, jobSelector, }) {
        this.nameElement = document.querySelector(nameSelector);
        this.jobElement = document.querySelector(jobSelector);
        this._id = "";
    }
    getUserInfo() {
        const userInfo = {
            name: this.nameElement.textContent ?? "",
            job: this.jobElement.textContent ?? "",
        };
        return userInfo;
    }
    setUserInfo(userData) {
        this.nameElement.textContent = userData.name;
        this.jobElement.textContent = userData.about;
        this._id = userData._id;
    }
    getUserId() {
        return this._id;
    }
}
