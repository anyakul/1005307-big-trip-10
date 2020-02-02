// Маршрут поездки
import {getDate} from '../trip-info-main';

const EventsLength = {
  MORE: 3,
  PAIR: 2,
  ONLY: 1,
  NONE: 0,
};

const getDates = (events) => {
  const firstDate = getDate(events[1].startDate);
  const lastDate = getDate(events[events.length - 1].endDate);
  const onlyDate = getDate(events[0].startDate);
  if (events.length > 0) {
    return (
      `${firstDate.monthDay}
      &nbsp;&mdash;&nbsp;
      ${lastDate.monthDay}`
    );
  }
  if (events.length === 1) {
    return (`${onlyDate.monthDay}`);
  }
  return ` `;
};

const getRoute = (events) => {
  const cities = new Set();
  events.map((point) => cities.add(point.destination.name));
  const startPoint = events[0];
  const finalPoint = events[events.length - 1];
  if (events.length > EventsLength.MORE) {
    return `${startPoint.destination.name} &mdash; ... &mdash; ${finalPoint.destination.name}`;
  }
  if (events.length === EventsLength.MORE) {
    return `${startPoint.destination.name} &mdash; ${events[1].destination.name} &mdash; ${finalPoint.destination.name}`;
  }
  if (events.length === EventsLength.PAIR) {
    return `${startPoint.destination.name} &mdash; ${finalPoint.destination.name}`;
  }
  return `${startPoint.destination.name} &mdash; ${startPoint.destination.name}`;
};

const createTripInfoMainTemplate = (events) => {
  const route = getRoute(events);
  const dates = getDates(events);

  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${route}</h1>
        <p class="trip-info__dates">${dates}</p>
     </div>`
  );
};

export {createTripInfoMainTemplate};
