//* Класс карточки
export class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".elements__like-button");
    this._deleteButton = this._element.querySelector(
      ".elements__delete-button"
    );
  }

  //* Получение шаблона разметки
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".elements__list-item")
      .cloneNode(true);
    return cardElement;
  }

  //* Создание карточки
  createCardElement() {
    this._setEventListeners();
    const cardImage = this._element.querySelector(".elements__picture");
    cardImage.alt = `${this._data.name} by Brent Olson`;
    cardImage.src = this._data.link;
    this._element.querySelector(
      ".elements__text"
    ).textContent = this._data.name;

    return this._element;
  }

  //* Установка слушателей
  _setEventListeners() {
    this._deleteButton.addEventListener("click", () => this._deleteCard());

    this._likeButton.addEventListener("click", () => this._likeToggler());

    this._element
      .querySelector(".elements__picture")
      .addEventListener("click", this._handleCardClick);
  }

  //* Переключение состояния лайка
  _likeToggler() {
    this._likeButton.classList.toggle("heartbeat");
    this._likeButton.classList.toggle("elements__like-button_active");
  }

  //* Удаление карточки
  _deleteCard() {
    this._element.remove();
    this._element = null;
  }
}
