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
    this._element = null;
    this._cardImage = null;
    this._likeButton = null;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".elements__list-item")
      .cloneNode(true);
      this._cardImage = cardElement.querySelector('.elements__picture');
      this._likeButton = cardElement.querySelector('.elements__like-button');
    // возвращаем шаблон карточки
    return cardElement;
  }
  // метод, генерирующий карточку
  generateCard() {
    this._element = this._getTemplate();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    const elementText = this._element.querySelector(".elements__text");
    elementText.textContent = this._name;
    this._setEventListeners();
    return this._element;
  }

  // метод, установки обработчиков событий на элементы карточки
  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._likeButtonClick();
    });
    this._element.querySelector(".elements__delete-button").addEventListener("click", () => {
      this._deleteButtonClick();
    });
    this._cardImage.addEventListener("click", () => {
      this._pictureClick();
    });
  }
  // метод, переключающий стили кнопки "Лайк"
  _likeButtonClick() {
    this._likeButton.classList.toggle("elements__like-button_active");
    this._likeButton.classList.toggle("heartbeat");
  }
  // метод, удаляющий карточку
  _deleteButtonClick() {
    this._element.remove();
  }
  // метод, открывающий всплывающее окно с изображением и именем карточки
  _pictureClick() {
    openPopup(constants.openPicturePopup);
    constants.popupPicture.src = this._link;
    constants.popupPicture.alt = this._name;
    constants.popupDescription.textContent = this._name;
  }
}