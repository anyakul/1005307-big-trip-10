// Маршрут поездки
import AbstractComponent from './abstract-component';
import {createTripInfoTemplate} from '../templates/trip-info';

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
