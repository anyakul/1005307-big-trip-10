const OFFERS_TRUNCATE = 3;

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

const Preposition = {
  ACTIVITY: `at`,
  TRANSFER: `to`
};

const CancelButtonName = {
  DELETE: `delete`,
  CANCEL: `cancel`,
};

const getEventType = (event) => ACTIVITY_EVENTS.findIndex((it) => it.toLowerCase() === event) !== -1 ? `ACTIVITY` : `TRANSFER`;

const hasSameTitle = (array, it) => array.some((arrayIt) => array.length === 0 || arrayIt.title === it.title);

const capitalizeFirstLetter = (str) => {
  return `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`;
};

export {
  OFFERS_TRUNCATE,
  TRANSFER_EVENTS,
  ACTIVITY_EVENTS,
  Mode,
  Preposition,
  CancelButtonName,
  getEventType,
  hasSameTitle,
  capitalizeFirstLetter,
};
