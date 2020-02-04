import AbstractComponent from './abstract';
import {createEventCardTemplate} from './templates/event-card';

class EventCardComponent extends AbstractComponent {
  constructor(eventItem) {
    super();

    this._eventItem = eventItem;
  }

  getTemplate() {
    return createEventCardTemplate(this._eventItem);
  }

  setOnRollupButtonClick(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
  }
}

export default EventCardComponent;
