// Маршрут поездки
import AbstractComponent from './abstract';
import {createTripInfoMainTemplate} from './templates/trip-info-main';

class TripInfoMainComponent extends AbstractComponent {
  constructor(events, mode) {
    super();
    this._events = events;
    this._mode = mode;
  }

  getTemplate() {
    return createTripInfoMainTemplate(this._events, this._mode);
  }
}

export default TripInfoMainComponent;
