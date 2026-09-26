export class UserInfo {
    nameElement;
    jobElement;
    constructor({ nameSelector, jobSelector }) {
        this.nameElement = document.querySelector(nameSelector);
        this.jobElement = document.querySelector(jobSelector);
    }
    getUserInfo() {
        const userInfo = {
            name: this.nameElement.textContent ?? "",
            job: this.jobElement.textContent ?? ""
        };
        return userInfo;
    }
    setUserInfo(userData) {
        this.nameElement.textContent = userData.name;
        this.jobElement.textContent = userData.job;
    }
}
