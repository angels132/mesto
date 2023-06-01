//* Класс с пользовательскими данными
export default class UserInfo {
  constructor({ profileName, profileJob, profileId, profileAvatar }) {
    this._name = profileName;
    this._job = profileJob;
    this._profileId = profileId;
    this._profileAvatar = profileAvatar;
  }

  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      job: this._job.textContent,
    };
    return userInfo;
  }

  setUserInfo(userInfo) {
    this._name.textContent = userInfo.name;
    this._job.textContent = userInfo.about;
  }

  setUserAvatar(data) {
    this._profileAvatar.src = data.avatar;
  }
}
