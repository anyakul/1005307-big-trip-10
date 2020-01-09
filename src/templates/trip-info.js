import {makeTemplateGenerator} from './generator';
import {formatMonthDay} from './date';

const getDateTitle = (eventList) => {
  return (
    (eventList.length > 1) ?
      (`${formatMonthDay(eventList[1].dateFrom)}
        &nbsp;&mdash;&nbsp;
        ${formatMonthDay(eventList[eventList.length - 1].dateTo)}`) :
      (`${formatMonthDay(eventList[0].dateFrom)}`)
  );
};

const getDestinationName = (eventList) => {
  const {destination} = eventList;
  return (eventList !== eventList[eventList.length - 1]) ? `${destination.name} &mdash; ` : `${destination.name}`;
};

const getDestinationNameFirstAndLast = (eventList) => {
  return (
    [eventList[0].destination.name
    + ` ` + `&mdash; ... &mdash;` + ` ` +
    eventList[eventList.length - 1].destination.name]
  );
};

const getDestinationNames = makeTemplateGenerator(getDestinationName);

const getRoute = (eventList) => {
  return (
    (eventList.length > 3) ?
      getDestinationNameFirstAndLast(eventList) :
      getDestinationNames(eventList)
  );
};

const createTripInfoTemplate = (eventList) => {
  const route = getRoute(eventList);
  const dates = getDateTitle(eventList);

  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${route}</h1>
        <p class="trip-info__dates">${dates}</p>
     </div>`
  );
};

export {createTripInfoTemplate};
