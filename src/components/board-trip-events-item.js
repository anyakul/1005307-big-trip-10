import {createElement} from '../utils';

const createBoardEventsItemTemplate = () => {
  return `<li class="trip-events__item"></li>`;
};

export default class BoardEventsItemComponent {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createBoardEventsItemTemplate();
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
