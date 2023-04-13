//массив с карточками
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
//Попап редактирования
const editPopup = document.getElementById('editProfile');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileSaveButton = editPopup.querySelector('.popup__button');
const profileEditForm = document.forms.profile;
const nameInput = profileEditForm.elements.name;
const jobInput = profileEditForm.elements.job;
const nameInputError = profileEditForm.querySelector('#popup__name-input-error');
const jobInputError = profileEditForm.querySelector('#popup__job-input-error');
const editOverlay = editPopup.querySelector('.popup__overlay');

//Добавление
//Попап добавления
const addPopup = document.getElementById('addCard');
//кнопка добавления карточки
const cardAddButton = document.querySelector('.profile__add-button');
//форма добавления карточки
const popupAddForm = document.forms.newPlace;
//кнопка сохранения карточки
const cardSaveButton = addPopup.querySelector('.popup__button');
const placeName = popupAddForm.elements.placeName;
const placeLink = popupAddForm.elements.placeLink;
const placeNameInputError = popupAddForm.querySelector('#popup__placeName-input-error');
const placeLinkInputError = popupAddForm.querySelector('#popup__placeLink-input-error');
const addOverlay = addPopup.querySelector('.popup__overlay');

//Просмотр фото
//Попап просмотра
const openPicturePopup = document.getElementById('openPicture');
const popupPicture = document.querySelector('.popup__image');
const popupDescription = document.querySelector('.popup__image-subtitle');
const fullScreenOverlay = openPicturePopup.querySelector('.popup__overlay');
const cardsContainer = document.querySelector('.elements__list');

function openPopup(popup) {
  popup.classList.add('popup_opened');
  closeOnEsc(popup);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  window.onkeydown = null;
}

function resetEditPopupFields() {
  nameInput.classList.remove('popup__input_type_error');
  jobInput.classList.remove('popup__input_type_error');
  nameInputError.classList.remove('popup__error_visible');
  nameInputError.textContent = '';
  jobInputError.classList.remove('popup__error_visible');
  jobInputError.textContent = '';
}

function resetAddPopupFields() {
  placeName.classList.remove('popup__input_type_error');
  placeLink.classList.remove('popup__input_type_error');
  placeNameInputError.classList.remove('popup__error_visible');
  placeNameInputError.textContent = '';
  placeLinkInputError.classList.remove('popup__error_visible');
  placeLinkInputError.textContent = '';
}

function closeOnEsc() {
    window.onkeydown = event => {
    if ( event.keyCode == 27 ) {
      closePopup(addPopup);
      closePopup(editPopup)
      closePopup(openPicturePopup);
      resetEditPopupFields(editPopup);
      resetAddPopupFields(cardAddCloseButton);
      popupAddForm.reset();
    }
  };
}

const addCardToContainer = (cardElement)  => {
  const cardsElement = cardTemplate.content.cloneNode(true);
  cardsElement.querySelector('.elements__text').textContent = cardElement.name;
  cardsElement.querySelector('.elements__picture').src = cardElement.link;
  cardsElement.querySelector('.elements__picture').alt = cardElement.name;
  cardsElement.querySelector('.elements__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__like-button_active');
    evt.target.classList.toggle('heartbeat');
  });

  cardsElement.querySelector('.elements__delete-button').addEventListener('click', event => {
    const cardItem = event.target.closest('.elements__list-item');
    cardItem.remove();
  });

  cardsElement.querySelector('.elements__picture').addEventListener('click', event => {
    const cardLink = event.target.src;
    const cardName = event.target.closest('.elements__list-item');
    const cardText = cardName.querySelector('.elements__text').textContent;

    openPopup(openPicturePopup);
    popupPicture.src = cardLink;
    popupDescription.textContent = cardText;
  });

  cardsContainer.prepend(cardsElement);
};

const reversCards = initialCards.reverse();
reversCards.forEach(addCardToContainer);

const popupEditCloseButton = editPopup.querySelector('.popup__close-button');
popupEditCloseButton.addEventListener('click', event => {
  const clickClose = event.target.closest('.popup');
  closePopup(clickClose);
  resetEditPopupFields(popupEditCloseButton);
});

const cardAddCloseButton = addPopup.querySelector('.popup__close-button');
cardAddCloseButton.addEventListener('click', event => {
  const clickClose = event.target.closest('.popup');
  closePopup(clickClose);
  popupAddForm.reset();
  resetAddPopupFields(cardAddCloseButton);
});

// закрытие попапа с фото
const photoCloseButton = openPicturePopup.querySelector('.popup__close-button');
photoCloseButton.addEventListener('click', event => {
  const clickClose = event.target.closest('.popup');
  closePopup(clickClose);
});

//слушатель на кнопке редактирования профиля
profileEditButton.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent; 
  openPopup(editPopup);
});

//слушатель на кнопке добавления карточки
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
  
//добавление карточки
cardSaveButton.addEventListener('click', event => {
//отмена поведения
  event.preventDefault();
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

editOverlay.addEventListener('click', function () {
  closePopup(editPopup);
  resetEditPopupFields();
})

addOverlay.addEventListener('click', function () {
  closePopup(addPopup);
  resetAddPopupFields();
  popupAddForm.reset();
})

fullScreenOverlay.addEventListener('click', function () {
  closePopup(openPicturePopup);
})