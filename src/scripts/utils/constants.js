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
export const profileAvatar = document.querySelector(".profile__avatar");

export const profileEditButton = document.querySelector(
  ".profile__edit-button"
);
export const profileAvatarEditButton = document.querySelector(
  ".profile__avatar-edit-button"
);
export const avatarEditPopup = document.querySelector("#update");
export const cardDeletePopup = document.querySelector("#confirm");
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

export const spinner = document.querySelector(".spinner");
