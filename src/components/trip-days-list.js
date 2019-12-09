import {createElement} from '../utils';

// Список дней
const createTripDaysTemplate = () => {
  return (`<ul class="trip-days"></ul>`);
};

export default class TripDaysListComponent {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripDaysTemplate();
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
