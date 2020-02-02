import AbstractComponent from './abstract';
import {createTripInfoMainTemplate} from './templates/trip-info-main';
import {formatMonthDay} from '../utils/date';

const getDate = (events) => {
  return {
    monthDay: formatMonthDay(events),
  }
}

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
export {getDate};
