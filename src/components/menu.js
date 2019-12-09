import {createElement} from '../utils';

// Шаблон меню
const createMenuTemplate = (menu) => {
  const {firstPoint, secondPoint} = menu;
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">${firstPoint}</a>
      <a class="trip-tabs__btn" href="#">${secondPoint}</a>
    </nav>`
  );
};

export default class SiteMenuComponent {
  constructor(menu) {
    this._menu = menu;
    this._element = null;
  }

  getTemplate() {
    return createMenuTemplate(this._menu);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
