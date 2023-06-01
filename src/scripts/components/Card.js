//* Класс карточки
export class Card {
  constructor(
    data,
    cardTemplate,
    userId,
    imagePopup,
    deleteCard,
    addCardLike,
    deleteCardLike
  ) {
    this._data = data; //* полные данные о карточке
    this._cardTemplate = cardTemplate; //* класс шаблона разметки
    this._userId = userId; //* id профиля
    this._cardId = data._id; //* id карточки
    this._cardOwnerId = data.owner._id; //* id владельца карточки
    this._imagePopup = imagePopup; //* функция открытия попапа с фото
    this._element = this._getTemplate(); //* разметка карточки
    this._likeButton = this._element.querySelector(".elements__like-button");
    this._deleteButton = this._element.querySelector(
      ".elements__delete-button"
    );
    this._likeCounter = this._element.querySelector(".elements__like-counter");
    this._deleteCard = deleteCard;
    this._addCardLike = addCardLike;
    this._deleteCardLike = deleteCardLike;
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
    this._setEventListeners();
    const cardImage = this._element.querySelector(".elements__picture");
    cardImage.alt = `${this._data.name}`;
    cardImage.src = this._data.link;
    this._element.querySelector(
      ".elements__text"
    ).textContent = this._data.name;
    this._element.querySelector(
      ".elements__like-counter"
    ).textContent = this._data.likes.length;
    this._setIsLiked();
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

    this._likeButton.addEventListener("click", () => this._likeToggler());

    this._element
      .querySelector(".elements__picture")
      .addEventListener("click", this._imagePopup);
  }

  //* Переключение состояния лайка
  _likeToggler() {
    if (!this._likeButton.classList.contains("elements__like-button_active")) {
      this._addCardLike(this._cardId)
        .then((res) => {
          this._data = res;
          this._likeCounter.textContent = res.likes.length;
          this._likeButton.classList.add("heartbeat");
          this._likeButton.classList.add("elements__like-button_active");
        })
        .catch((err) => console.log(err));
    } else {
      this._deleteCardLike(this._cardId)
        .then((res) => {
          this._data = res;
          this._likeCounter.textContent = res.likes.length;
          this._likeButton.classList.remove("heartbeat");
          this._likeButton.classList.remove("elements__like-button_active");
        })
        .catch((err) => console.log(err));
    }
  }

  _setIsLiked() {
    //* Условие будет true если в массиве лайков найдется лайк с id пользователя
    if (this._data.likes.some(elem => elem._id === this._userId)) {
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
}
