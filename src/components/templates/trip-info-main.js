// Маршрут поездки
import {formatMonthDay} from './date';

const getDates = (events) => {
  let template = null;
  if (events.length === 0) {
    template = ` `;
  }
  if (events.length > 1) {
    template = (
      `${formatMonthDay(events[1].startDate)}
      &nbsp;&mdash;&nbsp;
      ${formatMonthDay(events[events.length - 1].endDate)}`
    );
  }
  if (events.length === 1) {
    template = (`${formatMonthDay(events[0].startDate)}`);
  }
  return template;
};

const getRoute = (events) => {
  const cities = new Set();
  events.map((point) => cities.add(point.destination.name));
  const startPoint = events[0];
  const finalPoint = events[events.length - 1];
  let route = null;
  if (events.length > 3) {
    route = `${startPoint.destination.name} &mdash; ... &mdash; ${finalPoint.destination.name}`;
  } else if (events.length === 3) {
    route = `${startPoint.destination.name} &mdash; ${events[1].destination.name} &mdash; ${finalPoint.destination.name}`;
  } else if (events.size === 2) {
    route = `${startPoint.destination.name} &mdash; ${finalPoint.destination.name}`;
  } else {
    route = `${startPoint.destination.name} &mdash; ${startPoint.destination.name}`;
  }
  return route;
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
