import "./index.css";

import { FormValidator } from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import { Card } from "../scripts/components/Card.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupConfirm from "../scripts/components/PopoupConfirm";
import Api from "../scripts/components/Api.js";
import { addSpinner, removeSpinner } from "../scripts/utils/utils.js";
import {
  editProfilePopup,
  avatarEditPopup,
  profileEditButton,
  profileAvatarEditButton,
  addCardPopup,
  cardDeletePopup,
  profileJob,
  profileName,
  profileAvatar,
  elementsList,
  openPicturePopup,
  editProfileNameInput,
  editProfileJobInput,
  enableValidation,
  profileAddButton,
} from "../scripts/utils/constants.js";

const api = new Api({
  serverUrl: "https://mesto.nomoreparties.co/v1/cohort-66/",
  token: "43bc2f0f-65e6-40f5-a20b-329dc405ffe8",
});

//* Переменные для id пользователя и лайков
let userId;

const initialData = [api.getUserInfo(), api.getInitialCards()];

//* Попап с фото
const popupWithImage = new PopupWithImage(openPicturePopup);
popupWithImage.setEventListeners();



const deleteCard = (data) => {
  deleteCardPopup.data = data;
  deleteCardPopup.open();
};

//* Создание карточки
const createCard = (data) => {
  const card = new Card(
    data,
    ".cardTemplate",
    userId,
    () => popupWithImage.open(card._data),
    () => deleteCardPopup.open(card),
    (likes) => {
      if (!card.isLiked(likes)) {

        api.addCardLike(card._cardId)
          .then((res) => {
            card.likeToggler(res)
          })
          .catch((err) => console.log(err));
      } else {
        api.deleteCardLike(card._cardId)
          .then((res) => {
            card.likeToggler(res);
          })
          .catch((err) => console.log(err));
      }
    });
  const cardElement = card.createCardElement(data);
  return cardElement;
};

//* Попап удаления карточки
const deleteCardPopup = new PopupConfirm(cardDeletePopup, {
  formSubmitCallBack: (data) => {
    api
      .deleteCard(data._cardId)
      .then(() => {
        deleteCardPopup.close();
        data.deleteCard();
      })
      .catch((err) => console.log(err));
  },
});
deleteCardPopup.setEventListeners();

//* Генерация карточек
const section = new Section(
  {
    renderItems: (data) => {
      section.addItem(createCard(data));
    },
  },
  elementsList
);

//* Попап редактирования профиля
const userInfo = new UserInfo({ profileName, profileJob, profileAvatar });

const editPopup = new PopupWithForm(editProfilePopup, {
  formSubmitCallBack: (data, button) => {
    addSpinner(button);
    api
      .editProfile(data)
      .then((res) => {
        userInfo.setUserInfo(res);
        editPopup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        removeSpinner(button);
      });
  },
});
editPopup.setEventListeners();

//* Попап редактирования аватарки
const avatarEdit = new PopupWithForm(avatarEditPopup, {
  formSubmitCallBack: (data, button) => {
    addSpinner(button);
    api
      .editAvatar(data)
      .then((res) => {
        userInfo.setUserAvatar(res);
        avatarEdit.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        removeSpinner(button);
      });
  },
});
avatarEdit.setEventListeners();

//* Попап добавления карточки
const cardAddNewPopup = new PopupWithForm(addCardPopup, {
  formSubmitCallBack: (data, button) => {
    addSpinner(button);
    const item = {
      name: data.placeName,
      link: data.placeLink,
    };
    api
      .addNewCard(item)
      .then((res) => {
        section.addItem(createCard(res), true);
        cardAddNewPopup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        removeSpinner(button);
      });
  },
});
cardAddNewPopup.setEventListeners();

//* Создание классов валидации
const editPopupValidation = new FormValidator(
  enableValidation,
  editProfilePopup
);

const addPopupValidation = new FormValidator(
  enableValidation,
  addCardPopup
);

const avatarEditPopopValidation = new FormValidator(
  enableValidation,
  avatarEditPopup
);

//* Активация валидации
editPopupValidation.enableValidation();
addPopupValidation.enableValidation();
avatarEditPopopValidation.enableValidation();

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
  cardAddNewPopup.open();
  profileAddButton.blur();
  addPopupValidation.hideAllErrors();
});
profileAvatarEditButton.addEventListener("click", () => {
  avatarEdit.open();
  profileAvatarEditButton.blur();
  avatarEditPopopValidation.hideAllErrors();
});

//* Запрос данных сервера для превой отрисовки страницы
Promise.all(initialData)
  .then(([userData, cards]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
    section.renderItems(cards.reverse());
  })
  .catch((err) => console.log(err));
