import Popup from "./Popup.js";

//* Класс попапа с формой
export default class PopupWithForm extends Popup {
  constructor(popupElement, { submitFormCallBack }) {
    super(popupElement);
    this._submitFormCallBack = submitFormCallBack;
    this._submitForm = this._submitForm.bind(this);
    this._form = this._popupSelector.querySelector(".popup__form");
    this._inputs = Array.from(this._form.querySelectorAll(".popup__input"));
  }

  //* Сабмит формы
  _submitForm(evt) {
    evt.preventDefault();
    this._submitFormCallBack(this._getInputValues());
  }

  //* Метод сбора данных со всех полей формы
  _getInputValues() {
    const data = {};
    this._inputs.forEach((input) => {
      data[input.name] = input.value;
    });
    return data;
  }

  //* Перезапись родительского метода закрытия попапа
  close() {
    super.close();
    this._form.reset();
  }

  //* Перезапись родительского метода установки слушателей
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._submitForm);
  }
}
