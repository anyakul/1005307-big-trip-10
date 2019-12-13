// Список событий дня
import {createElement} from '../utils';

const createBoardEventsListTemplate = () => {
  return `<ul class="trip-events__list"></ul>`;
};

export default class BoardEventsListComponent {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createBoardEventsListTemplate();
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

