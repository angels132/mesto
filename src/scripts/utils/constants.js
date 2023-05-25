//* Импорт изображений для Webpack
import morning from '../../images/cards/camping.jpg';
import house from '../../images/cards/house.jpg';
import syracuse from '../../images/cards/syracuse.jpg';
import canyon from '../../images/cards/united-states.jpg';
import mountainsFog from '../../images/cards/mountains.jpg';
import iceland from '../../images/cards/iceland.jpg';
import zion from '../../images/cards/zion-national-park.jpg';
import grandCanyon from '../../images/cards/grandc.jpg';
import moab from '../../images/cards/moab.jpg';


//* Изначальные карточки
export const сards = [
  {
    name: "Morning in a tent",
    link: morning,
  },
  {
    name: "Lonely house",
    link: house,
  },
  {
    name: "Syracuse road, United States",
    link: syracuse,
  },
  {
    name: "Canyon, United States",
    link: canyon,
  },
  {
    name: "Mountains fog",
    link: mountainsFog,
  },
  {
    name: "Iceland",
    link: iceland,
  },
  {
    name: "Zion National Park, United States",
    link: zion,
  },
  {
    name: "Grand Canyon National Park, United States",
    link: grandCanyon,
  },
  {
    name: "Moab, United States",
    link: moab,
  },
];

//* Разворачиваем массив с карточками для отображения по порядку через prepend
export const initialCards = сards.reverse();

//* Данные для валидации форм
export const enableValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inputErrorClass: "popup__input_type_error",
  inputError: ".popup__input-error",
  errorClass: "popup__input-error_visible",
};

//* Основные константы
export const profileName = document.querySelector(".profile__name");
export const profileJob = document.querySelector(".profile__job");

export const profileEditButton = document.querySelector(
  ".profile__edit-button"
);
export const editProfilePopup = document.querySelector("#editProfile");
export const editProfilePopupForm = editProfilePopup.querySelector(
  ".popup__form"
);
export const editProfileNameInput = editProfilePopupForm.querySelector(
  "#popup__name-input"
);
export const editProfileJobInput = editProfilePopupForm.querySelector(
  "#popup__job-input"
);

export const profileAddButton = document.querySelector(".profile__add-button");
export const addCardPopup = document.querySelector("#addCard");

export const openPicturePopup = document.querySelector("#openPicture");

export const elementsList = document.querySelector(".elements__list");
