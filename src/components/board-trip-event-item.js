import {createElement} from '../utils';

const createBoardEventItemTemplate = () => {
  return `<li class="trip-events__item"></li>`;
};

export default class BoardEventItemComponent {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createBoardEventItemTemplate();
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
