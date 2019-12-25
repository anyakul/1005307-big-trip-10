// Маршрут поездки
import {showDate} from '../utils/date';
import AbstractComponent from './abstract-component';

const createTripInfoTemplate = (card) => {
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

class TripInfoComponent extends AbstractComponent {
  constructor(card) {
    super();

    this._card = card;
  }

  getTemplate() {
    return createTripInfoTemplate(this._card);
  }
}

export default TripInfoComponent;
