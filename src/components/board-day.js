// Элемент списка день
import {createElement} from '../utils';

const createBoardDayTemplate = () => {
  return `<li class="trip-days__item day"></li>`;
};

export default class BoardDayComponent {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createBoardDayTemplate();
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

