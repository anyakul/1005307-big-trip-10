import AbstractComponent from './abstract';
import {createEventCardTemplate} from './templates/event-card';

import {
  formatDuration,
  formatTime,
  formatDateTime,
  getDuration,
  getDatesDiff
} from '../utils/date';


const showDateInCard = (start, end) => {
  return {
    dateFromInCard: formatTime(start),
    dateToInCard: formatTime(end),
    fullDateFrom: formatDateTime(start),
    fullDateTo: formatDateTime(end),
    timeInterval: formatDuration(end - start),
  }
}

class EventCardComponent extends AbstractComponent {
  constructor(events) {
    super();
    this._events = events;
  }

  getTemplate() {
    return createEventCardTemplate(this._events);
  }

  setOnRollupButtonClick(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
  }
}

export default EventCardComponent;
export {showDateInCard};
