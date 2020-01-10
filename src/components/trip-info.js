// Маршрут поездки
import AbstractComponent from './abstract-component';
import {createTripInfoTemplate} from './templates/trip-info';

const generateEventsWithUniqueDestinationNames = (events) => {
  const eventsFiltered = events.filter((eventItem, index, self) =>
    index === self.findIndex((t) => (
      t.destination.name === eventItem.destination.name
    ))
  );
  return eventsFiltered;
};

class TripInfoComponent extends AbstractComponent {
  constructor(events) {
    super();

    this._events = events;
  }

  getTemplate() {
    return createTripInfoTemplate(this._events);
  }
}

export default TripInfoComponent;
export {generateEventsWithUniqueDestinationNames};
