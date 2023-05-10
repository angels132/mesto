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


  function createCard(cardData) {
    const card = new Card(cardData, ".cardTemplate");
    return card.generateCard();
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
     
     const cardElement = createCard(newCard);
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
  
//открытие попапа 
export function openPopup(popup) { 
  popup.classList.add("popup_opened"); 
  document.addEventListener("keydown", handleEscPress); 
}

//закрытие попапа 
function closePopup(popup) { 
  popup.classList.remove("popup_opened"); 
  document.removeEventListener("keydown", handleEscPress); 
}

//закрытие попапа по клавише Esc 
function handleEscPress(evt) { 
  if (evt.key === "Esc" || evt.key === "Escape") { 
    const openedPopup = document.querySelector(".popup_opened"); 
    closePopup(openedPopup); 
  } 
}

//заполнение начальных карточек 
initialCards.forEach((cardData) => { 
  const cardElement = createCard(cardData); 
  constants.cardsContainer.append(cardElement); 
});
