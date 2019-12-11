import {createElement} from '../utils';

// Список дней
const createDayTemplate = () => {
  return `<li class="trip-days__item day"></li>`;
};

export default class DayComponent {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createDayTemplate();
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

