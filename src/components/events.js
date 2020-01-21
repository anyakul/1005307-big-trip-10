const TRANSFER_EVENTS = [
  `taxi`,
  `bus`,
  `train`,
  `ship`,
  `transport`,
  `drive`,
  `flight`
];

const ACTIVITY_EVENTS = [
  `check-in`,
  `sightseeing`,
  `restaurant`
];

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
  ADD: `add`,
};

const generateEventsWithUniqueDestinationNames = (events) => {
  const eventsFiltered = events.filter((eventItem, index, self) =>
    index === self.findIndex((t) => (
      t.destination.name === eventItem.destination.name
    ))
  );
  return eventsFiltered;
};

const getEventType = (event) => ACTIVITY_EVENTS.findIndex((it) => it.toLowerCase() === event) !== -1 ? `activity` : `transfer`;

const Preposition = {
  activity: `at`,
  transfer: `to`
};

const OFFERS_TRUNCATE = 3;

const hasSameTitle = (array, it) => array.some((arrayIt) => array.length ? arrayIt.title === it.title : false);

const capitalizeFirstLetter = (str) => {
  return `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`;
};

export {
  TRANSFER_EVENTS,
  ACTIVITY_EVENTS,
  Mode,
  getEventType,
  OFFERS_TRUNCATE,
  hasSameTitle,
  capitalizeFirstLetter,
  Preposition,
  generateEventsWithUniqueDestinationNames,
};
