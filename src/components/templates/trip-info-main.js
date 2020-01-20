// Маршрут поездки
import {formatMonthDay} from './date';
import {generateEventsWithUniqueDestinationNames} from '../events';

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

const getDestinationNameFirstAndLast = (events) => {
  return (
    [events[0].destination.name
    + ` &mdash; ... &mdash; ` +
    events[events.length - 1].destination.name]
  );
};

const destinationName = ({destination}) => `${destination.name}`;
const getDestinationNames = (events) => Object.values(events).map(destinationName).join(` &mdash; `);

const getRoute = (events) => {
  let route = null;
  const eventsWithUniqueDestinationNames = generateEventsWithUniqueDestinationNames(events);
  if (eventsWithUniqueDestinationNames.length > 3) {
    route = getDestinationNameFirstAndLast(eventsWithUniqueDestinationNames);
  }
  if (eventsWithUniqueDestinationNames.length > 0) {
    route = getDestinationNames(eventsWithUniqueDestinationNames);
  }
  if (eventsWithUniqueDestinationNames.length === 0) {
    route = ` `;
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
