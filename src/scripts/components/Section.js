//* Класс размещения карточек на странице
export default class Section {
  constructor({ renderItems }, container) {
    this._renderer = renderItems;
    this._container = container;
  }

  //* Рендер карточек
  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  //* Добавление карточки
  addItem(element) {
    this._container.prepend(element);
  }
}
