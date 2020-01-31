// Маршрут поездки
import AbstractComponent from './abstract';
import {createTripInfoMainTemplate} from './templates/trip-info-main';

class TripInfoMainComponent extends AbstractComponent {
  constructor(events) {
    super();
    this._events = events;
  }

  getTemplate() {
    return createTripInfoMainTemplate(this._events);
  }

  update(events) {
    this._events = events;
    return createTripInfoMainTemplate(events);
  }
}

export default TripInfoMainComponent;
