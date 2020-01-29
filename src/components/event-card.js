import AbstractComponent from './abstract';
import {createEventCardTemplate} from './templates/event-card';


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
