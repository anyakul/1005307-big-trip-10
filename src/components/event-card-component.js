import AbstractComponent from './abstract-component';
import {createEventCardTemplate} from './templates/event-card-template';
import {formatDate} from './templates/date';


class EventCardComponent extends AbstractComponent {
  constructor(events) {
    super();
    this._events = events;
  }

  getTemplate() {
    return createEventCardTemplate(this._events);
  }

  setRollUpButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
  }

  getEventCardDate(eventItem) {
    return formatDate(eventItem.dateFrom);
  }
}

export default EventCardComponent;

