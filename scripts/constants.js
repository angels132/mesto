export const escKeyCode = 27;

export const cardTemplate = document.querySelector(".cardTemplate");

export const profileName = document.querySelector(".profile__name");
export const profileJob = document.querySelector(".profile__job");

export const editPopup = document.getElementById("editProfile");

export const profileEditButton = document.querySelector(
  ".profile__edit-button"
);

export const profileSaveButton = editPopup.querySelector(".popup__button");

export const profileEditForm = document.forms.profile;

export const nameInput = profileEditForm.elements.name;
export const jobInput = profileEditForm.elements.job;

export const nameInputError = profileEditForm.querySelector(
  "#popup__name-input-error"
);
export const jobInputError = profileEditForm.querySelector(
  "#popup__job-input-error"
);
export const editOverlay = editPopup.querySelector(".popup__overlay");

export const addPopup = document.getElementById("addCard");

export const cardAddButton = document.querySelector(".profile__add-button");

export const popupAddForm = document.forms.newPlace;

export const cardSaveButton = addPopup.querySelector(".popup__button");

export const placeName = popupAddForm.elements.placeName;
export const placeLink = popupAddForm.elements.placeLink;

export const placeNameInputError = popupAddForm.querySelector(
  "#popup__placeName-input-error"
);
export const placeLinkInputError = popupAddForm.querySelector(
  "#popup__placeLink-input-error"
);
export const addOverlay = addPopup.querySelector(".popup__overlay");

//Просмотр фото
//Попап просмотра
export const openPicturePopup = document.getElementById("openPicture");
//выбираем картинку и ее подпись
export const popupPicture = document.querySelector(".popup__image");
export const popupDescription = document.querySelector(
  ".popup__image-subtitle"
);
export const fullScreenOverlay =
  openPicturePopup.querySelector(".popup__overlay");

//контейнер для вставки карточек
export const cardsContainer = document.querySelector(".elements__list");
