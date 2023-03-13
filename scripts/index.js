// Решил перезаписать весь код, затронул даже HTML+CSS, ибо застрял в своей же голове/логике) Надеюсь я ничего не поломал и все сделал)
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

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

const popupEdit = document.querySelector('.popup_edit');
const popupEditForm = popupEdit.querySelector('[name="profileData"]');
const inputName = popupEdit.querySelector('[name="profileName"]');
const inputJob = popupEdit.querySelector('[name="profileJob"]');
const closePopupEditButton = popupEdit.querySelector('.popup__close-button');

const popupAdd = document.querySelector('.popup_add');
const popupAddForm = popupAdd.querySelector('[name="placeData"]');
const inputPlaceName = popupAdd.querySelector('[name="placeName"]');
const inputPlaceLink = popupAdd.querySelector('[name="placeLink"]');
const closePopuppAddButton = popupAdd.querySelector('.popup__close-button');

const cardsElement = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('#card-template').content;

const popupPhotos = document.querySelector('.popup_photos');
const closePopupPhotos = popupPhotos.querySelector('.popup__close-button');
const popupPhotosImage = document.querySelector('.popup__image');

const popupDescription = document.querySelector('.popup__description');



function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}

function openPopupEdit() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  openPopup(popupEdit);
}

function handleSubmitProfile(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupEdit);
}

function createCard(item) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardsElementImage = cardElement.querySelector('.element__image');

  cardsElementImage.src = item.link;
  cardsElementImage.alt = item.name;
  cardElement.querySelector('.element__caption').textContent = item.name;

  cardsElementImage.addEventListener('click', openPopupPhotos);
  cardElement.querySelector('.element__like-button').addEventListener('click', handleLikeButtonClick);
  cardElement.querySelector('.element__delete-button').addEventListener('click', handleRemoveButtonClick);

  return cardElement;
}

function handleSubmitCard(evt) {
  evt.preventDefault();
  const cardElement = createCard({
    name: inputPlaceName.value,
    link: inputPlaceLink.value
  });
  cardsElement.prepend(cardElement);
  popupAddForm.reset();
  closePopup(popupAdd);
}

function openPopupPhotos(evt) {
  popupPhotosImage.src = evt.target.src;
  popupPhotosImage.alt = evt.target.alt;
  popupDescription.textContent = evt.target.alt;
  openPopup(popupPhotos);
}

initialCards.forEach(item => {
  cardsElement.append(createCard(item));
});


function handleLikeButtonClick(evt) {
  evt.target.classList.toggle('element__like-button_active');
}

function handleRemoveButtonClick(evt) {
  evt.target.closest('.element').remove();
}


profileEditButton.addEventListener('click', openPopupEdit);
closePopupEditButton.addEventListener('click', () => closePopup(popupEdit));
popupEditForm.addEventListener('submit', handleSubmitProfile);

addCardButton.addEventListener('click', () => openPopup(popupAdd));
closePopuppAddButton.addEventListener('click', () => closePopup(popupAdd));
popupAddForm.addEventListener('submit', handleSubmitCard);

closePopupPhotos.addEventListener('click', () => closePopup(popupPhotos));
