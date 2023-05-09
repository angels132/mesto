// Импорты
import { Card } from "./Card.js";
import * as constants from "./constants.js";
import { initialCards } from "./initialCards.js";
import { FormValidator, enableValidation } from "./FormValidator.js"

// Создание классов и активация валидации
const editPopupValidation = new FormValidator(
  enableValidation,
  constants.editPopup
);

const addPopupValidation = new FormValidator(
  enableValidation,
  constants.addPopup
  );
  
  editPopupValidation.enableValidation();
  addPopupValidation.enableValidation();

// Открытие попапа
export function openPopup(popup) {
  popup.classList.add("popup_opened");
  closeOnEsc(popup);
}

// Закрытие попапа
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.onkeyup = null;
}

// Закрытие на ESC
function closeOnEsc() {
  document.onkeyup = (event) => {
    if (event.keyCode === constants.escKeyCode) {
      // Активный попап
      const activePopup = document.querySelector(".popup_opened");
      closePopup(activePopup);
      constants.popupAddForm.reset();
    }
  };
}

// закрытие попапа редактирования
const popupEditCloseButton = constants.editPopup.querySelector(
  ".popup__close-button"
  );
  popupEditCloseButton.addEventListener("click", (event) => {
    const clickClose = event.target.closest(".popup");
    closePopup(clickClose);
  });
  
  // закрытие попапа добавления
  const cardAddCloseButton = constants.addPopup.querySelector(
    ".popup__close-button"
    );
    cardAddCloseButton.addEventListener("click", (event) => {
      const clickClose = event.target.closest(".popup");
      closePopup(clickClose);
      constants.popupAddForm.reset();
    });
    
    // закрытие попапа с фото
    const photoCloseButton = constants.openPicturePopup.querySelector(
      ".popup__close-button"
      );
      photoCloseButton.addEventListener("click", (event) => {
        const clickClose = event.target.closest(".popup");
        closePopup(clickClose);
      });
      
      //сохранение профиля
      constants.profileSaveButton.addEventListener("click", (event) => {
        //отмена поведения
        event.preventDefault();
        //заполнение полей из введенных данных
        constants.profileName.textContent = constants.nameInput.value;
        constants.profileJob.textContent = constants.jobInput.value;
        //сброс полей формы
        constants.popupAddForm.reset();
        //закрытие попапа
        const clickClose = event.target.closest(".popup");
        closePopup(clickClose);
      });
      
      //добавление карточки
      constants.cardSaveButton.addEventListener("click", (event) => {
        //отмена поведения
        event.preventDefault();
        //создание объекта из введенных данных
        const newCard = {
          name: constants.placeName.value,
          link: constants.placeLink.value,
    };
    
    const addCard = new Card(newCard, ".cardTemplate");
    const cardElement = addCard.generateCard();
    constants.cardsContainer.prepend(cardElement);
    
    //сброс полей формы
    constants.popupAddForm.reset();
    //закрытие попапа
    const clickClose = event.target.closest(".popup");
    closePopup(clickClose);
  });
  
  //слушатель на кнопке редактирования профиля
  constants.profileEditButton.addEventListener("click", function () {
    constants.nameInput.value = constants.profileName.textContent;
    constants.jobInput.value = constants.profileJob.textContent;
    openPopup(constants.editPopup);
    editPopupValidation.hideAllErrors();
  });
  
  //слушатель на кнопке добавления карточки
  constants.cardAddButton.addEventListener("click", function () {
    openPopup(constants.addPopup);
    addPopupValidation.hideAllErrors();
  });
  
  //слушатель на оверлее попапа редактирования
  constants.editOverlay.addEventListener("click", function () {
    closePopup(constants.editPopup);
  });
  
  //слушатель на оверлее попапа добавления
  constants.addOverlay.addEventListener("click", function () {
    closePopup(constants.addPopup);
    constants.popupAddForm.reset();
  });
  
  //слушатель на оверлее попапа с фото
  constants.fullScreenOverlay.addEventListener("click", function () {
    closePopup(constants.openPicturePopup);
  });
  
  initialCards.forEach((item) => {
    const card = new Card(item, ".cardTemplate");
    const cardExample = card.generateCard();
    
    constants.cardsContainer.append(cardExample);
  });
