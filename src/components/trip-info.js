// Маршрут поездки
import AbstractComponent from './abstract-component';
import {castMonthDayFormat} from '../utils/date';

const createTripInfoTemplate = ({dateFrom, dateTo, destination}) => {
  const castMonthDay = castMonthDayFormat(dateTo);

  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${destination.name} &mdash; ... &mdash; ${destination.name}</h1>
        <p class="trip-info__dates">${castMonthDayFormat(dateFrom)}&nbsp;&mdash;&nbsp;${castMonthDay}</p>
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
