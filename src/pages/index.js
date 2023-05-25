import "./index.css";

import { FormValidator } from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import { Card } from "../scripts/components/Card.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import {
  initialCards as items,
  editProfilePopup,
  profileEditButton,
  profileJob,
  addCardPopup,
  profileName,
  elementsList,
  openPicturePopup,
  editProfileNameInput,
  editProfileJobInput,
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
  const popupWithImage = new PopupWithImage(openPicturePopup);
  popupWithImage.setEventListeners();

  //* Создание карточки
  const createCard = (data) => {
    const card = new Card(data, ".cardTemplate", openImagePopup);
    const cardElement = card.createCardElement(data);
    return cardElement;
  };

  //* Генерация карточек
  const section = new Section(
    {
      renderItems: (data) => {
        section.addItem(createCard(data));
      },
    },
    elementsList
  );
  section.renderItems(items);

  //* Попап редактирования профиля
  const userInfo = new UserInfo({ profileName, profileJob });

  const editPopup = new PopupWithForm(editProfilePopup, {
    formSubmitCallBack: (data) => {
      userInfo.setUserInfo(data);
      editPopup.close();
    },
  });
  editPopup.setEventListeners();

  //* Попап добавления карточки
  const addNewCardPopup = new PopupWithForm(addCardPopup, {
    formSubmitCallBack: (data) => {
      const item = {
        name: data.placeName,
        link: data.placeLink,
      };
      section.addItem(createCard(item), true);
      addNewCardPopup.close();
    },
  });
  addNewCardPopup.setEventListeners();

  //* Создание классов валидации
  const editPopupValidation = new FormValidator(
      enableValidation,
      editProfilePopup
    ),
    addPopupValidation = new FormValidator(enableValidation, addCardPopup);

  //* Активация валидации
  editPopupValidation.enableValidation();
  addPopupValidation.enableValidation();

  //* Установка слушателей
  profileEditButton.addEventListener("click", () => {
    const data = userInfo.getUserInfo();
    editProfileNameInput.value = data.name;
    editProfileJobInput.value = data.job;
    editPopupValidation.hideAllErrors();
    editPopup.open();
    profileEditButton.blur();
  });
  profileAddButton.addEventListener("click", () => {
    addNewCardPopup.open();
    profileAddButton.blur();
    addPopupValidation.hideAllErrors();
  });
});
