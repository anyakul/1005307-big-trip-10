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

const Cities = {
  LONDON: `London`,
  MOSCOW: `Moscow`,
  PARIS: `Paris`,
  BANGKOK: `Bangkok`
};

const getCorrectPreposition = (type) => {
  return ((type === EventTypePlace.CHECKIN || type === EventTypePlace.SIGHTSEEING || type === EventTypePlace.RESTAURANT) ?
    Preposition.PLACE : Preposition.TRANSPORT);
};

const createPhotos = (destination) => Object.values(destination.pictures);

const generateEventsWithUniqueDestinationNames = (events) => {
  const eventsFiltered = events.filter((eventItem, index, self) =>
    index === self.findIndex((t) => (
      t.destination.name === eventItem.destination.name
    ))
  );
  return eventsFiltered;
};

const createDestinationNames = () => Object.values(Cities)
  .map((name) => ({
    name,
  }));

const calculateSum = (items) => items.reduce((acc, it) => {
  return it + acc;
}, 0);

export {
  EventTypeTransport,
  EventTypePlace,
  Cities,
  createPhotos,
  getCorrectPreposition,
  generateEventsWithUniqueDestinationNames,
  createDestinationNames,
  calculateSum
};
