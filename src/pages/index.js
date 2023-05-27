import "./index.css";

import { FormValidator } from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import { Card } from "../scripts/components/Card.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import {
  initialCards as items,
  popupProfileEdit,
  profileEditButton,
  profileJob,
  popupAddCard,
  profileName,
  elementsList,
  popupOpenPicture,
  profileEditNameInput,
  profileEditJobInput,
  enableValidation,
  profileAddButton,
} from "../scripts/utils/constants.js";

window.addEventListener("DOMContentLoaded", () => {

  //* Открытие попапа с фото
  const openImagePopup = (evt) => {
    const data = {
      image: evt.target.src,
      text: evt.target
        .closest(".elements__list-item")
        .querySelector(".elements__text").textContent,
    };
    popupWithImage.open(data);
  };

  //* Попап с фото
  const popupWithImage = new PopupWithImage(popupOpenPicture);
  popupWithImage.setEventListeners();

  //* Создание карточки
  const createCard = (data) => {
    const card = new Card(data, ".cardTemplate", openImagePopup);
    const cardElement = card.createCardElement(data);
    return cardElement;
  };

  //* Генерация карточек
  const cardsContainer = new Section(
    {
      renderItems: (data) => {
        cardsContainer.addItem(createCard(data));
      },
    },
    elementsList
  );
  cardsContainer.renderItems(items);

  //* Попап редактирования профиля
  const userInfo = new UserInfo({ profileName, profileJob });

  const popupEdit = new PopupWithForm(popupProfileEdit, {
    submitFormCallBack: (data) => {
      userInfo.setUserInfo(data);
      popupEdit.close();
    },
  });
  popupEdit.setEventListeners();

  //* Попап добавления карточки
  const popupAddNewCard = new PopupWithForm(popupAddCard, {
    submitFormCallBack: (data) => {
      const item = {
        name: data.placeName,
        link: data.placeLink,
      };
      cardsContainer.addItem(createCard(item), true);
      popupAddNewCard.close();
    },
  });
  popupAddNewCard.setEventListeners();

  //* Создание классов валидации
  const popupEditValidation = new FormValidator(
      enableValidation,
      popupProfileEdit
    ),
    popupAddValidation = new FormValidator(enableValidation, popupAddCard);

  //* Активация валидации
  popupEditValidation.enableValidation();
  popupAddValidation.enableValidation();

  //* Установка слушателей
  profileEditButton.addEventListener("click", () => {
    const data = userInfo.getUserInfo();
    profileEditNameInput.value = data.name;
    profileEditJobInput.value = data.job;
    popupEditValidation.hideAllErrors();
    popupEdit.open();
    profileEditButton.blur();
  });
  profileAddButton.addEventListener("click", () => {
    popupAddNewCard.open();
    profileAddButton.blur();
    popupAddValidation.hideAllErrors();
  });
});
