import AbstractComponent from './abstract';
import {createTripDayTemplate} from './templates/trip-day';

class TripDayComponent extends AbstractComponent {
  constructor(day, events, count) {
    super();
    this._day = day;
    this._events = events;
    this._count = count;
  }

  getTemplate() {
    return createTripDayTemplate(this._day, this._events, this._count);
  }
}

export default TripDayComponent;
