//* Класс валидации форм
export class FormValidator {
  constructor(popupElements, popupForm) {
    this._form = popupForm;
    this._formSelector = popupElements.formSelector;
    this._inputSelector = popupElements.inputSelector;
    this._submitButtonSelector = popupElements.submitButtonSelector;
    this._inputErrorClass = popupElements.inputErrorClass;
    this._inputError = popupElements.inputError;
    this._errorClass = popupElements.errorClass;
    this._inputs = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._errors = Array.from(this._form.querySelectorAll(this._inputError));
  }

  //* Дизейбл кнопки сабмита
  _disableSubmitButton() {
    this._button.setAttribute("disabled", true);
    this._button.classList.add("popup__button_disabled");
  }

  //* Переключение состояния кнопки
  _toggleSubmit() {
    if (this._hasInvalidInput()) {
      this._disableSubmitButton();
    } else {
      this._button.removeAttribute("disabled", true);
      this._button.classList.remove("popup__button_disabled");
    }
  }

  //* Проверка массива инпутов на валидность
  _hasInvalidInput() {
    return this._inputs.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  //* Проверка элемента формы на валидность
  _isValid(element) {
    this._element = element;
    this._errorElement = this._form.querySelector(`#${this._element.id}-error`);
    !this._element.validity.valid ? this._showError() : this._hideError();
  }

  //* Отображение сообщения об ошибке
  _showError() {
    this._element.classList.add(this._inputErrorClass);
    this._errorElement.classList.add(this._errorClass);
    this._errorElement.textContent = this._element.validationMessage;
  }

  //* Скрытие сообщения об ошибке
  _hideError() {
    this._element.classList.remove(this._inputErrorClass);
    this._errorElement.classList.remove(this._errorClass);
    this._errorElement.textContent = "";
  }

  //* Скрытие ошибок и очистка полей
  hideAllErrors() {
    this._errors.forEach((error) => {
      error.classList.remove(this._errorClass);
      error.textContent = "";
    });
    this._inputs.forEach((input) => {
      input.classList.remove(this._inputErrorClass);
    });
    this._disableSubmitButton();
  }

  //* Установка слушателей
  _setEventListeners() {
    this._button = this._form.querySelector(this._submitButtonSelector);
    //* Деактивация кнопки при открытии попапа
    this._toggleSubmit();
    //* Деактивация кнопки после отправки
    this._inputs.forEach((element) => {
      element.addEventListener("input", () => {
        this._isValid(element);
        this._toggleSubmit();
      });
    });
  }

  //* Валидация форм
  enableValidation() {
    this._setEventListeners();
    this._form.addEventListener(
      "submit",
      (evt) => evt.preventDefault(),
      this._toggleSubmit()
    );
  }
}
