// Маршрут поездки
import {formatMonthDay} from './date';
import {generateEventsWithUniqueDestinationNames} from '../events';

const getDates = (events) => {
  return (
    (events.length > 1) ?
      (`${formatMonthDay(events[1].dateFrom)}
        &nbsp;&mdash;&nbsp;
        ${formatMonthDay(events[events.length - 1].dateTo)}`) :
      (`${formatMonthDay(events[0].dateFrom)}`)
  );
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
  const eventsWithUniqueDestinationNames = generateEventsWithUniqueDestinationNames(events);
  return (
    (eventsWithUniqueDestinationNames.length > 3) ?
      getDestinationNameFirstAndLast(eventsWithUniqueDestinationNames) :
      getDestinationNames(eventsWithUniqueDestinationNames)
  );
};

const createTripInfoTemplate = (events) => {
  const route = getRoute(events);
  const dates = getDates(events);

  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${route}</h1>
        <p class="trip-info__dates">${dates}</p>
     </div>`
  );
};

export {createTripInfoTemplate};
