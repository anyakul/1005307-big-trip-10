// Шаблон маршрута поездки
import {showDate, createElement} from '../utils';

export const createTripInfoTemplate = (card) => {

  const {dateFromUnix, dateToUnix, destination} = card;
  let dateFrom = showDate(dateFromUnix);
  let dateTo = showDate(dateToUnix);

  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${destination.name} &mdash; ... &mdash; ${destination.name}</h1>
        <p class="trip-info__dates">${dateFrom}&nbsp;&mdash;&nbsp;${dateTo}</p>
     </div>`
  );
};

export default class TripInfoComponent {
  constructor(card) {
    this._card = card;
    this._element = null;
  }

  getTemplate() {
    return createTripInfoTemplate(this._card);
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
