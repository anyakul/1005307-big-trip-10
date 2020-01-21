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

export {
  TRANSFER_EVENTS,
  ACTIVITY_EVENTS,
  Mode,
  // getCorrectPreposition,
  generateEventsWithUniqueDestinationNames,
};
