// Список дней
import {createElement} from '../utils';

const createBoardTripDaysTemplate = () => {
  return `<ul class="trip-days"></ul>`;
};

export default class BoardTripDaysListComponent {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createBoardTripDaysTemplate();
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
