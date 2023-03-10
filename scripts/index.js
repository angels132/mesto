'use strict';
//Карточки
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//Шаблон карточки
const cardTemplate = document.querySelector('.cardTemplate');

//Поля профиля для вставки значений из формы
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

//Редактирование
const editPopup = document.getElementById('editProfile');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileSaveButton = editPopup.querySelector('.popup__save-button');
const profileEditForm = document.forms.profile;
//инпуты в форме редактирования
const nameInput = profileEditForm.elements.name;
const jobInput = profileEditForm.elements.job;
//Добавление
const addPopup = document.getElementById('addCard');
const cardAddButton = document.querySelector('.profile__add-button');
const popupAddForm = document.forms.newPlace;
const cardSaveButton = addPopup.querySelector('.popup__save-button');
const placeName = popupAddForm.elements.placeName;
const placeLink = popupAddForm.elements.placeLink;

//Просмотр фото
const openPicturePopup = document.getElementById('openPicture');
const popupPicture = document.querySelector('.popup__image');
const popupDescription = document.querySelector('.popup__image-subtitle');

//Вставки карточек
const cardsContainer = document.querySelector('.elements__list');

//открытия / закрытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  closeOnEsc(popup);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  window.onkeydown = null;
}

function closeOnEsc() {
  window.onkeydown = event => {
  if ( event.keyCode == 27 ) {
    closePopup(addPopup);
    closePopup(editPopup)
    closePopup(openPicturePopup);
    popupAddForm.reset();
  }
};
}

//добавление карточек
const addCardToContainer = (cardElement) => {
  const cardsElement = cardTemplate.content.cloneNode(true);
  cardsElement.querySelector('.elements__text').textContent = cardElement.name;
  cardsElement.querySelector('.elements__picture').src = cardElement.link;
  cardsElement.querySelector('.elements__picture').alt = cardElement.name;
  cardsElement.querySelector('.elements__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__like-button_active');
    evt.target.classList.toggle('heartbeat');
  });

  //удаления карточки кнопка
  cardsElement.querySelector('.elements__delete-button').addEventListener('click', event => {
    const cardItem = event.target.closest('.elements__list-item');
    cardItem.remove();
  });

  cardsElement.querySelector('.elements__picture').addEventListener('click', event => {
    const cardLink = event.target.src;
    const cardName = event.target.closest('.elements__list-item');
    const cardText = cardName.querySelector('.elements__text').textContent;
    
    // открытие попапа с фото
    openPopup(openPicturePopup);
    popupPicture.src = cardLink;
    popupDescription.textContent = cardText;
  });
  cardsContainer.prepend(cardsElement);
};

const reversCards = initialCards.reverse();
reversCards.forEach(addCardToContainer);

// закрытие попапа редактирования
const popupEditCloseButton = editPopup.querySelector('.popup__close-button');
popupEditCloseButton.addEventListener('click', event => {
  closePopup(clickClose);
});


// закрытие попапа добавления
const cardAddCloseButton = addPopup.querySelector('.popup__close-button');
cardAddCloseButton.addEventListener('click', event => {
  const clickClose = event.target.closest('.popup');
  closePopup(clickClose);
});

// закрытие попапа с фото
const photoCloseButton = openPicturePopup.querySelector('.popup__close-button');
photoCloseButton.addEventListener('click', event => {
  const clickClose = event.target.closest('.popup');
  closePopup(clickClose);
});

profileEditButton.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(editPopup);
});

cardAddButton.addEventListener('click', function () {
  openPopup(addPopup);
});

//сохранение профиля
profileSaveButton.addEventListener('click', event => {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupAddForm.reset();
  const clickClose = event.target.closest('.popup');
  closePopup(clickClose);
});

cardSaveButton.addEventListener('click', event => {
  event.preventDefault();
  //создание объекта из введенных данных
  const newCard =
  {
    name: placeName.value,
    link: placeLink.value
  };
  addCardToContainer(newCard);
  popupAddForm.reset();
  const clickClose = event.target.closest('.popup');
  closePopup(clickClose);
});
