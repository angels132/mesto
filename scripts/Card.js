// импортируем все из модуля constants.js и присваиваем их в константу
import * as constants from "./constants.js";
// импортируем функцию openPopup из модуля index.js
import { openPopup } from "./index.js";
// объявляем класс Card 
export class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".elements__list-item")
      .cloneNode(true);
    // возвращаем шаблон карточки
    return cardElement;
  }
  // метод, генерирующий карточку
  generateCard() {
    this._element = this._getTemplate();
    // константы с изображением и текстом карточки
    const elementPictureLink = this._element.querySelector(".elements__picture");
    const elementText = this._element.querySelector(".elements__text");

    elementPictureLink.style.backgroundImage = "url("+`${this._link}`+")";
    elementText.textContent = this._name;
    // устанавливаем обработчики событий на созданную карточку
    this._setEventListeners();

    return this._element;
  }
  // метод, установки обработчиков событий на элементы карточки
  _setEventListeners() {
    this._element
      .querySelector(".elements__like-button")
      .addEventListener("click", () => {
        this._likeButtonClick();
      });
    this._element
      .querySelector(".elements__delete-button")
      .addEventListener("click", () => {
        this._deleteButtonClick();
      });
    this._element
      .querySelector(".elements__picture")
      .addEventListener("click", () => {
        this._pictureClick();
      });
  }
  // метод, переключающий стили кнопки "Лайк"
  _likeButtonClick() {
    this._element
      .querySelector(".elements__like-button")
      .classList.toggle("elements__like-button_active");
    this._element
      .querySelector(".elements__like-button")
      .classList.toggle("heartbeat");
  }
  // метод, удаляющий карточку
  _deleteButtonClick() {
    this._element.remove();
  }
  // метод, открывающий всплывающее окно с изображением и именем карточки
  _pictureClick() {
    openPopup(constants.openPicturePopup);
    constants.popupPicture.src = this._link;
    constants.popupDescription.textContent = this._name;
  }
}