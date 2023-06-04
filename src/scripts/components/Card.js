import { data } from "autoprefixer";

//* Класс карточки
export class Card {
  constructor(
    data,
    cardTemplate,
    userId,
    imagePopup,
    deleteCard,
    toggleCardLike,
    // deleteCardLike
  ) {
    this._data = data; //* полные данные о карточке
    this._cardTemplate = cardTemplate; //* класс шаблона разметки
    this._userId = userId; //* id профиля
    this._cardId = data._id; //* id карточки
    this._cardOwnerId = data.owner._id; //* id владельца карточки
    this._likes = data.likes; //* массив лайков
    this._imagePopup = imagePopup; //* функция открытия попапа с фото
    this._element = this._getTemplate(); //* разметка карточки
    this._likeButton = this._element.querySelector(".elements__like-button");
    this._deleteButton = this._element.querySelector(
      ".elements__delete-button"
    );
    this._likeCounter = this._element.querySelector(".elements__like-counter");
    this._deleteCard = deleteCard;
    this._toggleCardLike = toggleCardLike;
    // this._deleteCardLike = deleteCardLike;
  }

  //* Получение шаблона разметки
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardTemplate)
      .content.querySelector(".elements__list-item")
      .cloneNode(true);
    return cardElement;
  }

  //* Создание карточки
  createCardElement() {
    this._cardImage = this._element.querySelector(".elements__picture");
    this._cardImage.alt = this._data.name;
    this._cardImage.src = this._data.link;
    this._element.querySelector(
      ".elements__text"
    ).textContent = this._data.name;
    this._element.querySelector(
      ".elements__like-counter"
    ).textContent = this._likes.length;
    this._setIsLiked();
    this._setEventListeners();
    return this._element;
  }

  //* Установка слушателей
  _setEventListeners() {
    if (this._cardOwnerId === this._userId) {
      this._deleteButton.classList.add("elements__delete-button_active");
      this._deleteButton.addEventListener("click", () =>
        this._deleteButtonClick()
      );
    }

    this._likeButton.addEventListener("click", () => this._toggleCardLike(this._likes));

    this._cardImage.addEventListener("click", this._imagePopup);
  }

  //* Проверка наличия лайка пользователя на крточке
  isLiked(likes) {
    //* Условие будет true если в массиве лайков найдется лайк с id пользователя
    return likes.some((elem) => elem._id === this._userId)
  }

  //* Переключение состояния лайка
  likeToggler({ likes }) {
    this._likeCounter.textContent = likes.length;
    this._likes = likes;
    this._likeButton.classList.toggle("heartbeat");
    this._likeButton.classList.toggle("elements__like-button_active");
  }


  _setIsLiked() {
    if (this.isLiked(this._data.likes)) {
      this._likeButton.classList.add("elements__like-button_active");
      this._likeButton.classList.add("heartbeat");
    }
  }

  //* Удаление карточки
  _deleteButtonClick() {
    const data = {
      card: this._element,
      cardId: this._cardId,
    };
    this._deleteCard(data);
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }
}
