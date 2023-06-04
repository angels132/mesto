import Popup from "./Popup.js";

//* Класс попапа с картинкой
export default class PopupWithImage extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._image = this._popupElement.querySelector(".popup__image");
    this._imageSubtitle = this._popupElement.querySelector(
      ".popup__image-subtitle"
    );
  }

  //* Перезапись родительского метода
  open(data) {
    console.log(data)
    super.open();
    this._image.src = data.link;
    this._image.alt = data.name;
    this._imageSubtitle.textContent = data.name;
  }
}
