// Шаблон маршрута поездки
import {showDate} from '../utils';

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
