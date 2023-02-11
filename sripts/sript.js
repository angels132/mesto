const popup = document.querySelector('.popup');
const popupForm = document.querySelector('.popup__container');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = popup.querySelector('.popup__close-button');
const popupSaveButton = popup.querySelector('.popup__save-button');          
const nameInput = popupForm.querySelector('.popup__name[name="name"]');
const jobInput = popupForm.querySelector('.popup__job[name="job"]');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const popupToggle = function () {
  nameInput.value = profileName.textContent
  jobInput.value = profileJob.textContent
  popup.classList.toggle('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();                                                      

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  popupToggle();
}

popupForm.addEventListener('submit', formSubmitHandler);
popupOpenButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);
