const EventTypeTransport = {
  TAXI: `taxi`,
  BUS: `bus`,
  TRAIN: `train`,
  SHIP: `ship`,
  TRANSPORT: `transport`,
  DRIVE: `drive`,
  FLIGHT: `flight`,
};

const EventTypePlace = {
  CHECKIN: `check-in`,
  SIGHTSEEING: `sightseeing`,
  RESTAURANT: `restaurant`
};

const Preposition = {
  TRANSPORT: `to`,
  PLACE: `in`,
};

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
  ADD: `add`,
};


const createPhotos = (destination) => {
  return Object.values(destination.pictures);
};

const getCorrectPreposition = (type) => {
  return ((type === EventTypePlace.CHECKIN || type === EventTypePlace.SIGHTSEEING || type === EventTypePlace.RESTAURANT) ?
    Preposition.PLACE : Preposition.TRANSPORT);
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
  EventTypeTransport,
  EventTypePlace,
  Mode,
  createPhotos,
  getCorrectPreposition,
  generateEventsWithUniqueDestinationNames,
};
